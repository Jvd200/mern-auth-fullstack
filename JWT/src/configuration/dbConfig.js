const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("MongoDb is connected");
});
mongoose.connection.on("error", (err) => {
  console.log("Connection fails" + err);
});
module.exports = mongoose;
