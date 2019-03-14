const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const auth = require("./auth");
const middleware = require("./middleware");

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const komunatRouter = require("./routes/komunat");
const resultRouter = require("./routes/result");

// App initialization
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.use(session({
  secret: "blablublub",
  resave: true,
  saveUninitialized: false
}));

// Cross origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(auth.oidc.router);
app.use(middleware.addUser);


// Routes
app.use("/", publicRouter);
app.use("/dashboard", middleware.loginRequired, dashboardRouter);
app.use("/profile",middleware.loginRequired, profileRouter);
app.use("/komunat",middleware.loginRequired, komunatRouter);
app.use("/result",resultRouter);
app.use("/users",usersRouter);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
