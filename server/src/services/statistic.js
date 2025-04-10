const ReviewModel = require("../models/Review");
const InvoiceModel = require("../models/Invoice");
const AppointmentModel = require("../models/Appointment");
const { NotFoundError, BadRequestError } = require("../core/error-response");
const mongoose = require("mongoose");

class StatisticService {
  async getAverageRatingOfBarber(barberID) {
    const result = await ReviewModel.aggregate([
      { $match: { barber: new mongoose.Types.ObjectId(barberID) } },
      {
        $group: {
          _id: "$barber",
          averageRating: { $avg: "$rating" },
          totalReview: { $sum: 1 },
        },
      },
    ]);

    if (!result.length) return { averageRating: 0, totalReview: 0 };
    return result[0];
  }

  async getAverageRatingOfBarbers() {
    const result = await ReviewModel.aggregate([
      {
        $group: {
          _id: "$barber",
          averageRating: { $avg: "$rating" },
          totalReview: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "_id",
          as: "barberInfo",
        },
      },
      { $unwind: "$barberInfo" },
      {
        $project: {
          barberID: "$_id",
          averageRating: 1,
          totalReview: 1,
          barberName: "$barberInfo.user_name",
          barberAvatar: "$barberInfo.user_avatar",
          _id: 0,
        },
      },
      { $sort: { averageRating: -1 } },
    ]);

    return result;
  }

  async getIncomeOfBarberInCurrentMonth(barberID) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return this.getIncomeOfBarber(barberID, { start, end });
  }

  async getIncomeOfBarbersInCurrentMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const matchQuery = {
      createdAt: { $gte: start, $lt: end },
    };

    const result = await InvoiceModel.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: "Appointments",
          localField: "appointment",
          foreignField: "_id",
          as: "appointmentData",
        },
      },
      { $unwind: "$appointmentData" },
      {
        $group: {
          _id: "$appointmentData.barber",
          totalIncome: { $sum: "$total_amount" },
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "_id",
          as: "barberInfo",
        },
      },
      { $unwind: "$barberInfo" },
      {
        $match: {
          "barberInfo.user_role": "staff",
        },
      },
      {
        $project: {
          barberID: "$_id",
          totalIncome: 1,
          barberName: "$barberInfo.user_name",
          barberAvatar: "$barberInfo.user_avatar",
          _id: 0,
        },
      },
      { $sort: { totalIncome: -1 } },
    ]);

    return result;
  }

  async getIncomeOfBarber(barberID, time = {}) {
    const { start, end } = time;

    const matchQuery = {};
    if (start && end) {
      matchQuery.createdAt = { $gte: new Date(start), $lt: new Date(end) };
    }

    const result = await InvoiceModel.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: "Appointments",
          localField: "appointment",
          foreignField: "_id",
          as: "appointmentData",
        },
      },
      { $unwind: "$appointmentData" },
      {
        $match: {
          "appointmentData.barber": new mongoose.Types.ObjectId(barberID),
        },
      },
      {
        $group: {
          _id: "$appointmentData.barber",
          totalIncome: { $sum: "$total_amount" },
        },
      },
    ]);

    return result[0]?.totalIncome || 0;
  }

  async getIncomeOfSystemInCurrentMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return this.getIncomeOfSystem({ start, end });
  }

  async getIncomeOfBarberByMonthInYear(barberID, year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const result = await InvoiceModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $lookup: {
          from: "Appointments",
          localField: "appointment",
          foreignField: "_id",
          as: "appointmentData",
        },
      },
      { $unwind: "$appointmentData" },
      {
        $match: {
          "appointmentData.barber": new mongoose.Types.ObjectId(barberID),
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalIncome: { $sum: "$total_amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalIncome: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const fullYearIncome = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = result.find((r) => r.month === month);
      return {
        month,
        totalIncome: found ? found.totalIncome : 0,
      };
    });

    return fullYearIncome;
  }

  async getIncomeOfSystem(time = {}) {
    const { start, end } = time;

    const matchQuery = {};
    if (start && end) {
      matchQuery.createdAt = { $gte: new Date(start), $lt: new Date(end) };
    }

    const result = await InvoiceModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$total_amount" },
        },
      },
    ]);

    return result[0]?.totalIncome || 0;
  }

  async getIncomeSystemByMonthInYear(year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const result = await InvoiceModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalIncome: { $sum: "$total_amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalIncome: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const fullYearIncome = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = result.find((r) => r.month === month);
      return {
        month,
        totalIncome: found ? found.totalIncome : 0,
      };
    });

    return fullYearIncome;
  }

  async getAppointmentOfSystem({ start, end }) {
    const matchQuery = {
      status: "completed",
    };

    if (start && end) {
      matchQuery.appointment_start = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }

    const total = await AppointmentModel.countDocuments(matchQuery);
    return total;
  }

  async getAppointmentSystemByMonthInYear(year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const result = await AppointmentModel.aggregate([
      {
        $match: {
          appointment_start: { $gte: start, $lt: end },
          status: "completed",
        },
      },
      {
        $group: {
          _id: { $month: "$appointment_start" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const fullYear = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = result.find((r) => r.month === month);
      return {
        month,
        count: found ? found.count : 0,
      };
    });

    return fullYear;
  }
}

module.exports = new StatisticService();
