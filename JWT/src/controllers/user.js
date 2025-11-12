const userService = require("../services/user");

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getUsers,
};
