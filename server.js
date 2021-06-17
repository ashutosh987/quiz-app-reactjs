const express = require("express");
mongoose = require("mongoose");
const app = express();
const { check, validationResult } = require("express-validator/check");
//Init Middleware
app.use(express.json({ extended: false }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

var server = app.listen(process.env.PORT || 5000, listening);
app.get("/", (req, res) => res.send("api running"));

function listening() {
  console.log("server is running");
}
var mongoURI =
  "mongodb+srv://ashutosh:ashu@cluster0-qp4ft.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
