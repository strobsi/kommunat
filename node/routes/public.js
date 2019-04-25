const express = require("express");
const expressSanitizer = require('express-sanitizer');


const router = express.Router();

// Home page
router.get("/", (req, res) => {
    var ua = req.header('user-agent');
    // Check the user-agent string to identyfy the device. 
    if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
        res.writeHead(302, {'Location': 'https://komunat.de/app' + req.url});
        res.end();
    } else {
        res.redirect('https://komunat.de/dashboard');
    }
});

module.exports = router;
