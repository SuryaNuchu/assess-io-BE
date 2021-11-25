module.exports = (app) => {
  const answersController = require("../controllers/answers.controller");

  var router = require("express").Router();

  router.get("/", answersController.getAnswers);
  router.post("/", answersController.saveAnswers);

  app.use("/api/answers", router);
};
