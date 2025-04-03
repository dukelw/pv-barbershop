const { ReviewModel } = require("../models/Review");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class ReviewService {
  async createReview({ customer, barber, service, rating, comment }) {
    const newReview = await ReviewModel.create({
      customer,
      barber,
      service,
      rating,
      comment,
    });

    return newReview;
  }

  async getReviewsByBarber(barberID) {
    return await ReviewModel.find({ barber: barberID }).populate(
      "customer service"
    );
  }

  async getReviewsByService(serviceID) {
    return await ReviewModel.find({ service: serviceID }).populate(
      "customer barber"
    );
  }
}

module.exports = new ReviewService();
