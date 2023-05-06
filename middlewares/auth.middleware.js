const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "masai");

    if (decoded) {
      if (decoded.isAdmin) {
        next();
      } else {
        res.status(400).send({ msg: "Not authorized" });
      }
    } else {
      res.status(400).send({ msg: "Not authorized" });
    }
  } else {
    res.status(400).send({ msg: "Not authorized, token missing" });
  }
};

module.exports = isAuth;
