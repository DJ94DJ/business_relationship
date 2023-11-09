const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use( "/static", express.static( "static" ) );
app.use(express.urlencoded({ extended: true }));

const homeRouter = require("./routes/home");
app.use("/home", homeRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
