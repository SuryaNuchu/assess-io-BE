const fs = require("fs");
const path = require("path");

const generateFolders = (userId) => {
  const basePath = path.join(__dirname, userId);
  const dirCodes = path.join(basePath, "codes");
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  const dirOutput = path.join(basePath, "output");
  if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
  }
  return { inputFilePath: dirCodes, outPutFilePath: dirOutput };
};

module.exports = {
  generateFolders,
};
