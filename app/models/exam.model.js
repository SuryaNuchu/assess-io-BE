module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    batchName: {
      type: String,
      required: true,
    },
    createdMail: {
      type: String,
      required: true,
    },
    examCode: {
      type: String,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    batchId: {
      type: String,
      required: true,
    },
    studentsInfo: {
      type: Object,
      required: true,
    },
    questions: {
      type: Object,
      required: true,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Exam = mongoose.model("exam", schema);
  return Exam;
};
