module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    components: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    startedOn: {
      type: Date,
      required: true,
    },
    endedOn: {
      type: Date,
      required: true,
    },
    testId: {
      type: String,
      required: true,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Answers = mongoose.model("answers", schema);
  return Answers;
};
