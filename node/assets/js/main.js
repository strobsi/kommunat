
$( document ).ready(function() {

	infiniteChange();
});


function infiniteChange() {
	var i = 0, pictures = 7;
	function f() {
		i++; 
		$('#bg').css("background-image", "url(img/00"+i+".jpg)");
		if( i < pictures ){
			setTimeout( f, 10000 );
		}
		else {
			infiniteChange();
		}
	}
	f();
}

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
  }