const express = require("express");
const router = express.Router();
//@route Post api/posts
//@desc create a post
//@access Private
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

router.post(
  "/",
  [
    auth,
    [
      check("text", "text i srequired")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500), send("Server error");
    }
  }
);

//@route get api/posts
//@desc get all posts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500), send("Server error");
  }
});

//@route get api/posts/:id
//@desc get  posts by id
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500), send("Server error");
  }
});
//@route delete api/posts/:id
//@desc delete a post
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check user
    if (post.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "user not autohrized" });
    }
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500), send("Server error");
  }
});
//@route put api/posts/like/:id
//@desc like a post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check post already bing like by user

    if (
      post.like.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route put api/posts/unlike/:id
//@desc unlike a post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check post already bing like by user

    if (
      post.like.filter(like => like.user.toString() == req.user.id).length == 0
    ) {
      return res.status(400).json({ msg: "post hasnt liked" });
    }
    //get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route Post api/posts/cpmment/:id
//@desc Comment on a post
//@access Private

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500), send("Server error");
    }
  }
);

//@route Post api/posts/cpmment/:id/:comment_id
//@desc deleyte comment
//@access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    ///pull out cooment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //make sure commnet exists
    if (!comment) {
      return res.status(404).json({ msg: "comment doent exists" });
    }
    if (comment.usr.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    //get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500), send("Server error");
  }
});

module.exports = router;
