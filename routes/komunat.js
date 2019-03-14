const express = require("express");
const redis = require("redis")
const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
  client = redis.createClient({
    host:"localhost",
    port:6379
  });
  client.lrange("candidate_results",0,-1, function (err, cdts) {
    var isAlreadyInserted = false;
    var vList = []
    cdts.forEach(function (reply, i) {
        j = JSON.parse(reply)
        if(j.metadata.uuid === req.userinfo.sub) {
          isAlreadyInserted = true;
          vList = j.values;    
        }
   });
   if (!isAlreadyInserted) {
      res.render("komunat", {userID: req.userinfo.sub, valueList: []  });
   }
   else {
      res.render("komunat", {userID: req.userinfo.sub, valueList: vList  });
   }
  });
});

module.exports = router;