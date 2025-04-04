const { InvoiceModel } = require("../models/Invoice");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class InvoiceService {
  async createInvoice({
    customer,
    barber,
    services,
    total_amount,
    payment_method,
  }) {
    const newInvoice = await InvoiceModel.create({
      customer,
      barber,
      services,
      total_amount,
      payment_status: "pending",
      payment_method,
    });

    return newInvoice;
  }

  async getInvoicesByUser(userID) {
    return await InvoiceModel.find({ customer: userID }).populate(
      "services.service barber"
    );
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
