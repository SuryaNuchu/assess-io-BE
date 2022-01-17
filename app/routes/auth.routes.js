const controller = require("../controllers/auth.controller");
var router = require("express").Router();
module.exports = function (app) {
  router.post("/verify", controller.verifyToken);
  app.use("/api/auth", router);
};
