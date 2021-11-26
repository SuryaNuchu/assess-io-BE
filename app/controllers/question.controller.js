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
  res.status(200).json(questionMetaData);
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
  return res.status(200).json(questionMetaData);
};

// getAllQuestionsMetaData
exports.getAllQuestionsMetaData = async (req, res) => {
  const questionsMetaData = await QuestionMetaData.find();
  if (questionsMetaData === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question meta data" });
  }
  return res.status(200).json(questionsMetaData);
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
  return res.status(200).json(questionMetaData);
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

  QuestionMetaData.findByIdAndUpdate(
    id,
    {
      name,
      subjectCode,
      branch,
      lastFiveWeightedAvg,
      subjectImage,
      type,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Question Meta Data not found with id " + id,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Question Meta Data not found with id " + id,
        });
      }
      return res.status(500).send({
        message: "Error updating Question Meta Data with id " + id,
      });
    });
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
  res.status(200).json(question);
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
  return res.status(200).json(question);
};

// getAllQuestions
exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  if (question === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find question data" });
  }
  return res.status(200).json(questions);
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
  return res.status(200).json(question);
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

  Question.findByIdAndUpdate(
    id,
    {
      type,
      components,
      time,
      createdBy,
      createdOn,
      complexity,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};
