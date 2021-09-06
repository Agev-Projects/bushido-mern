const jwt = require("jsonwebtoken");
const User = require("../models/users");

const SECRET_KEY = process.env.SECRET_KEY;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check jwt exists & verify

  try {
    const data = jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
      return decodedToken;
    });
    req.userId = data;
    next();
  } catch {
    next();
  }
};

module.exports = {
  requireAuth,
};
