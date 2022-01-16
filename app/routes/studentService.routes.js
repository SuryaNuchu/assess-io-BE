const { authJwt } = require("../middlewares");
module.exports = (app) => {
  const studentServiceController = require("../controllers/studentService.controller");

  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // student Service Controller Routes
  router.get(
    "/",
    [authJwt.verifyToken],
    studentServiceController.getAllBatches
  );
  router.get(
    "/batchId",
    [authJwt.verifyToken],
    studentServiceController.getBatchInfoById
  );
  router.post(
    "/",
    [authJwt.verifyToken],
    studentServiceController.saveBatchInfo
  );
  router.delete(
    "/",
    [authJwt.verifyToken],
    studentServiceController.deleteBatchInfo
  );
  router.patch(
    "/",
    [authJwt.verifyToken],
    studentServiceController.patchBatchInfo
  );

  app.use("/api/studentService", router);
};
