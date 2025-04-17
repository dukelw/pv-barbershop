const contactService = require("../services/contact");
const { CREATED } = require("../core/success-response");

class ContactController {
  async send(req, res, next) {
    const { email, message } = req.body;
    const result = await contactService.handleContact({ email, message });
    new CREATED({
      message: "Liên hệ đã được gửi",
      metadata: result,
    }).send(res);
  }
}

module.exports = new ContactController();
