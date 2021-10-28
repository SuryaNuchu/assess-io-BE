const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJava = (filepath, outputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `timelimit -t20 javac ${filepath} -o ${outPath} && cd ${outputPath} && java ${jobId}.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJava,
};
