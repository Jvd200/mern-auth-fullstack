const authService = require("../services/login");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await authService.login(
      email,
      password
    );
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function refreshToken(req, res) {
  const { token } = req.body;
  try {
    if (!token) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const newAccessToken = await authService.refreshToken(token);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  login,
  refreshToken,
};
