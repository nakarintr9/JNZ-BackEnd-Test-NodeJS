var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var jenosizeRouter = require("./routes/jenosize");

var app = express();

app.use(cors());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 วินาที
  max: 5, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//init passport
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/jenosize", jenosizeRouter);

//import middleware
const errorHandler = require("./middleware/errorHandler");

//require config
const config = require("./config/index");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
