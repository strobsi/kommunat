const express = require("express");
var static = require("../db/static")
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
console.log("asdahjdsoiashd")
  candidatesPromise = static.getCandidates();
  candidatesPromise.then(function cb(c) {
     res.send(c);
    });
});

module.exports = router;