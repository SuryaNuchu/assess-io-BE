const db = require("../models");
const StudentBatch = db.studentBatch;

// save student batch
exports.saveBatchInfo = async (req, res) => {
  const { name, createdBy, additionalInfo, studentsInfo } = req.body;
  const studentBatch = await new StudentBatch({
    name,
    createdBy,
    additionalInfo,
    studentsInfo,
  }).save();
  res.status(200).json(studentBatch);
};

// getBatchInfoById
exports.getBatchInfoById = async (req, res) => {
  const batchId = req.query.id;
  if (batchId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const batchInfo = await StudentBatch.findById(batchId);
  if (batchInfo === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find batch info" });
  }
  return res.status(200).json(batchInfo);
};

// getAllQuestions
exports.getAllBatches = async (req, res) => {
  const studentsInfo = await StudentBatch.find();
  if (studentsInfo === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find students Info data" });
  }
  return res.status(200).json(studentsInfo);
};

// deleteBatchInfo
exports.deleteBatchInfo = async (req, res) => {
  const batchId = req.query.id;
  if (batchId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const batchInfo = await StudentBatch.findByIdAndRemove(batchId);
  if (batchInfo === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "couldn't find batch Info data" });
  }
  return res.status(200).json(batchInfo);
};

// patchBatchInfo
exports.patchBatchInfo = async (req, res) => {
  const { id, name, createdBy, additionalInfo, studentsInfo } = req.body;

  Question.findByIdAndUpdate(
    id,
    {
      name,
      createdBy,
      additionalInfo,
      studentsInfo,
    },
    { new: true }
  )
    .then((batchInfo) => {
      if (!batchInfo) {
        return res.status(404).send({
          message: "batch info not found with id " + id,
        });
      }
      res.send(batchInfo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "batch info not found with id " + id,
        });
      }
      return res.status(500).send({
        message: "batch info updating note with id " + id,
      });
    });
};
