const db = require("../models");
const Exam = db.exam;
const { sendMail } = require("../services/nodemail.service");

exports.saveExam = async (req, res) => {
  const {
    name,
    createdBy,
    examCode,
    batchId,
    examDuration,
    startDate,
    endDate,
    studentsInfo,
    questions,
    createdMail,
    batchName,
  } = req.body;
  const exam = await new Exam({
    name,
    createdBy,
    examCode,
    batchId,
    examDuration,
    startDate,
    endDate,
    studentsInfo,
    questions,
    createdMail,
    batchName,
  }).save();
  const examId = exam["_id"];
  sendMail({
    name,
    createdBy,
    examCode,
    examDuration,
    startDate,
    endDate,
    toMail: createdMail,
  });
  res.status(200).json({ examId });
};

// getAllExams
exports.getAllExams = async (req, res) => {
  const exams = await Exam.find();
  if (exams === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find exams Info data" });
  }
  return res.status(200).json(exams);
};

// getexmasById
exports.getExamById = async (req, res) => {
  const examCode = req.query.id;
  if (examCode === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const examInfo = await Exam.find({ examCode: examCode });
  if (examInfo[0] === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find exam info" });
  }
  return res.status(200).json(examInfo[0]);
};
