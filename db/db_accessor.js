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
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            client.lrange("candidate_results",0,-1, function(err,reply) {
                console.log("[DB Accessor]: Got candidates")
                client.quit()
                resolve(reply);
            });
        })
    },
    getCandidate: function (id) {
        client = redis.createClient({
            host:"localhost",
            port:6379
          });
        client.on("error", function (err) {
            console.log("Error occured: "+err)
        });
        return new Promise(function (resolve, reject) {
            client.lrange("candidate_results",0,-1, function (err, cdts) {
                var cIndex = 0;
                cdts.forEach(function (reply, i) {
                  j = {}
                      try {
                          j = JSON.parse(reply);
                      } catch(e) {
                          console.log(e); // error in the above string (in this case, yes)!
                          return;
                      }
                      if(j.metadata.uuid === id) {
                        resolve(j)
                      }
                });
                reject("Something went terribly wrong");
              });
          })
    },
    getIndex: function(uuid) {
        client = redis.createClient({
            host:"localhost",
            port:6379
          });
        client.on("error", function (err) {
            console.log("Error occured: "+err)
        });
        return new Promise(function (resolve, reject) {
            client.lrange("candidate_results",0,-1, function (err, cdts) {
                var cIndex = 0;
                cdts.forEach(function (reply, i) {
                  j = {}
                      try {
                          j = JSON.parse(reply);
                      } catch(e) {
                          console.log(e); // error in the above string (in this case, yes)!
                          return;
                      }
                      if(j.metadata.uuid === uuid) {
                        console.log("he is at index: " + i)
                        resolve(i)
                      }
                }); 
              });
          })
    },
    setCandidate: function(val,index) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            client.lset("candidate_results",index,JSON.stringify(val), function(err,reply) {
                resolve(j);
            });
        })
    }, 
    rpushCandidate: function(val) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            client.rpush("candidate_results",JSON.stringify(val), function(err,reply) {
                j = {}
                      try {
                          j = JSON.parse(reply);
                      } catch(e) {
                          console.log(e); // error in the above string (in this case, yes)!
                          return;
                }
                resolve(j);
            });
        })
    },
    rpushResult: function(val) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:"localhost",
                port:6379
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            client.rpush("results",JSON.stringify(val), function(err,reply) {
                j = {}
                      try {
                          j = JSON.parse(reply);
                      } catch(e) {
                          console.log(e); // error in the above string (in this case, yes)!
                          return;
                }
                resolve(j);
            });
        })
    }
  };
