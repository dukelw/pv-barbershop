const { AppointmentModel } = require("../models/Appointment");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class AppointmentService {
  async createAppointment({ customer, barber, appointment, service, time }) {
    const newAppointment = await AppointmentModel.create({
      customer,
      barber,
      appointment,
      service,
      appointment_time: time,
    });

    return newAppointment;
  }

  async getAppointmentsByUser(userID) {
    return await AppointmentModel.find({ customer: userID }).populate(
      "service barber"
    );
  }

  async getAppointmentsForBarber(barberID) {
    return await AppointmentModel.find({ barber: barberID }).populate(
      "service customer"
    );
  }

  async updateAppointmentStatus(appointmentID, status) {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentID,
      { status },
      { new: true }
    );

    if (!updatedAppointment) throw new NotFoundError("Appointment not found");
    return updatedAppointment;
  }

  async deleteAppointment(appointmentID) {
    const deletedAppointment = await AppointmentModel.findByIdAndDelete(
      appointmentID
    );
    if (!deletedAppointment) throw new NotFoundError("Appointment not found");
    return deletedAppointment;
  }
}

module.exports = new AppointmentService();
