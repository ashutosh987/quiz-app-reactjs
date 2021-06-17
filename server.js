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
app.get("/", (req, res) => res.send("api running"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var server = app.listen(process.env.PORT || 5000, listening);

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
