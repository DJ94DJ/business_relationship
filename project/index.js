const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use( "/static", express.static( "static" ) );
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");
app.use("/", router);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
