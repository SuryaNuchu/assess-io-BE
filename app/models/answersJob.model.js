module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    answersId: {
      type: String,
      required: true,
    },
    examCode: {
      type: String,
    },
    userId: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "success", "error"],
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    output: {
      type: Object,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const answersJob = mongoose.model("answersJob", schema);
  return answersJob;
};
