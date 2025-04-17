const AppointmentModel = require("../models/Appointment");
const { UserModel } = require("../models/User");
const InvoiceModel = require("../models/Invoice");
const { NotFoundError } = require("../core/error-response");

class SalaryService {
  async calculateSalaryForAllStaff(month, year) {
    try {
      // Tìm tất cả nhân viên có vai trò là 'staff' hoặc 'receptionist'
      const employees = await UserModel.find({
        user_role: { $in: ["staff", "receptionist"] },
      });

      if (!employees || employees.length === 0) {
        throw new NotFoundError("Không tìm thấy nhân viên nào.");
      }

      const result = [];

      // Thiết lập khoảng thời gian trong tháng
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      for (const employee of employees) {
        const { _id, user_name, user_role, user_avatar } = employee;

        if (user_role === "receptionist") {
          // Lương cố định
          result.push({
            user_id: _id,
            user_name,
            role: user_role,
            salary: 40000000,
            user_avatar,
          });
        } else {
          // Lấy các appointment đã hoàn thành trong tháng
          const appointments = await AppointmentModel.find({
            barber: _id,
            status: "completed",
            appointment_end: { $gte: startDate, $lte: endDate },
          });

          const appointmentIds = appointments.map((app) => app._id);

          // Lấy invoice tương ứng các appointment đó
          const invoices = await InvoiceModel.find({
            appointment: { $in: appointmentIds },
          });

          const totalServiceAmount = invoices.reduce(
            (sum, invoice) => sum + invoice.total_amount,
            0
          );

          const commission = totalServiceAmount * 0.1;
          const salary = 7000000 + commission;

          result.push({
            user_id: _id,
            user_avatar,
            user_name,
            role: user_role,
            salary: Math.round(salary),
          });
        }
      }

      return result;
    } catch (err) {
      console.error("Lỗi tính lương:", err);
      throw err;
    }
  }
}

module.exports = new SalaryService();
