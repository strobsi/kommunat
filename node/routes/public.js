const express = require("express");
const expressSanitizer = require('express-sanitizer');


const router = express.Router();

// Home page
router.get("/", (req, res) => {
    var ua = req.header('user-agent');
    // Check the user-agent string to identyfy the device. 
    res.render("index");
});

module.exports = router;
