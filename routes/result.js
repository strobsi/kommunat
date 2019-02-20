const express = require("express");
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const redis = require("redis")

// Post result
router.post('/',jsonParser, (req, res) => {
    // Store Results
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    if (req.body.metadata.isCandidate) {
      console.log("We have a candidate here with the userID: " + req.body.metadata.uuid)
      client.rpush("candidate_results",JSON.stringify(req.body))
    } else {
      client.rpush("results",JSON.stringify(req.body))
    }
    client.quit()
    res.send()
  })

module.exports = router;