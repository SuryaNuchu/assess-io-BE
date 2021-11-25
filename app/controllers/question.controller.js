const db = require("../models");
const QuestionMetaData = db.questionMetaData;
const Question = db.question;

// saveQuestionMetaData
exports.saveQuestionMetaData = async (req, res) => {
  const {
    name,
    subjectCode,
    branch,
    lastFiveWeightedAvg,
    subjectImage,
    type,
  } = req.body;
  const questionMetaData = await new QuestionMetaData({
    name,
    subjectCode,
    branch,
    lastFiveWeightedAvg,
    subjectImage,
    type,
  }).save();
  const questionMetaDataId = questionMetaData["_id"];
  res.status(200).json({ questionMetaDataId });
};

// getQuestionMetaDataById
exports.getQuestionMetaDataById = async (req, res) => {
  const questionMetaDataId = req.query.id;
  if (questionMetaDataId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const questionMetaData = await QuestionMetaData.findById(questionMetaDataId);
  if (questionMetaData === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question meta data" });
  }
  return res.status(200).json({ success: true, questionMetaData });
};

// getAllQuestionsMetaData
exports.getAllQuestionsMetaData = async (req, res) => {
  const questionsMetaData = await QuestionMetaData.findAll();
  if (questionsMetaData === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question meta data" });
  }
  return res.status(200).json({ success: true, questionsMetaData });
};

// deleteQuestionMetaData
exports.deleteQuestionMetaData = async (req, res) => {
  const questionMetaDataId = req.query.id;
  if (questionMetaDataId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const questionMetaData = await QuestionMetaData.findByIdAndRemove(
    questionMetaDataId
  );
  if (questionMetaData === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question meta data" });
  }
  return res.status(200).json({ success: true, questionMetaData });
};

// patchQuestionMetaData
exports.patchQuestionMetaData = async (req, res) => {
  const {
    id,
    name,
    subjectCode,
    branch,
    lastFiveWeightedAvg,
    subjectImage,
    type,
  } = req.body;
  const questionMetaData = new QuestionMetaData({
    _id: id,
    name,
    subjectCode,
    branch,
    lastFiveWeightedAvg,
    subjectImage,
    type,
  });

  const patchedQuestionMetaData = await QuestionMetaData.findOneAndUpdate(
    questionMetaData
  );
  res.status(200).json(patchedQuestionMetaData);
};

// saveQuestion
exports.saveQuestion = async (req, res) => {
  const { type, components, time, createdBy, createdOn, complexity } = req.body;
  const question = await new Question({
    type,
    components,
    time,
    createdBy,
    createdOn,
    complexity,
  }).save();
  const questionId = question["_id"];
  res.status(200).json({ questionId });
};

// getQuestionById
exports.getQuestionById = async (req, res) => {
  const questionId = req.query.id;
  if (questionId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const question = await Question.findById(questionMetaDataId);
  if (question === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question data" });
  }
  return res.status(200).json({ success: true, question });
};

// getAllQuestions
exports.getAllQuestions = async (req, res) => {
  const questions = await Question.findAll();
  if (question === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question data" });
  }
  return res.status(200).json({ success: true, questions });
};

// deleteQuestion
exports.deleteQuestion = async (req, res) => {
  const questionId = req.query.id;
  if (questionId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const question = await Question.findByIdAndRemove(questionMetaDataId);
  if (question === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question data" });
  }
  return res.status(200).json({ success: true, question });
};

// patchQuestion
exports.patchQuestion = async (req, res) => {
  const {
    id,
    type,
    components,
    time,
    createdBy,
    createdOn,
    complexity,
  } = req.body;
  const question = new Question({
    _id: id,
    type,
    components,
    time,
    createdBy,
    createdOn,
    complexity,
  });
  const questionId = await Question.findOneAndUpdate(question);
  res.status(200).json({ questionId });
};
