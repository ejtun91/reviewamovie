const Comment = require("../models/Comment");
const User = require("../models/User");
const router = require("express").Router();

//CREATE COMMENT
router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const user = await User.findOne({ username: comment.username });
    try {
      await User.updateOne(user, {
        $push: {
          comments: { $each: [{ id: comment.id, username: comment.username }] },
        },
      });
      //  console.log(user);
    } catch (error) {}
    try {
      const newComment = await comment.save();
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {}
});

//UPDATE ALL COMMENTS
router.put("/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: user._id });
    console.log(user);
    const comments = await Comment.find({ username: user.username });
    try {
      const updatedComments = await Comment.updateMany(comments, {
        $set: { username: req.body.username },
      });
      res.status(200).json(updatedComments);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(404).json("no comment found");
  }
});

//UPDATE COMMENT
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (
      comment.username === req.body.username &&
      comment.movieId === req.body.movieId
    ) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedComment);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you cannot update this comment");
    }
  } catch (error) {
    res.status(404).json("comment not found");
  }
});
//DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ id: req.params.id });
    const user = await User.findOne({ username: req.body.username });
    if (comment.username === user.username) {
      try {
        await comment.delete();
        await User.updateOne(user, {
          $pull: { comments: { id: comment.id } },
        });
        res.status(200).json("comment has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you cannot delete this comment");
    }
  } catch (error) {
    res.status(404).json("comment not found");
  }
});
//GET ALL COMMENTS
router.get("/", async (req, res) => {
  const movieId = req.query.all;
  try {
    const comment = await Comment.find();
    const newComments = await Comment.find({ movieId });
    res.status(200).json(newComments);
  } catch (error) {}
});
//GET COMMENT
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
