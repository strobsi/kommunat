const express = require('express')
const exhbs = require("express-handlebars")
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express()
const port = 3000

app.engine("handlebars",exhbs({defaultLayout:"main"}))
app.use(express.static("public"))
app.set("view engine", "handlebars")

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
    res.render("vote", { title: "Vote" });
})/*
app.get('/profile', keycloak.protect(),  (req, res) => {
    res.render("profile", { title: "Profil" });
})
*/


app.listen(port, () => console.log(`Example app listening on port ${port}!`))