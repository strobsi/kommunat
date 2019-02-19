const express = require('express')
const exhbs = require("express-handlebars")
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
const port = 3000
const utils = require('./utils/utils');
const db = require('./db/db_accessor');

app.engine("handlebars",exhbs({defaultLayout:"main"}))

app.use(express.static("public"))
app.set("view engine", "handlebars")
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//var memoryStore = new session.MemoryStore();
//var keycloak = new Keycloak({ store: memoryStore });

//session
/*
app.use(session({
    secret:'thisShouldBeLongAndSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));
  
  app.use(keycloak.middleware());
  app.use( keycloak.middleware( { logout: '/'} ));
  */


app.get('/', (req, res) => {
    res.render("index", { title: "Home" });
})

app.get('/about', (req, res) => {
    res.render("about", { title: "About" });
})

app.get('/komunat', (req, res) => {
    res.render('komunat', {title: "Komunat", layout: 'komunat.handlebars'});
})

// Post result will upload the result to the database and calculate the matches
app.post('/result',jsonParser, (req, res) => {
    // Store Results
    var savePromise = db.saveResult(req.body);
    var cdtsPromise;
    savePromise.then(function(result) {
        console.log("[Main]: Saved result")
        cdtsPromise = db.getCandidates(req.body);
        cdtsPromise.then(function(result) {
            console.log("[Main]: Got candidates")
            res.send()
        }, function(err) {
            console.log(err);
        })
    }, function(err) {
        console.log(err);
    })
})

/*
// Get Results
app.get('/api/results', (req, res) => {
    // Get all results until now. 
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    client.lrange("results",0,-1,function(err, reply) {
        console.log(reply); 
        res.send(jsArray);
    }); 
})
*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))