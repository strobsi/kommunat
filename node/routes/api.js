const express = require("express");
const router = express.Router();
var db = require("../db/db_accessor");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour window
  max: 20, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again later"
});

router.get('/results',apiLimiter, (req, res) => {
// No candidate, get matches
  len = db.resultlength();
  len.then(function cb(length) {
    var returnObj = {
        count: length
    }
    res.send(JSON.stringify(returnObj));
  });
}),

router.post('/feedback',apiLimiter, (req, res) => {

  var age = req.sanitize(req.body.age);
  var zip = req.sanitize(req.body.zip);
  var gender = req.sanitize(req.body.gender);
  var comment = req.sanitize(req.body.comment);

  var dat = {
    age: age,
    zip: zip,
    gender: gender,
    comment: comment
  }
  feedbackPromise = db.pushFeedback(dat);
  feedbackPromise.then(function cb() {
      res.send();
  });
});
/*
router.get('/feedback',apiLimiter, (req, res) => {
  feedbackPromise = db.getFeedback();
  feedbackPromise.then(function cb(fb) {
    var returnObj = {
        count: fb
    }
    res.send(JSON.stringify(returnObj));
  });
});
*/
module.exports = router;
