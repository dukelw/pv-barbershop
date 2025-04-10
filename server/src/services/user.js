const { UserModel } = require("../models/User");
const AppointmentModel = require("../models/Appointment");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const keyTokenService = require("./key-token");
const { generatePairOfToken } = require("../auth/utils");
const { getInfoData } = require("../utils/index");
const { findByEmail } = require("../helpers/function/user");
const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error-response");

class UserService {
  signUp = async ({ name, email, password, isAdmin }) => {
    // Step 1: Check the existence of email
    const foundUser = await UserModel.findOne({ user_email: email }).lean();
    if (foundUser) throw new BadRequestError("User is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
      isAdmin: isAdmin,
    });

    if (newUser) {
      // Create privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await keyTokenService.createKeyToken({
        user_id: newUser._id,
        public_key: publicKey,
        private_key: privateKey,
      });

      if (!keyStore) {
        return {
          code: "400",
          message: "keyStore error",
        };
      }

      // Create pair of token
      const tokens = await generatePairOfToken(
        { user_id: newUser._id, email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          user: getInfoData({
            fields: [
              "_id",
              "user_name",
              "user_email",
              "user_avatar",
              "user_role",
            ],
            object: newUser,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  signIn = async ({ email, password, refresh_token = null }) => {
    // 1. Check email
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new BadRequestError("User has not registered");

    // 2. Match password
    const isMatch = await bcrypt.compare(password, foundUser.user_password);
    if (!isMatch) throw new AuthFailureError("Authentication failed");

    // 3. Create privateKey, publicKey
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // 4. Generate token
    const { _id: userID } = foundUser;
    const tokens = await generatePairOfToken(
      { user_id: userID, email },
      publicKey,
      privateKey
    );

    await keyTokenService.createKeyToken({
      user_id: userID,
      public_key: publicKey,
      private_key: privateKey,
      refresh_token: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fields: [
          "_id",
          "user_name",
          "user_email",
          "user_avatar",
          "user_birthday",
          "user_phone",
          "user_gender",
          "user_role",
          "user_point",
        ],
        object: foundUser,
      }),
      tokens,
    };
  };

  logOut = async (keyStore) => {
    console.log(keyStore);
    const deletedKey = await keyTokenService.removeKeyByID(keyStore._id);
    return deletedKey;
  };

  refreshToken = async ({ refreshToken, user, keyStore }) => {
    const { user_id, email } = user;
    console.log(`User ID: ${user_id} email: ${email}`);
    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      // Delete all tokens in keyStore
      await keyTokenService.deleteKeyByUserID(user_id);
      throw new ForbiddenError(`Something went wrong, please re-login`);
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("User has not been registered");
    }

    // Check userID
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new AuthFailureError("User has not been registered");

    // Create new token
    const tokens = await generatePairOfToken(
      { user_id, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    // Update token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user,
      tokens,
    };
  };

  find = async ({ user_id }) => {
    const foundUser = await UserModel.findById(user_id);
    if (!foundUser) throw new NotFoundError("Can't find user");

    const user = {
      _id: foundUser._id,
      name: foundUser.user_name,
      email: foundUser.user_email,
      birthday: foundUser.user_birthday,
      avatar: foundUser.user_avatar,
      phone: foundUser.user_phone,
      gender: foundUser.user_gender,
      createdAt: foundUser.createdAt,
      point: foundUser.user_point,
    };
    return {
      user,
    };
  };

  findAll = async (keySearch) => {
    let foundUsers;

    if (keySearch) {
      foundUsers = await UserModel.find({
        user_name: { $regex: keySearch, $options: "i" },
      });
    } else {
      foundUsers = await UserModel.find();
    }
    console.log(foundUsers);
    return foundUsers;
  };

  findAllBarber = async () => {
    let foundUsers;
    const query = { user_role: "staff" };

    foundUsers = await UserModel.find(query);
    return foundUsers;
  };

  findAllFreeBarber = async (keySearch, timeStart, timeEnd) => {
    let foundUsers;
    const query = { user_role: "staff" };

    if (keySearch) {
      query.user_name = { $regex: keySearch, $options: "i" };
    }

    foundUsers = await UserModel.find(query);

    console.log("starttime", timeStart, "endtime", timeEnd);
    if (timeStart && timeEnd) {
      const busyAppointments = await AppointmentModel.find({
        appointment_start: { $lt: new Date(timeEnd) },
        appointment_end: { $gt: new Date(timeStart) },
      });

      const busyBarberIds = busyAppointments
        .filter((a) => a.barber && a.barber._id)
        .map((a) => a.barber._id.toString());

      foundUsers = foundUsers.filter(
        (barber) => !busyBarberIds.includes(barber._id.toString())
      );
    }

    return foundUsers;
  };

  updateInformation = async ({
    userID,
    name,
    email,
    birthday,
    phone,
    gender,
    avatar,
  }) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) throw new NotFoundError("User not found");
    const filter = {
      _id: userID,
    };
    let bodyUpdate;
    if (birthday) {
      bodyUpdate = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_gender: gender,
        user_birthday: new Date(birthday),
        user_avatar: avatar,
      };
    } else {
      bodyUpdate = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_gender: gender,
        user_avatar: avatar,
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(filter, bodyUpdate, {
      new: true,
    });

    console.log("Updated user:::", updatedUser);
    return updatedUser;
  };

  updatePoint = async ({ userID, point }) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { $inc: { user_point: point } }, // point > 0 là cộng, point < 0 là trừ
      { new: true }
    );
    return updatedUser;
  };

  changePassword = async ({ email, password, new_password }) => {
    // 1. Check email
    const foundUser = await UserModel.findOne({ user_email: email });
    if (!foundUser) throw new BadRequestError("User has not registered");

    // 2. Match password
    const isMatch = await bcrypt.compare(password, foundUser.user_password);
    if (!isMatch) throw new AuthFailureError("Authentication failed");

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // 4. Change password
    const updatedUser = await UserModel.findOneAndUpdate(
      { user_email: email },
      { user_password: hashedPassword }
    );

    console.log("Updated user: " + updatedUser, updatedUser.modifiedCount);
    return updatedUser.modifiedCount;
  };

  delete = async ({ deleteID, userID }) => {
    const foundUser = await UserModel.findById(userID);
    if (
      !foundUser.user_role === "admin" ||
      !foundUser.user_role === "receptionist"
    )
      throw new NotFoundError("Authorization failure");

    const deleteUser = await UserModel.findById(deleteID);
    if (!foundUser) throw new NotFoundError("User not found");

    const result = await UserModel.deleteOne({ _id: deleteUser._id });
    return result;
  };

  createAccount = async ({
    user_name,
    user_email,
    user_avatar,
    user_role,
    user_gender,
  }) => {
    const password = "123456";
    // Step 1: Check the existence of email
    const foundUser = await UserModel.findOne({
      user_email: user_email,
    }).lean();
    if (foundUser) throw new BadRequestError("User is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hashedPassword,
      user_avatar: user_avatar,
      user_role: user_role,
      user_gender: user_gender,
    });

    if (newUser) {
      // Create privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await keyTokenService.createKeyToken({
        user_id: newUser._id,
        public_key: publicKey,
        private_key: privateKey,
      });

      if (!keyStore) {
        return {
          code: "400",
          message: "keyStore error",
        };
      }

      // Create pair of token
      const tokens = await generatePairOfToken(
        { user_id: newUser._id, user_email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          user: getInfoData({
            fields: [
              "_id",
              "user_name",
              "user_email",
              "user_avatar",
              "user_role",
            ],
            object: newUser,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = new UserService();
