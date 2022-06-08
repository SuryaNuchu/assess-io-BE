const { authJwt } = require("../middlewares");
module.exports = (app) => {
  const answersController = require("../controllers/answers.controller");

  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], answersController.getAnswers);
  router.post("/", answersController.saveAnswers);

  app.use("/api/answers", router);
};
