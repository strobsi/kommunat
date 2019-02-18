 var opt0 = document.getElementById("#opt0");
 var opt1 = document.getElementById("#opt1");

 var arr = [    
    [
        {
            "id":0,
            "name":"Menschenrechte",
        },
        {
            "id":1,
            "name":"Meinungsfreiheit",
        },
        {
            "id":2,
            "name":"Religionsfreiheit",
        },
        {
            "id":3,
            "name":"Soidarität",
        },
        {
            "id":4,
            "name":"Gerechtigkeit",
        }
        // {
        //     "id":5,
        //     "name":"Frieden",
        // },
        // {
        //     "id":6,
        //     "name":"Pressefreiheit",
        // },
        // {
        //     "id":7,
        //     "name":"Gleichberechtigung",
        // },
        // {
        //     "id":8,
        //     "name":"Chancengleichheit",
        // },
        // {
        //     "id":9,
        //     "name":"Patriotismus",
        // },
        // {
        //     "id":10,
        //     "name":"Tradition",
        // },
        // {
        //     "id":11,
        //     "name":"Toleranz",
        // }
    ]
]


var decisionCount = 0,
    i = 0, 
    x,
    itm,
    touple,
    r,
    greater,
    lesser,
    comparerArray,
    comparerObj;

newRound()

function newRound() {
    var needsSorting = false
    for(var i = 0; i < arr.length; i++) {
        itm = arr[i];
        if (itm.length > 1) {
            console.log("Following needs to be sorted:")
            console.log(itm)
            console.log("This needs to be sorted")

            needsSorting = true
            break;
        }
    }
    if (needsSorting) {
        touple = getRandomIndex(itm);
        comparerArray = itm.slice(0);
        r = touple[0];
        greater = [];
        lesser = [];
        arr.splice(i,1)
        
        // Get one:
        opt0.textContent = r.name
        // Get a random one, which has not the same ID.
        compareObject = getRandomIDExcept(r.id,comparerArray)
        opt1.textContent = compareObject.name
    }
    else {
        console.log("Finished sorting")
        opt1.textContent = ""
        opt0.textContent = ""
    }
}

function selected(opt) {
    
    if (comparerArray.length > 0) {
        // v1 > v0
        if (opt == 0) {
        //console.log(r.name + " is more important than " +compareObject.name)
        lesser.push(compareObject);
        }
        else {
        //console.log(r.name + " is less important than " +compareObject.name)
        greater.push(compareObject);
        }
        // Get the next value and remove the previous one. 
        if (comparerArray.length == 1 ) {
            completeRound()
        }
        else {
        compareObject = getRandomIDExcept(r.id,comparerArray)
        console.log(compareObject)
        opt1.textContent = compareObject.name
        removeById(compareObject.id)
        }
    }
    else {
        completeRound()
    }
}

function completeRound() {
    console.log("-------------------Completing round-------------------")
    // Start with comparing
    console.log("Adding the lesser array of: " + lesser.length + " elements")
    if (lesser.length > 0) {
        if (lesser.length > 1) {
            arr.splice(i, 0, lesser);                                    
        }
        else {
            arr.splice(i, 0, lesser[0]); 
        }
    }

    console.log("Adding the comparer") 
    // Add the comparer value between the lesser and greater

    arr.splice(i,0,r)
    console.log("adding the greater array of " + greater.length + " elements")
    if (greater.length > 0) {
        if (greater.length > 1) {
            arr.splice(i, 0, greater);
        } 
        else {
            arr.splice(i, 0, greater[0]); 
        }
    }
    console.log("::::::::::::::::::::::::::::::::::::::::")
    console.log("::::::::::::::::::::::::::::::::::::::::")
    deepLog(arr,"TopArray")
    console.log("::::::::::::::::::::::::::::::::::::::::")
    console.log("::::::::::::::::::::::::::::::::::::::::")
    console.log("Calling new round")
    newRound()
}

function getRandomIndex(itm){
    var rand = Math.floor(Math.random() * Math.floor(itm.length));
    return [itm[rand],rand]
}

function deepLog(arr,name) {
    
    console.log("--------"+name+"-------------")
    console.log("--------"+arr.length+"-------------")
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
    console.log("-------------------------------")
}

function generateRandom(except,max,min) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    while(except == num) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
}

function getRandomIDExcept(except,arr) {
   
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == except) {
            arr.splice(i,1)
        }
    }
    //(comparerArray,"Comparer")
    var num = Math.floor(Math.random() * (arr.length-1 + 1));
    return arr[num]
}

function removeById(id) {
    for (var i = 0; i < comparerArray.length; i++) {
        if (comparerArray[i].id == id) {
            //console.log("Removed: " + comparerArray[i].name)
            comparerArray.splice(i,1)
        }
    }
}

function getObjectById(id) {
    for (var i = 0; i < comparerArray.length; i++) {
        if (comparerArray[i].id == id) {
            return comparerArray[i]
        }
    }
}

/*
(function() {
 

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
                    console.log("Wait for decision here")

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

    function logArray(arr,name) {
        console.log("--------"+name+"-------------")
        for (var i = 0; i < arr.length; i++) {
            console.log(" |-- " + arr[i].name + " --| " + arr[i].attitude)
        }
        console.log("-------------------------------")
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

})();

*/