const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // 세션 유효 시간 1일 -> 30분으로 변경
    },
  }),
);

const homeRouter = require('./routes/home');
app.use('/home', homeRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log(`Sever Open: ${PORT}`);
});
