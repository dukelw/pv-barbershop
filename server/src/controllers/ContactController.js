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

  async sendRedemption(req, res, next) {
    const { to, userName, address, giftName } = req.body;
    const result = await contactService.sendRedemptionMail({
      to,
      userName,
      address,
      giftName,
    });
    new CREATED({
      message: "Đã gửi email xác nhận đổi quà",
      metadata: result,
    }).send(res);
  }
}

module.exports = new ContactController();
