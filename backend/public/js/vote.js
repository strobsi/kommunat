 var opt0 = document.getElementById("#opt0");
 var opt1 = document.getElementById("#opt1");

 var btn0Val;
 var btn1Val;

 var lesser = []
 var greater = []

 var comparer = []

 var insertIndex = 0;

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
        },
        {
              "id":5,
              "name":"Frieden",
        },
        {
              "id":6,
              "name":"Pressefreiheit",
        },
        {
             "id":7,
             "name":"Gleichberechtigung",
        },
        {
             "id":8,
             "name":"Chancengleichheit",    
        },
        {
            "id":9,
             "name":"Patriotismus",
        },
        {
            "id":10,
            "name":"Tradition",
        },
        {
            "id":11,
            "name":"Toleranz",
        }
    ]
]

newRound()

function newRound() {
    var needsToBeSorted = false
    for (var i = 0; i < arr.length; i++) {
        if(arr[i].length > 1) {
            insertIndex = i;
            console.log("Inserting index: " + insertIndex)
            console.log("This needs to be sorted")
            needsToBeSorted = true
            break;
        }
    }
    if (needsToBeSorted) {
        sortArray = arr[i]
        var v0 = getRandomIndex(sortArray)
        comparer = sortArray.slice(0)
        arr.splice(insertIndex,1)
        sort(v0[0])
    } else {
        console.log("Finished sorting")
        opt0.textContent = ""
        opt1.textContent = ""
    }
}

function sort(fixed) {
    console.log("Cleaning up at " + insertIndex)
    if(comparer.length > 0) {
        var v1 = getRandomIDExcept(fixed.id, comparer)
        opt0.textContent = fixed.name
        opt1.textContent = v1.name
        btn0Val = fixed
        btn1Val = v1
    }
    else {
        console.log("Finished round")
        completeRound()
    }
}

function selected(index) {
    if (index == 0) {
        lesser.push(btn1Val)
    }
    else {
        greater.push(btn1Val)
    }
    removeById(btn1Val.id)

    sort(btn0Val)
}

function completeRound() {
    
    console.log("-------------------Completing round-------------------")
    // Start with comparing
    console.log("Adding the lesser array of: " + lesser.length + " elements")
    if (lesser.length > 0) {
        if (lesser.length > 1) {
            arr.splice(insertIndex, 0, lesser);                                    
        }
        else {
            arr.splice(insertIndex, 0, lesser[0]); 
        }
    }

    console.log("Adding the comparer") 
    // Add the comparer value between the lesser and greater

    arr.splice(insertIndex,0,btn0Val)
    console.log("adding the greater array of " + greater.length + " elements")
    if (greater.length > 0) {
        if (greater.length > 1) {
            arr.splice(insertIndex, 0, greater);
        } 
        else {
            arr.splice(insertIndex, 0, greater[0]); 
        }
    }
    lesser = []
    greater = []
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
    var num = Math.floor(Math.random() * (arr.length-1 + 1));
    return arr[num]
}

function removeById(id) {
    for (var i = 0; i < comparer.length; i++) {
        if (comparer[i].id == id) {
            comparer.splice(i,1)
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