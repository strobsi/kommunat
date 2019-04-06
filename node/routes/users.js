const express = require("express");
const auth = require("../auth");
const router = express.Router();

// Log a user out
router.get("/logout", (req, res) => {
  auth.oktaClient.endAllUserSessions(req.userinfo.sub)
  .then(() => {
    console.log('All user sessions have ended');
  });
  req.logout();
  req.session.destroy();
  res.redirect("/dashboard");
});

module.exports = router;
