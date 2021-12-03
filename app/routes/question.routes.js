module.exports = (app) => {
  const questionController = require("../controllers/question.controller");

  var router = require("express").Router();

  // question metadata routes
  router.get("/metadata", questionController.getAllQuestionsMetaData);
  router.get("/metadataById", questionController.getQuestionMetaDataById);
  router.delete("/metadata", questionController.deleteQuestionMetaData);
  router.post("/metadata", questionController.saveQuestionMetaData);
  router.patch("/metadata", questionController.patchQuestionMetaData);

  // question routes
  router.get("/", questionController.getAllQuestions);
  router.post("/", questionController.saveQuestion);
  router.delete("/", questionController.deleteQuestion);
  router.patch("/", questionController.patchQuestion);

  app.use("/api/question", router);
};
