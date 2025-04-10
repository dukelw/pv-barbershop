const AppointmentModel = require("../models/Appointment");
const { NotFoundError } = require("../core/error-response");

class AppointmentService {
  async createAppointment({
    customer,
    barber,
    service,
    start,
    end,
    customer_name,
    phone_number,
    notes,
  }) {
    if (!Array.isArray(service) || service.length === 0) {
      throw new BadRequestError("At least one service must be selected.");
    }

    const newAppointment = await AppointmentModel.create({
      customer,
      barber,
      service,
      appointment_start: start,
      appointment_end: end,
      customer_name,
      phone_number,
      notes,
    });

    return newAppointment;
  }

  async getAppointment(appointmentID, populate) {
    if (populate) {
      return await AppointmentModel.findOne({
        _id: appointmentID,
      }).populate("barber service");
    }
    return await AppointmentModel.findOne({ _id: appointmentID }).populate(
      "barber"
    );
  }

  async getAllAppointments() {
    return await AppointmentModel.find()
      .populate("service barber customer")
      .sort({ appointment_start: -1 });
  }

  async getAppointmentsByUser(userID) {
    return await AppointmentModel.find({ customer: userID }).populate(
      "service barber"
    );
  }

  async getAppointmentsForBarber(barberID) {
    return await AppointmentModel.find({
      barber: barberID,
      status: { $ne: "pending" },
    }).populate("service customer");
  }

  async updateAppointment({
    _id,
    customer,
    barber,
    service,
    appointment_start,
    appointment_end,
    customer_name,
    phone_number,
    notes,
    status,
  }) {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      _id,
      {
        customer,
        barber,
        service,
        appointment_start,
        appointment_end,
        customer_name,
        phone_number,
        notes,
        status,
      },
      { new: true }
    ).populate("service barber customer");

    if (!updatedAppointment) throw new NotFoundError("Appointment not found");

    return updatedAppointment;
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

  async updateAppointmentProof(appointmentID, complete_picture) {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentID,
      { complete_picture },
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
