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
    const s = req.sanitize(req.userinfo.sub);

    var eventPromise = evDB.getEvents(s);
    eventPromise.then(function cb(evts) {
        if (evts !== null) {
            j = {}
            try {
                j = JSON.parse(evts);
            } catch(e) {
                console.log(e); // error in the above string (in this case, yes)!
                return;
            }
            res.render("events", {events: j  });
        }
        else {
            res.render("events", {events:[] });
        }
    });
});

router.put("/", (req, res) => {  
    const s = req.sanitize(req.userinfo.sub);

    req.body.title = req.sanitize(req.body.title);
    req.body.location = req.sanitize(req.body.location);
    req.body.startDate = req.sanitize(req.body.startDate);
    req.body.endDate = req.sanitize(req.body.endDate);

    var setEventP = evDB.setEvent(JSON.stringify(req.body),s);
    setEventP.then(function cb(evts) {
        res.send();
    });
});


router.post("/event", (req, res) => { 
    const s = req.sanitize(req.userinfo.sub);

    req.body.title = req.sanitize(req.body.title);
    req.body.location = req.sanitize(req.body.location);
    req.body.startDate = req.sanitize(req.body.startDate);
    req.body.endDate = req.sanitize(req.body.endDate);

    var eventPromise = evDB.getEvents(s);
    eventPromise.then(function cb(evts) {
        var js = {}
        try {
            js = JSON.parse(evts);
        } catch(e) {
            console.log(e); // error in the above string (in this case, yes)!
            return;
        }
       js.push(req.body);
       var setEventP = evDB.setEvent(JSON.stringify(js),s);
       setEventP.then(function cb(evts) {
            res.send();
       });
    });
});


router.delete("/:i", (req, res) => {  
    const s = req.sanitize(req.userinfo.sub);
    var x = req.params.i;
    var eventPromise = evDB.getEvents(s);
    eventPromise.then(function cb(evts) {
        var js = {}
        try {
            js = JSON.parse(evts);
        } catch(e) {
            console.log(e); // error in the above string (in this case, yes)!
            return;
        }
       for (var i = 0; i < js.length; i++) {
           if (i == x) {
                js.splice(i,1)
           }
       }
       var setEventP = evDB.setEvent(JSON.stringify(js),s);
       setEventP.then(function cb(evts) {
            res.send();
       });
    });
});



module.exports = router;