// utils.js
// ========
const redis = require("redis")
const Cryptr = require('cryptr');
var fs = require('fs');
const path = require('path');

module.exports = {
    getCandidates: function () {
        return new Promise(function(resolve, reject){
            var v = path.join(__dirname, "/2019-05-04.json");
            fs.readFile(v, function (err, data) {
                resolve(JSON.parse(data));
            })
        })
    },
    getEvents: function (e) {
        return new Promise(function(resolve, reject){
            var v = path.join(__dirname, "/2019-04-29-events.json");
            fs.readFile(v, function (err, data) {
                resolve(JSON.parse(data));
            })
        })
    }
};
