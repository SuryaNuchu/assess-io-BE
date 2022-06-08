const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.job = require("./job.model")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["student", "admin", "teacher"];
db.question = require("./question.model")(mongoose);
db.answers = require("./answers.model")(mongoose);
db.test = require("./test.model")(mongoose);
db.studentBatch = require("./studentBatch.model")(mongoose);
db.questionMetaData = require("./questionMetaData.model")(mongoose);
db.exam = require("./exam.model")(mongoose);
db.answersJob = require("./answersJob.model")(mongoose);
module.exports = db;
