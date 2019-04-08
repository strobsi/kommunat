var el = document.getElementById('cImage');

var vanilla = new Croppie(el, {
    viewport: { width: 250, height: 150 },
    boundary: { width: 250, height: 150 },
    showZoomer: true,
});

$(function() {
    $.validate({
        lang : 'de',
        modules : 'location, date, security, file',
        messages: {
            range: "Bitte eine Zahl zwischen 1 und 60 eingeben",
            number: "Bitte eine Zahl zwischen 1 und 60 eingeben",
            list_number: "Bitte eine Zahl zwischen 1 und 60 eingeben",
        },
        onValidate : function($form) {
            return {
              element : document.getElementById("list_number"),
              message : 'Bitte Zahl zwischen 1 und 60 eingeben'
            }
        },
      })
})

function bindImage(img) {
    vanilla.bind({
        url: img,
        orientation:1
    });
}

$( '#imgForm' ).submit(function ( e ) {
    e.preventDefault();
    vanilla.result({type: 'blob', size: 'original', quality: 1, circle: false }).then(function(blob) {

    var data = new FormData();
    data.append("profilePic", blob);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        $('#uploadModal').modal('toggle');
        if (xhr.status == 200) {
            console.log(this.responseText);
            alert("Bild erfolgreich hochgeladen")
        } else {
            alert("Wir sind untröstlich, aber leider konnte dein Bild nicht hochgeladen werden. Bitte wende dich an an uns, wir werden uns so schnell wie möglich darum kümmern.")
        }
    }
    });
    xhr.open("POST", "https://komunat.de/profile/image");
    xhr.setRequestHeader("cache-control", "no-cache");    
    xhr.send(data);
    $('#uploadModal').modal('toggle');
    });
});

function loadHelp() {
    $('#imageHelpModal').modal('toggle');
}

function changeImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Loaded")
            vanilla.bind({
                url: e.target.result,
                orientation: 1
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
    console.log("Selected image")
}

