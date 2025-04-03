const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Invoice";
const COLLECTION_NAME = "Invoices";

const invoiceSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    barber: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    total_amount: { type: Number, required: true },
    payment_status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, invoiceSchema);
