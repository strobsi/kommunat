// Get the two buttons we have
var opt0 = document.getElementById("#opt0");
var opt1 = document.getElementById("#opt1");

// Storing the values we currently have in some placeholders
var btn0Val;
var btn1Val;

// The arrays, where we add the values after each decision
var lesser = []
var greater = []

// The comparer array will be the list of values we have to compare to
var comparer = []

// Inserting index is the index, we insert the arrays after a decision round
var insertIndex = 0;

// decisionCounter tracks the number of decision
var decisionCounter = 0;

// used to track the time the user took to complete
var startedTimeStamp = 0;

// User mail to identify result
var uuid = "";

// These are the values we judge on currently, can be outsourced in long term 
var arr = [
    [
        {
            "id": 0,
            "name": "Bezahlbaren Wohnraum schaffen",
        },
        {
            "id": 1,
            "name": "Preise für Bus und Bahn senken",
        },
        {
            "id": 2,
            "name": "Alternativen zum Auto fördern",
        },
        {
            "id": 3,
            "name": "Die Kinderbetreuung ausbauen",
        },
        {
            "id": 4,
            "name": "Keine neuen Schulden für die Stadt machen",
        },
        {
            "id": 5,
            "name": "Für mehr Sicherheit im öffentlichen Raum sorgen",
        },
        {
            "id": 6,
            "name": "Langfristige Integration und das Zusammenleben in der Stadt fördern",
        },
        {
            "id": 7,
            "name": "Schulen sanieren",
        },
        {
            "id": 8,
            "name": "Subkultur fördern",
        },
        {
            "id": 9,
            "name": "Soziale und kulturelle Teilhabe trotz kleinem Geldbeutel ermöglichen",
        },
        {
            "id": 10,
            "name": "Die regionale Wirtschaft fördern",
        },
        {
            "id": 11,
            "name": "Eine klimaneutrale Stadt gestalten",
        },
        {
            "id": 12,
            "name": "Kommunalpolitik transparenter machen",
        }
    ]
]

newRound()


// newRound is used after each decision round, where we compare one value with the others
function newRound() {
    var needsToBeSorted = false
    // We iterate over the whole array and check if we have to sort sth. 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > 1) {
            insertIndex = i;
            needsToBeSorted = true
            break;
        }
    }
    if (needsToBeSorted) {
        // Let's get started to sort. 
        sortArray = arr[i]
        var v0 = getRandomIndex(sortArray)
        comparer = sortArray.slice(0)
        arr.splice(insertIndex, 1)
        sort(v0[0])
    } else {
        // Finished overall sorting, since nothing has to be sorted anymore.
        console.log("Finished sorting with " + decisionCounter + " decisions")
        calculateValue()
        wrapResult()
        opt0.textContent = ""
        opt1.textContent = ""
        sendResult(arr)
        decisionCounter = 0;
    }
}
// Sort will be called after triggering a new round adn after each decision
function sort(fixed) {
    if (comparer.length > 0) {
        var v1 = getRandomIDExcept(fixed.id, comparer)
        opt0.textContent = fixed.name
        opt1.textContent = v1.name
        btn0Val = fixed
        btn1Val = v1
    }
    else {
        completeRound()
    }
}

// onClick event of the buttons
function selected(index, id) {
    uuid = id;
    if (decisionCounter == 0) {
        startedTimeStamp = parseInt(Date.now() / 1000)
    }
    decisionCounter++;
    if (index == 0) {
        // Push the value to the lesser array
        lesser.push(btn1Val)
    }
    else {
        // Push the value to the greater array
        greater.push(btn1Val)
    }
    // Finally, remove the value from the comparer array and sort again
    removeById(btn1Val.id)
    sort(btn0Val)
}

// When finishing comparing one value, we "finish" the round and sort in the related arrays
function completeRound() {
    // Add the lesser array    
    if (lesser.length > 0) {
        if (lesser.length > 1) {
            arr.splice(insertIndex, 0, lesser);
        }
        else {
            arr.splice(insertIndex, 0, lesser[0]);
        }
    }
    // Add the comparer value between the lesser and greater
    arr.splice(insertIndex, 0, btn0Val)

    // Add the greater array after the comparer
    if (greater.length > 0) {
        if (greater.length > 1) {
            arr.splice(insertIndex, 0, greater);
        }
        else {
            arr.splice(insertIndex, 0, greater[0]);
        }
    }
    // Clean up values again and start a new round
    lesser = []
    greater = []
    deepLog(arr, "TopArray")
    newRound()
}

// Helper function to monitor the array
function deepLog(arr, name) {

    console.log("--------" + name + "-------------")
    console.log("--------" + arr.length + "-------------")
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
    console.log("-------------------------------")
}
// Get random object out of itm as touple with index
function getRandomIndex(itm) {
    var rand = Math.floor(Math.random() * Math.floor(itm.length));
    return [itm[rand], rand]
}

// Used to get a random object except an specified one. ( for getting unused values )
function getRandomIDExcept(except, arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == except) {
            arr.splice(i, 1)
        }
    }
    var num = Math.floor(Math.random() * (arr.length - 1 + 1));
    return arr[num]
}
// Remove the value from the comparer array, whenever it is already compared
function removeById(id) {
    for (var i = 0; i < comparer.length; i++) {
        if (comparer[i].id == id) {
            comparer.splice(i, 1)
        }
    }
}

// Calculating the final result
function calculateValue() {
    var rank = arr.length - 1;
    for (var i = 0; i < arr.length; i++) {
        arr[i].rating = rank
        rank--
    }
    console.log(arr)
}

// used to set the metadata of the results
function wrapResult() {

}

// Send the calculated result of the user to the backend
function sendResult(a) {

    var res = {}
    // Setup some metadata format
    res.metadata = {
        isCandidate: true,
        started: startedTimeStamp,
        finished: parseInt(Date.now() / 1000),
        decisions: decisionCounter,
        uuid: uuid
    }
    // Append the values 
    res.contents = a

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/contents/result";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Successfully stored values, continue with animation

        }
    };
    var data = JSON.stringify(res);
    console.log(data)
    xhr.send(data);
}