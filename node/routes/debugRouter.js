const express = require("express");
var static = require("../db/static")
const rateLimit = require("express-rate-limit");
const router = express.Router();
var db = require("../db/db_accessor")

// Display the dashboard page
router.get("/", (req, res) => {
console.log("asdahjdsoiashd")
  candidatesPromise = db.getCandidates();
  candidatesPromise.then(function cb(c) {
     res.send(c);
    });
});

module.exports = router;