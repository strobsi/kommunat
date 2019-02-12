var fs = require("fs");

function getRandomIndex(arr){
    var rand = Math.floor(Math.random() * Math.floor(arr.length));
    return [arr[rand],rand]
}
function logArray(arr,name) {
    console.log("--------"+name+"-------------")
    for (var i = 0; i < arr.length; i++) {
        console.log(" |-- " + arr[i].name + " --| " + arr[i].attitude)
    }
    console.log("-------------------------------")
}

function deepLog(arr,name) {
    console.log("--------"+name+"-------------")
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > 1) {
            deepLog(arr[i],"Level "+i)
        }
        console.log(" |-- " + arr[i].name + " --| " + arr[i].attitude)
    }
    console.log("-------------------------------")
}

function sort(arr) {
    var decisionCount = 0;
    // Iterate through array
    for (var i = 0; i < arr.length; i++) {
        var itm = arr[i];
        // If item is itself an array, we have to sort it
        if (itm.length > 1) {
            // Get random object from this array and take it as comparable value, e.g. Pressefreiheit
            var touple = getRandomIndex(itm)
            var r = touple[0]
            
            // Initialize two arrays (the greater and the lesser one)
            var greater = []
            var lesser = []
            // Clear the array
            arr.splice(i,1)

            // Compare the values and push it to the right array
            for (var x = 0; x < itm.length; x++) {
                decisionCount++
                if (r.attitude > itm[x].attitude) {
                    lesser.push(itm[x]);
                }
                if (r.attitude < itm[x].attitude) {
                    greater.push(itm[x]);
                }
            }
            
            // Now let's push back the value/remaining arrays to the array
            if (lesser.length > 0) {
                if (lesser.length > 1) {
                    arr.splice(i, 0, lesser);                                    
                }
                else {
                    arr.splice(i, 0, lesser[0]); 
                }
            }
            // Add the comparer value between the lesser and greater
            arr.splice(i,0,r)
            if (greater.length > 0) {
                if (greater.length > 1) {
                    arr.splice(i, 0, greater);
                } 
                else {
                    arr.splice(i, 0, greater[0]); 
                }
            }
            // Do this recursively            
            sort(arr)
        }
    }
    // We have sorted the array by the attitude of the user, we can now return it
    return arr
}

// Get the x-dimensional value
function calculateValue(input) {
    var rankPoints = []
    var rank = 9;
    for (var i = 0; i < input.length; i++) {
        var r = {
            id: input[i].id,
            value: rank
        }
        rank--
        rankPoints.push(r)
    }
    return rankPoints
}

// Important to sort the arrays by the common id
function sortById(arr) {
    arr.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    return arr
}

function getDistance(x,y) {
    // To get the distance, we have to sort the array by the id's
    x = sortById(x)
    y = sortById(y)
    var arrVal = []
    // Now just calculate the value, pure math 
    for(var i = 0; i < x.length; i++) {
        arrVal.push( (x[i].value - y[i].value) * (x[i].value-y[i].value) )
    }
    var sum = 0;
    for(var n = 0; n < arrVal.length; n++) {
        sum+=arrVal[n]
    }
    return Math.sqrt(sum)
    //Distance = √[ (xA − xB)2 + (yA − yB)2 + (zA − zB)2 +...]
}


// This simulates test user 0
var contents = fs.readFileSync("gaby.json");
var jsonContent = JSON.parse(contents);
console.log("-----------------------------------")
console.log("Sorting...")
var js = sort(jsonContent)
//console.log(js)
console.log("Sorting finished")
console.log("-----------------------------------")
var result1 = calculateValue(js)


// This simulates test user 1
var contents2 = fs.readFileSync("original_0.json");
var jsonContent2 = JSON.parse(contents2);
console.log("-----------------------------------")
console.log("Sorting...")
var js2 = sort(jsonContent2)
//console.log(js2)
console.log("Sorting finished")
console.log("-----------------------------------")
var result2 = calculateValue(js2)


// Now calculate the distance
var distance = getDistance(result1,result2)
console.log("You are (politically) " + distance +" metrics distanced from the laptop")