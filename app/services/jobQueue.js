const Queue = require("bull");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

const db = require("../models");
const Job = db.job;
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobId = data.id;
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let output;
    job["startedAt"] = new Date();
    if (job.extension === "cpp") {
      output = await executeCpp(job.filepath);
    } else if (job.extension === "py") {
      output = await executePy(job.filepath);
    } else if (job.extension === "java") {
      output = await executeJava(job.filepath);
    }
    job["completedAt"] = new Date();
    job["output"] = output;
    job["status"] = "success";
    await job.save();
    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["output"] = JSON.stringify(err);
    job["status"] = "error";
    await job.save();
    throw Error(JSON.stringify(err));
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
};

module.exports = {
  addJobToQueue,
};
