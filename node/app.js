const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
//const auth = require("./auth");
const middleware = require("./middleware");
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet')
var cors = require('cors')

const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const komunatRouter = require("./routes/komunat");
const resultRouter = require("./routes/result");
const dsgvoRouter = require("./routes/dsgvo");
const impressumRouter = require("./routes/impressum");
const favicon = require('express-favicon');
const debugRouter = require("./routes/debugRouter");

// App initialization
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(cors())
app.use(helmet())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressSanitizer());
app.use(favicon(path.join(__dirname, "assets/favicon.png")));

// Routes
app.use("/", publicRouter);
app.use("/debug",debugRouter);

console.log("listen")

app.use("/result", resultRouter);

/*
app.use("/komunat",middleware.loginRequired, komunatRouter);
app.use("/contents",middleware.loginRequired, contentRouter);
app.use("/users", usersRouter);
app.use("/impressum", impressumRouter);
app.use("/dsgvo", dsgvoRouter);
*/
// Error handlers
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000);

module.exports = app;
