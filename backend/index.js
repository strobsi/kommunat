const express = require('express')
const exhbs = require("express-handlebars")
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
const port = 3000
const redis = require("redis")
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

app.get('/vote', (req, res) => {
    res.render('vote', {title: "Komunat", layout: 'vote.handlebars'});
})

// Post result
app.post('/result',jsonParser, (req, res) => {
    // Store Results
    console.log(req.body);
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    client.rpush("results",JSON.stringify(req.body))
    client.quit()
    res.send()
})

// Get Results
app.get('/api/results', (req, res) => {
    // Get all results until now. 
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    client.lrange("results",0,-1,function(err, reply) {
        console.log(reply); 
        var jsArray = []
        for (var i = 0; i < reply.length; i++ ) {
            jsArray.push(JSON.parse(reply[i]))
        }
        client.quit()
        res.send(jsArray);
    }); 
})

/*
app.get('/profile', keycloak.protect(),  (req, res) => {
    res.render("profile", { title: "Profil" });
})
*/


app.listen(port, () => console.log(`Example app listening on port ${port}!`))