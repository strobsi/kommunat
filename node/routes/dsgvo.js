const express = require("express");


const router = express.Router();

// Log a user out
router.get("/", (req, res) => {
  res.render("dsgvo");
});


module.exports = router;
