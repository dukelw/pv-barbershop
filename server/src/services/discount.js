const DiscountModel = require("../models/Discount");
const { BadRequestError, NotFoundError } = require("../core/error-response");

class DiscountService {
  async getAllDiscounts() {
    const now = new Date();
    return await DiscountModel.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
    }).populate("assigned_user");
  }

  async getDiscountOfUser(user_id) {
    const now = new Date();

    const discounts = await DiscountModel.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
      $or: [{ assigned_user: null }, { assigned_user: user_id }],
    }).populate("assigned_user");

    return discounts.filter((discount) => {
      return discount.usage_limit > discount.used_count;
    });
  }

  async createDiscount(payload) {
    const { code, percentage, amount } = payload;

    if (!code || (percentage == null && amount == null)) {
      throw new BadRequestError("Missing required fields");
    }

    return await DiscountModel.create(payload);
  }

  async updateDiscount(discount_id, payload) {
    const discount = await DiscountModel.findById(discount_id);
    if (!discount) throw new NotFoundError("Discount not found");

    Object.assign(discount, payload);
    return await discount.save();
  }

  async applyDiscount(code, user_id) {
    const now = new Date();

    const discount = await DiscountModel.findOne({ code });

    if (!discount || !discount.is_active) {
      throw new NotFoundError("Discount code not valid or inactive");
    }

    if (discount.start_date && now < discount.start_date) {
      throw new BadRequestError("Discount not started yet");
    }

    if (discount.end_date && now > discount.end_date) {
      throw new BadRequestError("Discount expired");
    }

    if (
      discount.usage_limit != null &&
      discount.used_count >= discount.usage_limit
    ) {
      throw new BadRequestError("Discount usage limit reached");
    }

    // Check if it is a specfific discount of an user
    if (
      discount.assigned_user &&
      discount.assigned_user.toString() !== user_id
    ) {
      throw new BadRequestError("You are not eligible to use this discount");
    }

    discount.used_count += 1;
    await discount.save();

    return discount;
  }

  async delete(id) {
    return await DiscountModel.deleteOne({ _id: id });
  }
}

module.exports = new DiscountService();
