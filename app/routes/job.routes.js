const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const jobController = require("../controllers/job.controller");

  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], jobController.runCode);
  router.get("/status", [authJwt.verifyToken], jobController.status);

  app.use("/api/job", router);
};
