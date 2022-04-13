const express = require("express");
var router = express.Router();
const req = require("express/lib/request");
const User = require("../modals/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
    verifyToken,
    verifiTokenAndAuthorization,
    verifiTokenAndAdmin,
  } = require("./verifyToken");
//update User

router.put("/updateUser", verifyToken, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SEC
      ).toString();
    }
  try {
      const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body, 
        },
        { new: true }
      ); 
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  


  //Delete
router.delete("/deleteuser", verifyToken, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      var data={
          success:true,
          message:"user delete"
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;
