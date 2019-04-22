// utils.js
// ========
const redis = require("redis")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('oiOFtl7s8iTg0IQyutaRbRFNeZFP48bU1qkgbXlceJegWtlMCQ0EJvlC0/oQcpt7JJ311rZUN/Yks0AybMcMyg==');

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
                console.log("[DB Accessor]: Got candidates: ")
                if(reply.length > 0) {
                    reply.forEach(function (r, i) {
                        reply[i] = JSON.parse(cryptr.decrypt(r));
                        client.quit()
                    })

                    resolve(reply);
                }
                else {
                    client.quit()
                    resolve(reply);
                }
            });
        })
    },
    getCandidate: function (id) {
        client = redis.createClient({
            host:process.env.REDIS,
            port:process.env.REDIS_PORT
          });
        client.on("error", function (err) {
            console.log("Error occured: "+err)
        });
        return new Promise(function (resolve, reject) {
            client.lrange("candidate_results",0,-1, function (err, cdts) {
                if(cdts.length > 0) {
                    cdts.forEach(function (reply, i) {
                    reply = cryptr.decrypt(reply);    
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
                    }
                else {
                    console.log("Empty list")
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
                }
              });
          })
    },
    getIndex: function(uuid) {
        client = redis.createClient({
            host:process.env.REDIS,
            port:process.env.REDIS_PORT
          });
        client.on("error", function (err) {
            console.log("Error occured: "+err)
        });
        return new Promise(function (resolve, reject) {
            client.lrange("candidate_results",0,-1, function (err, cdts) {
                cdts.forEach(function (reply, i) {
                reply = cryptr.decrypt(reply);
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
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            const encryptedString = cryptr.encrypt((JSON.stringify(val)));
            client.lset("candidate_results",index,encryptedString, function(err,reply) {
                resolve(j);
            });
        })
    },
    rpushCandidate: function(val) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            const encryptedString = cryptr.encrypt((JSON.stringify(val)));
            client.rpush("candidate_results",encryptedString, function(err,reply) {
                resolve(reply);
            });
        })
    },
    rpushResult: function(val) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            client.rpush("results",JSON.stringify(val), function(err,reply) {
                resolve(reply);
            });
        })
    },
    setProfile: function(val) {
        return new Promise(function(resolve, reject){
            client = redis.createClient({
                host:process.env.REDIS,
                port:process.env.REDIS_PORT
            });
            client.on("error", function (err) {
                console.log("Error occured: "+err)
            });
            const encryptedString = cryptr.encrypt((JSON.stringify(val)));
            client.lset("candidate_results",index,encryptedString, function(err,reply) {
                resolve(j);
            });
        })
    }
  };
