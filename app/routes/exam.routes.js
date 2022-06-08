const { authJwt } = require("../middlewares");
module.exports = (app) => {
  const examController = require("../controllers/exam.controller");

  var router = require("express").Router();

  // question metadata routes
  router.get("/", [authJwt.verifyToken], examController.getAllExams);
  router.get("/examId", examController.getExamById);
  router.post("/", [authJwt.verifyToken], examController.saveExam);
  app.use("/api/exam", router);
};
