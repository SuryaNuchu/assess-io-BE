module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    extension: {
      type: String,
      required: true,
      enum: ["cpp", "py", "java"],
    },
    inputFilePath: {
      type: String,
      required: true,
    },
    outputFilePath: {
      type: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "success", "error"],
    },
    code: {
      type: String,
      required: true,
    },
    output: {
      type: String,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Job = mongoose.model("job", schema);
  return Job;
};
