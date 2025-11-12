const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret, refreshSecret } = require("../configuration/jwtConfig");

// Generate tokens
function generateTokens(user) {
  const payload = { _id: user._id, email: user.email };
  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) throw new Error("Incorrect password");

    return generateTokens(existingUser);
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
}

async function refreshToken(oldToken) {
  try {
    const decoded = jwt.verify(oldToken, refreshSecret); // ✅ Verify with refresh secret
    const existingUser = await User.findById(decoded._id);
    if (!existingUser) throw new Error("User not found");

    const { accessToken } = generateTokens(existingUser);
    return accessToken;
  } catch (error) {
    console.error("Refresh token error:", error.message);
    throw new Error("Invalid or expired refresh token");
  }
}

module.exports = { login, refreshToken };
