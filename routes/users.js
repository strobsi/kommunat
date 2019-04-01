const express = require("express");


const router = express.Router();

// Log a user out
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;
