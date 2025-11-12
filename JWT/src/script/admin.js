const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "Daya@gmail.com" });
    if (!existingAdmin) {
      const newUser = new User({
        name: "vijay",
        email: "daya123@gmail.com",
        password: await bcrypt.hash("daya123", 10),
        role: "admin",
      });
      await newUser.save();
      console.log("Admin account created successfully");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = createAdminAccount;
