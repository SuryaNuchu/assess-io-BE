module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    lastFiveWeightedAvg: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
    },
    subjectId: {
      type: String,
    },
    type: {
      type: String,
      default: "subject",
      enum: ["subject", "unit"],
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const QuestionMetaData = mongoose.model("questionmetadata", schema);
  return QuestionMetaData;
};
