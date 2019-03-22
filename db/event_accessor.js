// eventdatabase.js
// ========
const redis = require("redis")

module.exports = {
    getEvents: function (uuid) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });

            var eID = "e_"+uuid;
            client.get(eID, function(err, reply) {
                if (reply !== null && reply !== undefined) {
                    resolve(reply)
                }
                else {
                    var empty = []
                    resolve(JSON.stringify(empty))
                    console.log("No events yet");
                }
            });
        });
    },
    setEvent: function(ev,uuid) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });

            var eID = "e_"+uuid;
            client.set(eID,ev, function(err, reply) {
                    resolve(reply)
            });
        });
    }
};
