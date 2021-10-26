const db = require("../models");
const Job = db.job;
const { generateFile } = require("../services/generateFile");
const { addJobToQueue } = require("../services/jobQueue");

exports.run = async (req, res) => {
  const { extension = "cpp", code, jobIdUI = "" } = req.body;
  console.log(extension, "Length:", code.length);
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  if (jobIdUI === "") {
    // Generate File
    const filepath = await generateFile(extension, code);
    // Write into DB
    const job = await new Job({ extension, filepath, code }).save();
    const jobId = job["_id"];
    // Add to queue
    addJobToQueue(jobId);
    res.status(201).json({ jobId });
  } else {
    // we need to handle this case.
  }
};

exports.status = async (req, res) => {
  const jobId = req.query.id;
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  const job = await Job.findById(jobId);
  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }
  return res.status(200).json({ success: true, job });
};
