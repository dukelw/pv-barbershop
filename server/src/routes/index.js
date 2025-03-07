const siteRouter = require("./site");
const userRouter = require("./user");

function route(app) {
  app.use("/api/v1/user/", userRouter);
  app.use("/", siteRouter);
}

module.exports = route;
