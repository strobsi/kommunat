// eventdatabase.js
// ========
const redis = require("redis")
const Cryptr = require('cryptr');
const cryptr = new Cryptr("oiOFtl7s8iTg0IQyutaRbRFNeZFP48bU1qkgbXlceJegWtlMCQ0EJvlC0/oQcpt7JJ311rZUN/Yks0AybMcMyg==");
 

module.exports = {
    getEvents: function (uuid) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });

            var eID = "e_"+uuid;
            client.get(eID, function(err, reply) {
                if (reply !== null && reply !== undefined) {
                    const decryptedString = cryptr.decrypt(reply);
                    resolve(decryptedString)
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
        console.log(uuid);
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });

            encryptedString = cryptr.encrypt((ev));

            var eID = "e_"+uuid;
            client.set(eID,encryptedString, function(err, reply) {
                    resolve(reply)
            });
        });
    }
};
