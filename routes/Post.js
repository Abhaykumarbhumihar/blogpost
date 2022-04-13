const express = require("express");
var router = express.Router();



const {
  verifyToken,
  verifiTokenAndAuthorization,
  verifiTokenAndAdmin,
} = require("./verifyToken");
const Post = require("../modals/Post");

//save post

router.post("/savepost", verifyToken, async (req, res) => {
  var useri = req.user.id;
  var savepost = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    userid: useri.toString(),
  });

  try {
    const post = await savepost.save();
    var data = {
      success: true,
      message: "Post sahre success",
      data: post,
    };
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get my post

router.get("/mypost", verifyToken, async (req, res) => {
  try {
    var post = await Post.find({ userid: req.user.id });
    var data = {
      success: true,
      message: "Post fetch complete",
      data: post,
    };
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  //
});

//get all post

router.get("/allpost", async (req, res) => {
  try {
    var post = await Post.find();
    var data = {
      success: true,
      message: "Post fetch complete",
      data: post,
    };
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  //
});

//get  post by id
router.get("/post/:id", async (req, res) => {
  try {
    var post = await Post.findById(req.params.id);

    var data = {
      success: true,
      message: "data fetch ",
      data: post,
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(501).json("Somethig wrong");
  }
});
//https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657#:~:text=Import%20express%2Cmulter%20and%20initialize%20port%20variable%20to%203000.&text=This%20will%20set%20image%20upload,as%20uploaded%20file's%20original%20name.
//update post

router.post("/updatePost", verifyToken, async (req, res) => {
  try {
    var tuserid = req.user.id;
    var postid = req.body.postid;
    var post = await Post.findById(postid);
    if (tuserid == post.userid) {
      try { 
        const updatePost = await Post.findByIdAndUpdate(
          postid,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("Sorry you can not update this post");
    }
  } catch (err) {
    res.status(500).json("Unauthorised");
  }
});


//delete post


module.exports = router;
