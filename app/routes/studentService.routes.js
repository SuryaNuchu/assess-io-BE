module.exports = (app) => {
  const studentServiceController = require("../controllers/studentService.controller");

  var router = require("express").Router();

  // student Service Controller Routes
  router.get("/", studentServiceController.getAllBatches);
  router.get("/batchId", studentServiceController.getBatchInfoById);
  router.post("/", studentServiceController.saveBatchInfo);
  router.delete("/", studentServiceController.deleteBatchInfo);
  router.patch("/", studentServiceController.patchBatchInfo);

  app.use("/api/studentService", router);
};
