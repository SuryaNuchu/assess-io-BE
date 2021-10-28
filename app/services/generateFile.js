const fs = require("fs");
const path = require("path");
const { generateFolders } = require("../services/folderService");
const { v4: uuid } = require("uuid");

const generateFile = async (extension, code, userId, filePath = "") => {
  var paths;
  if (filePath === "") {
    paths = generateFolders(userId);
    const fileCode = uuid();
    const filename = `${fileCode}.${extension}`;
    paths.inputFilePath = path.join(paths.inputFilePath, filename);
    await fs.writeFileSync(paths.inputFilePath, code);
    return paths;
  } else {
    await fs.writeFileSync(filePath, code);
  }
};

module.exports = {
  generateFile,
};
