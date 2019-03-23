var el = document.getElementById('cImage');

var vanilla = new Croppie(el, {
    viewport: { width: 250, height: 150 },
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableOrientation: true
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
        orientation: 2
    });
}

//on button click
function save() {
    console.log("Saving image")
    
    vanilla.result('base64').then(function(dataImg) {
        var data = [{ image: dataImg }];
        vanilla.bind({
            url: dataImg,
        });
      })
}

function changeImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Loaded")
            vanilla.bind({
                url: e.target.result,
                orientation: 2
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
    console.log("Selected image")
}

