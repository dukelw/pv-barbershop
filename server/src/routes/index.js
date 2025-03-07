const siteRouter = require("./site");
const userRouter = require("./user");
const uploadRouter = require("./upload");

function route(app) {
  app.use("/api/v1/user/", userRouter);
  app.use("/api/v1/upload/", uploadRouter);
  app.use("/", siteRouter);
}

module.exports = route;
