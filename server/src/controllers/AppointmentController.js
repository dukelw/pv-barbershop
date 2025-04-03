const appointmentService = require("../services/appointment");
const { CREATED, SuccessResponse } = require("../core/success-response");

class AppointmentController {
  async create(req, res, next) {
    new CREATED({
      message: "Appointment created successfully",
      metadata: await appointmentService.createAppointment(req.body),
    }).send(res);
  }

  async getByUser(req, res, next) {
    new SuccessResponse({
      message: "User's appointments",
      metadata: await appointmentService.getAppointmentsByUser(
        req.user.user_id
      ),
    }).send(res);
  }

  async getByBarber(req, res, next) {
    new SuccessResponse({
      message: "Barber's appointments",
      metadata: await appointmentService.getAppointmentsForBarber(
        req.params.barberId
      ),
    }).send(res);
  }

  async updateStatus(req, res, next) {
    new SuccessResponse({
      message: "Appointment status updated",
      metadata: await appointmentService.updateAppointmentStatus(
        req.params.id,
        req.body.status
      ),
    }).send(res);
  }

  async delete(req, res, next) {
    new SuccessResponse({
      message: "Appointment deleted successfully",
      metadata: await appointmentService.deleteAppointment(req.params.id),
    }).send(res);
  }
}

module.exports = new AppointmentController();
