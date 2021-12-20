const superagent = require("superagent");

const runCode = async (fileName, code, lang) => {
  try {
    const response = await superagent
      .post("http://localhost:8088/run")
      .send({
        image: "glot/python:latest",
        language: lang,
        files: [
          {
            name: fileName,
            content: code,
          },
        ],
      })
      .set("Authorization", "my-token")
      .set("Content-type", "application/json");
    return response;
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  runCode,
};
