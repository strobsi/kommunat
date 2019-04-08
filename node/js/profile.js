var el = document.getElementById('cImage');

var vanilla = new Croppie(el, {
    viewport: { width: 250, height: 150 },
    boundary: { width: 250, height: 150 },
    showZoomer: true,
});

$(function() {
    $.validate({
        lang : 'de',
        modules : 'location, date, security, file'
      });
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
        console.log(this.responseText);
    }
    });
    xhr.open("POST", "https://komunat.de/profile/image");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

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

