const invoiceService = require("../services/invoice");
const { CREATED, SuccessResponse } = require("../core/success-response");

class InvoiceController {
  async create(req, res, next) {
    new CREATED({
      message: "Invoice created successfully",
      metadata: await invoiceService.createInvoice(req.body),
    }).send(res);
  }

  async getByUser(req, res, next) {
    new SuccessResponse({
      message: "User's invoices",
      metadata: await invoiceService.getInvoicesByUser(req.user.user_id),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "All's invoices",
      metadata: await invoiceService.getAllInvoices(req.query.populate),
    }).send(res);
  }

  async updateStatus(req, res, next) {
    new SuccessResponse({
      message: "Invoice status updated",
      metadata: await invoiceService.updateInvoiceStatus(
        req.params.id,
        req.body.status
      ),
    }).send(res);
  }
}

module.exports = new InvoiceController();
