const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.Status(401).json({ message: "Unauthorized: No token provided" });
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .Status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Forbidden: Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  authenticateToken,
  verifyToken,
};
