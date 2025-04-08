const InvoiceModel = require("../models/Invoice");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class InvoiceService {
  async createInvoice({ appointment_id, total_amount, payment_method }) {
    const newInvoice = await InvoiceModel.create({
      appointment: appointment_id,
      total_amount,
      payment_method,
    });

    return newInvoice;
  }

  async getInvoicesByUser(userID) {
    return await InvoiceModel.find()
      .populate({
        path: "appointment",
        match: { customer: userID },
        populate: [
          { path: "barber", select: "user_name user_avatar" },
          { path: "service" },
        ],
      })
      .then((invoices) => invoices.filter((inv) => inv.appointment !== null));
  }

  async updateInvoiceStatus(invoiceID, status) {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      invoiceID,
      { payment_status: status },
      { new: true }
    );

    if (!updatedInvoice) throw new NotFoundError("Invoice not found");
    return updatedInvoice;
  }
}

module.exports = new InvoiceService();
