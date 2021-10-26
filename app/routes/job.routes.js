module.exports = (app) => {
  const jobController = require("../controllers/job.controller");

  var router = require("express").Router();

  router.post("/", jobController.run);
  router.get("/status", jobController.status);

  app.use("/api/job", router);
};
