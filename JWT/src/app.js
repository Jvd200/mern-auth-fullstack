const express = require("express");
const cors = require("cors");

const signupRoute = require("../src/routes/signup");
const createAdminAccount = require("./script/admin");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.listen(PORT, () => {
  console.log("Server is running on:  http://localhost:" + PORT);
});
console.log(process.env.MONGO_URI);
