const db = require("../models");
const Answers = db.answers;

exports.saveAnswers = async (req, res) => {
  const { components, userId, startedOn, endedOn, testId } = req.body;
  const answers = await new Answers({
    components,
    userId,
    startedOn,
    endedOn,
    testId,
  }).save();
  const answersId = answers["_id"];
  res.status(200).json({ answersId });
};

exports.getAnswers = async (req, res) => {
  const answersId = req.query.id;
  if (answersId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const answers = await Answers.findById(answersId);
  if (answers === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find answers data" });
  }
  return res.status(200).json({ success: true, answers });
};
