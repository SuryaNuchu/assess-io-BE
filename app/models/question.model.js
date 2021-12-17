module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      type: {
        type: String,
        required: true,
        enum: ["mcq", "rearrange", "coding", "fillintheblank"],
      },
      subjectData: {
        type: Object,
        required: true,
      },
      unitData: {
        type: Object,
        required: true,
      },
      components: {
        type: Object,
        required: true,
      },
      time: {
        type: Date,
      },
      createdBy: {
        type: String,
        required: true,
      },
      complexity: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"],
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Question = mongoose.model("question", schema);
  return Question;
};
