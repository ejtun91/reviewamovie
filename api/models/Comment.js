const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    profileImg: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
