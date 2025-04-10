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
  app.use("/", siteRouter);
}

module.exports = route;
