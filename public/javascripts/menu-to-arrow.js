if (SVGElement && SVGElement.prototype) {
 
    SVGElement.prototype.hasClass = function (className) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
    };
 
    SVGElement.prototype.addClass = function (className) {
        if (!this.hasClass(className)) {
            this.setAttribute('class', this.getAttribute('class') + ' ' + className);
        }
    };
 
    SVGElement.prototype.removeClass = function (className) {
        var removedClass = this.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
        if (this.hasClass(className)) {
            this.setAttribute('class', removedClass);
        }
    };
 
    SVGElement.prototype.toggleClass = function (className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
    };
 
}

var svg = document.getElementById('mysvg');
var toArrow = svg.getElementsByClassName('to-arrow');
var fromArrow = svg.getElementsByClassName('from-arrow');

svg.addEventListener('click', function(){
  if ( svg.hasClass('arrow') ) {
    svg.removeClass('arrow');
    animateToMenu();
  } else {
    svg.addClass('arrow');
    animateToArrow();
  }
});

document.getElementById('to-arrow').addEventListener('click', function(){ animateToArrow(); });

document.getElementById('to-menu').addEventListener('click', function(){ animateToMenu(); });

document.getElementById('pause').addEventListener('click', function(){
  if ( svg.animationsPaused() ) {
    svg.unpauseAnimations();
  } else {
    svg.pauseAnimations();
  }
});

function animateToArrow(){
   svg.unpauseAnimations();
  for(c=0; c < toArrow.length; c++) {
    toArrow[c].beginElement();    
  }
}

function animateToMenu(){
  svg.unpauseAnimations();
  for(c=0; c < toArrow.length; c++) {
    fromArrow[c].beginElement();    
  }
}

