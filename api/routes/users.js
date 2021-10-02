const router = require("express").Router();
const bcrypt = require("bcrypt");
const Comment = require("../models/Comment");
const User = require("../models/User");

//UPDATE USER
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const commentsArr = await Comment.find();
  let usersComments = [];

  user.comments.map((each) => {
    usersComments.push(each);
  });
  try {
    if (req.body.userId === req.params.id) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      commentsArr.map(async (eachComment) => {
        for (let i = 0; i < usersComments.length; i++) {
          if (eachComment.id === usersComments[i].id) {
            await Comment.updateMany(eachComment, {
              $set: req.body,
            });
          }
        }
      });

      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json("You cannot update this account");
  }
});
//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Comment.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("you can only delete your account");
  }
});
//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
