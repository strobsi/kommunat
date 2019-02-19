var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

(function() {

  document.querySelector(".spinner").style.opacity = "0.0"

    anime({
        delay: 500,
        targets: '.curtain_left',
        translateX: -x/2,
        duration: 1000,
        easing: "easeInOutQuad"
      });

    anime({
        delay: 500,
        targets: '.curtain_right',
        translateX: x/2,
        duration: 1000,
        easing: "easeInOutQuad"
      });

 })();

 function collapseAndRotate() {

  anime({
    targets: '.decider',
    scale: 0.0,
    rotate: 720,
    duration: 800,
    easing: "easeInOutQuad"
  });
  anime({
    targets: '.spinner',
    opacity: 1.0,
    rotate: 720,
    duration: 800,
    easing: "easeInOutQuad"
  });
 }


 function transition(index) {
   if(index == 0) {
     console.log("Exchange topper")
     anime({
      targets: '.upper',
      translateX: -x,
      duration: 200,
      easing: "easeOutQuad",
      complete: function() {
        anime({
          targets: '.upper',
          translateX: x,
          duration: 1,
          easing: "easeOutQuad",
          complete: function() {
            anime({
              targets: '.upper',
              translateX: 0,
              duration: 200,
              easing: "easeOutQuad",
             });
           }
          });
        }
      });
   }
   else {
     console.log("Exchange lower")
     anime({
      targets: '.lower',
      translateX: -x,
      duration: 200,
      easing: "easeOutQuad",
      complete: function() {
        anime({
          targets: '.lower',
          translateX: x,
          duration: 1,
          easing: "easeOutQuad",
          complete: function() {
            anime({
              targets: '.lower',
              translateX: 0,
              duration: 200,
              easing: "easeOutQuad",
             });
           }
          });
        }
      });
   }
 }

 function fakeLoad() {
  anime({
      delay:5000,
      targets: '.spinner',
      scale: 2.5,
      duration: 500,
      easing: "easeOutQuad",
      complete: function() {
          anime({
              targets: '.spinner',
              rotate: 720*2,
              scale: 0.0,
              duration: 1000,
              easing: "easeOutQuad",
              complete: function() {
                  console.log("Finished all animations")
                  //fadeResults()
              }
           });
         }
  });
}

