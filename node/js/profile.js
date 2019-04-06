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
        var data, xhr;
        data = new FormData();
        data.append( 'file',blob );
        xhr = new XMLHttpRequest();
        xhr.open( 'POST', 'https://komunat.de/profile/image', true );
        xhr.onreadystatechange = function ( response ) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Successfully stored values, continue with animation
                alert("Profilbild erfolgreich geändert");
            }
            else if (xhr.readyState === 4 && xhr.status === 413) {
                alert("Dein Profilbild ist zu groß. Lade ein kleineres Bild hoch");
            }
            else {
                alert("Leider konnte dein Bild nicht hochgeladen werden.");
            }
        };
        xhr.send( data );
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

