const db = require("../models");
const Job = db.job;
const { generateFile } = require("../services/generateFile");
const { addJobToQueue } = require("../services/jobQueue");

const { runCode } = require("../services/glotio");

// Run the job
exports.run = async (req, res) => {
  const { extension = "cpp", code, jobIdUI = "", userId } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  if (jobIdUI === "") {
    // Generate File
    const filepaths = await generateFile(extension, code, userId);
    // Write into DB
    const job = await new Job({
      extension,
      inputFilePath: filepaths.inputFilePath,
      outputFilePath: filepaths.outPutFilePath,
      code,
    }).save();
    const jobId = job["_id"];
    // Add to queue
    addJobToQueue(jobId);
    res.status(201).json({ jobId });
  } else {
    Job.findByIdAndUpdate(jobIdUI, {
      code: code,
      extension: extension,
    })
      .then((job) => {
        if (!job) {
          return res.status(404).send({
            message: "Job not found with id " + jobIdUI,
          });
        }
        console.log(job);
        //update file
        generateFile(extension, code, userId, job.inputFilePath).then(() => {
          // Add to queue
          addJobToQueue(jobIdUI);
          res.status(201).json({ jobIdUI });
        });
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Job not found with id " + jobIdUI,
          });
        }
        return res.status(500).send({
          message: "Error updating note with id " + jobIdUI,
        });
      });
  }
};

// poll for status by jobId
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

// poll for status by jobId
exports.runCode = async (req, res) => {
  const { fileName, content, langSelected } = req.body;
  const result = await runCode(fileName, JSON.stringify(content), langSelected);
  return res.status(200).json(result);
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
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
