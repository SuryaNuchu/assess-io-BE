const Queue = require("bull");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

const { runCode } = require("./glotio");
const db = require("../models");

const AnswersJob = db.answersJob;
const Answers = db.answers;
const Exam = db.exam;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobId = data.id;
  const answersJob = await AnswersJob.findById(jobId);

  if (answersJob === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let mcqPoints = 0;
    let codingPoints = 0;
    let codingAnsCount = 0;
    answersJob["startedAt"] = new Date();
    const answer = await Answers.findById(answersJob.answersId);
    const exam = await Exam.findOne({ examCode: answer.testId });
    const questionIdVsAnswers = [];
    exam.questions.forEach((q) => {
      questionIdVsAnswers[q.id] = { type: q.type, components: q.components };
    });

    const answers = answer.components.answers;
    for (const questionId of Object.keys(answers)) {
      const question = questionIdVsAnswers[questionId];
      const components = question.components;

      if (question.type == "mcq") {
        const options = components.options;
        const option = options.filter((o) => o.isCorrect === true)[0];
        if (option.id === answers[questionId]) mcqPoints = mcqPoints + 1;
      } else if (question.type == "coding") {
        codingAnsCount = 0;
        const ans = answers[questionId];
        const testCases = components.testCases;
        for (t in testCases) {
          const result = await runCode(
            ans.fileName,
            JSON.stringify(ans.content),
            ans.langSelected,
            testCases[t].input
          );
          if (
            testCases[t].output.trim().localeCompare(result.stdout.trim()) === 0
          )
            codingAnsCount = codingAnsCount + 1;
        }
        if (codingAnsCount === testCases.length)
          codingPoints = codingPoints + 1;
      }
    }
    answersJob["completedAt"] = new Date();
    answersJob["output"] = { mcqPoints: mcqPoints, codingPoints: codingPoints };
    answersJob["status"] = "success";
    answersJob["examCode"] = answer.testId;
    answersJob["userId"] = answer.userId;
    await answersJob.save();
    exam.studentsInfo.forEach((s) => {
      if (s["id"].localeCompare(answer["userId"]) === 0) {
        s["result"] = { mcqPoints: mcqPoints, codingPoints: codingPoints };
      }
    });
    exam.markModified("studentsInfo");
    await exam.save();
    return true;
  } catch (err) {
    console.log("Error", err);
    answersJob["completedAt"] = new Date();
    answersJob["output"] = JSON.stringify(err);
    answersJob["status"] = "error";
    await answersJob.save();
    throw Error(JSON.stringify(err));
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addAnswersJobToQueue = async (jobId) => {
  await jobQueue.add({
    id: jobId,
  });
};

module.exports = {
  addAnswersJobToQueue,
};
