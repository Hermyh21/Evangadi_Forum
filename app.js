require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const dbConn = require("./db/dbConfig");
const userRoutes = require("./routes/userRoute");
const controller = require("./controller/controller");
const questionRoutes = require("./routes/questionRoute");
const router = express.Router();
// register route
// app.post("/api/users/register", (req, res) => {
//   res.send("register user");
// });
// app.post("/api/users/login", (req, res) => {
//   res.send("login user");
// });
// app.get("/api/users/check", (req, res) => {
//   res.send("check user");
// });
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
async function start() {
  try {
    const result = await dbConn.execute("select 'test'");
    await app.listen(port);
    console.log("db connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
// app.listen(port, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Connected and running on ${port}`);
//   }
// });
module.exports = router;
