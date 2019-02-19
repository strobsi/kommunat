// utils.js
// ========
const redis = require("redis")

module.exports = {
    getCandidates: function () {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.lrange("candidate_results",0,-1, function(err,reply) {
                console.log("[DB Accessor]: Got candidates")
                resolve(reply);
            });
        })
    },
    getCandidate: function (id) {
        console.log("Get candidate")
    },
    saveResult: function(result) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.rpush("results",JSON.stringify(result), function(err,reply) {
                console.log("[DB Accessor]: Saved results")
                resolve(JSON.parse(reply));
            });
        })
    }
  };
