const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Appointment";
const COLLECTION_NAME = "Appointments";

const appointmentSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    barber: { type: Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    appointment_time: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, appointmentSchema);
