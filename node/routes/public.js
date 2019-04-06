const express = require("express");
const expressSanitizer = require('express-sanitizer');


const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.writeHead(301, { "Location": "https://komunat.de/dashboard' });
});

module.exports = router;
