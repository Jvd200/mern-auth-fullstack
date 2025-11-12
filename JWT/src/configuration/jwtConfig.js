const crypto = require("crypto");

require("dotenv").config();

//generate random  secret key
const secretkey = crypto.randomBytes(32).toString("hex");

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
};
