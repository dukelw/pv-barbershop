const siteRouter = require("./site");
const userRouter = require("./user");
const uploadRouter = require("./upload");
const serviceRouter = require("./service");
const invoiceRouter = require("./invoice");
const inventoryRouter = require("./inventory");
const reviewRouter = require("./review");
const appointmentRouter = require("./appointment");
const paymentRouter = require("./payment");
const sliderRouter = require("./slider");
const statisticRouter = require("./statistic");
const giftRouter = require("./gift");
const discountRouter = require("./discount");
const notificationRouter = require("./notification");
const contactRouter = require("./contact");
const salaryRouter = require("./salary");
const otpRouter = require("./otp");

function route(app) {
  app.use("/api/v1/user/", userRouter);
  app.use("/api/v1/payment/", paymentRouter);
  app.use("/api/v1/upload/", uploadRouter);
  app.use("/api/v1/service/", serviceRouter);
  app.use("/api/v1/invoice/", invoiceRouter);
  app.use("/api/v1/inventory/", inventoryRouter);
  app.use("/api/v1/review/", reviewRouter);
  app.use("/api/v1/appointment/", appointmentRouter);
  app.use("/api/v1/slider/", sliderRouter);
  app.use("/api/v1/statistic/", statisticRouter);
  app.use("/api/v1/gift/", giftRouter);
  app.use("/api/v1/notification/", notificationRouter);
  app.use("/api/v1/discount/", discountRouter);
  app.use("/api/v1/contact/", contactRouter);
  app.use("/api/v1/otp/", otpRouter);
  app.use("/api/v1/salary/", salaryRouter);
  app.use("/", siteRouter);
}

module.exports = route;
