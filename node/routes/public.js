const express = require("express");
const expressSanitizer = require('express-sanitizer');


const router = express.Router();

// Home page
router.get("/", (req, res) => {
    res.redirect('https://komunat.de/dashboard');
});

module.exports = router;
