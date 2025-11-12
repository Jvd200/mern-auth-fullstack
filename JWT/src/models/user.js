const mongoose = require("../configuration/dbConfig");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user", "customer"],
    default: "customer",
  },
});
module.exports = mongoose.model("User", userSchema);

//install bcrypt
//bycrypt is used to convert password into hash
