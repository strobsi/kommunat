const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const auth = require("./auth");
const middleware = require("./middleware");
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet')

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const komunatRouter = require("./routes/komunat");
const contentRouter = require("./routes/contents");
const eventRouter = require("./routes/events");
const resultRouter = require("./routes/result");
const dsgvoRouter = require("./routes/dsgvo");
const impressumRouter = require("./routes/impressum");
const favicon = require('express-favicon');

// App initialization
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(helmet())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressSanitizer());
app.use(favicon(__dirname + '/assets/favicon.png'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(auth.oidc.router);
app.use(middleware.addUser);

// Routes
app.use("/portal", middleware.loginRequired, dashboardRouter);
app.use("/profile",middleware.loginRequired, profileRouter);
app.use("/komunat",middleware.loginRequired, komunatRouter);
app.use("/contents",middleware.loginRequired, contentRouter);
app.use("/events",middleware.loginRequired, eventRouter);
app.use("/result", resultRouter);
app.use("/users", usersRouter);
app.use("/impressum", impressumRouter);
app.use("/dsgvo", dsgvoRouter);

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
