module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: true,
      },
      additionalInfo: {
        type: String,
        required: true,
      },
      studentsInfo: {
        type: Object,
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const StudentBatch = mongoose.model("studentbatch", schema);
  return StudentBatch;
};
