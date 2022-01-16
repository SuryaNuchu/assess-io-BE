const { authJwt } = require("../middlewares");
module.exports = (app) => {
  const questionController = require("../controllers/question.controller");

  var router = require("express").Router();

  // question metadata routes
  router.get(
    "/metadata",
    [authJwt.verifyToken],
    questionController.getAllQuestionsMetaData
  );
  router.get(
    "/metadataById",
    [authJwt.verifyToken],
    questionController.getQuestionMetaDataById
  );
  router.delete(
    "/metadata",
    [authJwt.verifyToken],
    questionController.deleteQuestionMetaData
  );
  router.post(
    "/metadata",
    [authJwt.verifyToken],
    questionController.saveQuestionMetaData
  );
  router.patch(
    "/metadata",
    [authJwt.verifyToken],
    questionController.patchQuestionMetaData
  );

  // question routes
  router.get("/", [authJwt.verifyToken], questionController.getAllQuestions);
  router.post("/", [authJwt.verifyToken], questionController.saveQuestion);
  router.delete("/", [authJwt.verifyToken], questionController.deleteQuestion);
  router.patch("/", [authJwt.verifyToken], questionController.patchQuestion);

  app.use("/api/question", router);
};
