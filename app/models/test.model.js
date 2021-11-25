const Question = require("./question.model");
module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    questions: {
      type: [Object],
      required: true,
    },
    time: {
      type: Date,
    },
    idDisplayAns: {
      type: Boolean,
      require: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Test = mongoose.model("test", schema);
  return Test;
};
