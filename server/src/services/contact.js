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

  async sendRedemptionMail({ to, userName, address, giftName }) {
    await sendMail({
      to,
      subject: `Xác nhận đổi quà: ${giftName}`,
      html: `
        <p>Xin chào <strong>${userName}</strong>,</p>
        <p>Bạn đã đổi thành công món quà: <strong>${giftName}</strong>.</p>
        <p>Chúng tôi sẽ gửi món quà đến địa chỉ: <strong>${address}</strong>. Hoặc bạn cũng có thể đến cửa hàng để nhận trực tiếp.</p>
        <p>Vui lòng giữ liên lạc để được hỗ trợ khi cần thiết. Cảm ơn bạn!</p>
        <br/>
        <p>-- Đội ngũ hỗ trợ khách hàng --</p>
      `,
    });

    return "Redemption confirmation email sent!";
  }
}

module.exports = new ContactService();
