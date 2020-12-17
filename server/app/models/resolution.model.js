module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      goals: String,
      achieved: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Resolution = mongoose.model("resolution", schema);
  return Resolution;
};
