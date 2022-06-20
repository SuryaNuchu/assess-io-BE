const axios = require("axios").default;

const runCode = async (fileName, code, lang, input) => {
  let imageName = "";
  switch (lang) {
    case "python":
      imageName = "glot/python:latest";
      break;
    case "java":
      imageName = "glot/java:latest";
      break;
    case "cpp":
      imageName = "glot/clang:latest";
      break;
    default:
      break;
  }
  try {
    const response = await axios({
      method: "POST",
      url: "http://164.92.157.121:8088/run",
      headers: {
        "X-Access-Token": "assessiosuryanuchu",
        "Content-type": "application/json",
      },
      data: {
        image: imageName,
        payload: {
          language: lang,
          files: [
            {
              name: fileName,
              content: JSON.parse(code),
            },
          ],
          stdin: input,
        },
      },
    });
    return response.data;
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  runCode,
};
