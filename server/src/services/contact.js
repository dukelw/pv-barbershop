const sendMail = require("../utils/mailer");

class ContactService {
  async handleContact({ email, message }) {
    await sendMail({
      to: process.env.MAIL_NAME,
      subject: "Liên hệ từ khách hàng",
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Nội dung:</strong> ${message}</p>`,
    });

    return "Send mail successfully!";
  }
}

module.exports = new ContactService();
