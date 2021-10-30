const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.job = require("./job.model.js")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["student", "admin", "teacher"];
module.exports = db;
