const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var evDB = require("../db/event_accessor")
const expressSanitizer = require('express-sanitizer');

// Display the dashboard page
router.get("/", (req, res) => {
    var ev = []
    var eventPromise = evDB.getEvents(req.userinfo.sub);
    eventPromise.then(function cb(evts) {
        if (evts !== null) {
            res.render("events", {events: JSON.parse(evts)  });
        }
        else {
            res.render("events", {events:[] });
        }
    });
});

router.put("/", (req, res) => {  
    console.log("Event update: "+req.body)
    var b = req.body;
    var setEventP = evDB.setEvent(JSON.stringify(b),req.userinfo.sub);
    setEventP.then(function cb(evts) {
        res.send();
    });
});


router.post("/event", (req, res) => {  
    var eventPromise = evDB.getEvents(req.userinfo.sub);
    eventPromise.then(function cb(evts) {
       var js = JSON.parse(evts);
       js.push(req.body);
       var setEventP = evDB.setEvent(JSON.stringify(js),req.userinfo.sub);
       setEventP.then(function cb(evts) {
            res.send();
       });
    });
});


router.delete("/:i", (req, res) => {  
    var x = req.params.i;
    console.log("Remove")
    var eventPromise = evDB.getEvents(req.userinfo.sub);
    eventPromise.then(function cb(evts) {
       var js = JSON.parse(evts);
       for (var i = 0; i < js.length; i++) {
           if (i == x) {
                js.splice(i,1)
           }
       }
       var setEventP = evDB.setEvent(JSON.stringify(js),req.userinfo.sub);
       setEventP.then(function cb(evts) {
            res.send();
       });
    });
});



module.exports = router;