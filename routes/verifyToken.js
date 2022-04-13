const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not allowed");
  }
};

//ye middleware verifiy krne k liye hai ki ye token  hai ya nhi
const verifiTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("USER Data", req.user);

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that");
    }
  });
};

//ye middleware verifiy krne k liye hai ki ye token Admin ka  hai ya nhi
const verifiTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifiTokenAndAuthorization,
  verifiTokenAndAdmin,
};
