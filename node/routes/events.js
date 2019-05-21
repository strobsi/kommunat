const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var evDB = require("../db/event_accessor")
const expressSanitizer = require('express-sanitizer');
const rateLimit = require("express-rate-limit");
var Validator = require('jsonschema').Validator;
var schemata = require("../utils/const");

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 1 hour window
    max: 200, // start blocking after 5 requests
    message:
      "Too many requests from this IP, please try again later"
  });

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

router.put("/", apiLimiter, (req, res) => {  

    var v = new Validator();
    if(v.validate(req.body, schemata.eventSchema()).valid) {
        const s = req.sanitize(req.userinfo.sub);   
        console.log(req.body);
        for (var i = 0; i < req.body.length; i++) {
            req.body[i].title = req.sanitize(req.body[i].title);
            req.body[i].location = req.sanitize(req.body[i].location);
            req.body[i].startDate = req.sanitize(req.body[i].startDate);
            req.body[i].endDate = req.sanitize(req.body[i].endDate);
        }
        var setEventP = evDB.setEvent(JSON.stringify(req.body),s);
        setEventP.then(function cb(evts) {
            res.send();
        });
    }
    else {
        res.status(400);
        res.send();
    }
});


router.post("/event", apiLimiter, (req, res) => { 

    var v = new Validator();
    if(v.validate(req.body, schemata.eventSchemaNew()).valid) {
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
    }
    else {
        res.status(400);
        res.send();
    }
});

router.delete("/:i", apiLimiter, (req, res) => {  
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