const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

var userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_avatar: {
      type: String,
      default: "",
    },
    user_password: {
      type: String,
      required: true,
    },
    user_birthday: {
      type: Date,
    },
    user_gender: {
      Type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },
    user_phone: {
      Type: String,
      default: "",
    },
    user_role: {
      type: String,
      enum: ["admin", "staff", "customer", "receptionist"],
      required: true,
      default: "customer",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  UserModel: model(DOCUMENT_NAME, userSchema),
};
