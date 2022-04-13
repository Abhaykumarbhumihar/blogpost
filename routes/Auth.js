const express = require("express");
var router = express.Router();
const req = require("express/lib/request");
const User = require("../modals/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


//register user
// router.post(async (req, res) => {});

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SEC
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    console.log("KDLSFKSDFKDKFLDS" + err);
    res.status(500).json(err);
  }
});

//login user

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    var decrypted = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SEC
    );
    const decpaswword = decrypted.toString(CryptoJs.enc.Utf8);

    if (decpaswword == req.body.password) {
      const accessToke = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "5d" }
      );

      const { password, __v, ...others } = user._doc;
      var userdata = { ...others, accessToke };
      var data = {
        success: true,
        message: "Login complete",
        data: userdata,
      };
      res.status(201).json(data);
    } else {
      res.status(501).json("Password is wrong");
    }
  } else {
    var data = {
      success: false,
      message: "Email not found",
    };
    res.status(501).json(data);
  }
});



module.exports = router;
