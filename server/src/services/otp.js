const sendMail = require("../utils/mailer");
const OtpModel = require("../models/Otp");

class OtpService {
  async sendOtp(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpModel.deleteMany({ email });

    await OtpModel.create({ email, otp, expiresAt });

    await sendMail({
      to: email,
      subject: "Mã xác thực OTP",
      html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Mã này sẽ hết hạn sau 5 phút.</p>`,
    });

    return { email };
  }

  async verifyOtp(email, otpInput) {
    const record = await OtpModel.findOne({ email }).sort({ createdAt: -1 });

    if (!record) throw new Error("Không tìm thấy mã OTP.");

    if (record.expiresAt < new Date()) {
      await OtpModel.deleteMany({ email });
      throw new Error("Mã OTP đã hết hạn.");
    }

    if (record.otp !== otpInput) {
      throw new Error("Mã OTP không đúng.");
    }

    await OtpModel.deleteMany({ email });
    return { email, verified: true };
  }
}

module.exports = new OtpService();
