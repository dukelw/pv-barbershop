const GiftModel = require("../models/Gift");
const RedemptionModel = require("../models/Redemption");
const { BadRequestError, NotFoundError } = require("../core/error-response");
const { UserModel } = require("../models/User");

class GiftService {
  async getAllGifts() {
    const now = new Date();
    return await GiftModel.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
    });
  }

  async createGift(payload) {
    const { name, required_points, quantity } = payload;

    if (!name || required_points == null || quantity == null) {
      throw new BadRequestError("Missing required fields");
    }

    return await GiftModel.create(payload);
  }

  async updateGift(gift_id, payload) {
    const gift = await GiftModel.findById(gift_id);
    if (!gift) throw new NotFoundError("Gift not found");

    Object.assign(gift, payload);
    return await gift.save();
  }

  async redeemGift({ user_id, gift_id, user_points }) {
    const gift = await GiftModel.findById(gift_id);
    if (!gift || !gift.is_active) throw new NotFoundError("Gift not found");

    const now = new Date();

    if (gift.start_date && now < gift.start_date) {
      throw new BadRequestError("Gift is not available yet");
    }

    if (gift.end_date && now > gift.end_date) {
      throw new BadRequestError("Gift has expired");
    }

    if (gift.quantity <= 0) throw new BadRequestError("Gift is out of stock");

    if (user_points < gift.required_points) {
      throw new BadRequestError("Not enough points");
    }

    gift.quantity -= 1;
    await gift.save();

    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { $inc: { user_point: -gift.required_points } },
      { new: true }
    );

    const redemption = await RedemptionModel.create({
      user: user_id,
      gift: gift_id,
      points_used: gift.required_points,
    });

    return {
      redemption,
      updated_point: updatedUser.user_point,
    };
  }

  async getUserRedemptions(user_id) {
    return await RedemptionModel.find({ user: user_id }).populate("gift user");
  }

  async getRedemptions() {
    const now = new Date();
    return await RedemptionModel.find().populate("gift user");
  }

  async delete(id) {
    return await GiftModel.deleteOne({ _id: id });
  }

  async completeRedemption(id) {
    return await RedemptionModel.deleteOne({ _id: id });
  }
}

module.exports = new GiftService();
