app.controller('HomeCtrl', function( $scope, $sce, $window ) {
  $scope.hobbies = [{
    name: "Longboarder",
    desc: $sce.trustAsHtml("I learned to ride about a year ago, and learning might have been one of the" +
          "  best things I\'ve ever done. It\'s a really fun way to get" +
          " around and an even better way to stay active.</p><p>" +
          " I even managed to design a decal and paint it onto my board!"),
  },{
    name: "Comic Reader",
    desc: $sce.trustAsHtml("I\'m a huge DC comics fan. I can appreciate the amount of work that goes into building a multiverse.</p>" +
          "<p>There are so many moving parts to factor in and it\'s amazing to see how authors can " + 
          "continue to innovate the characters and present their fans with new topics to think about every issue."),
    link: "#comics"
  },{
    name: "Developer",
    desc: $sce.trustAsHtml("I\'m a full-stack web developer who happens to write lots of Javascript. </p>" +
          "<p>I started off building apps with Ruby on Rails and have moved on to" +
          " Node and Express. What you\'re looking at right now was actually built with " +
          "Node and Express, and a generous amount of Angular. Check out my other work <a style=\"text-decoration:none\" href=\"/code\">here</a>"),
    link: ""
  }];

  $scope.contactInfos = [{
    id: 'btn-twitter',
    label: 'TWITTER',
    url: 'https://twitter.com/alfredabab_io'
  }, {
    id: 'btn-github',
    label: 'GITHUB',
    url: 'https://github.com/alfred'
  }, {
    id: 'btn-linkedin',
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/alfredababio/en'
  }, {
    id: 'btn-email',
    label: 'EMAIL',
    url: 'mailto:aababio75@gmail.com'
  }];

  $scope.aboutText = {          
    intro: "Hi, I\'m Alfred.",     
    body: $sce.trustAsHtml("I\'m a Computer Science student at Northeastern, an amateur pool (pocket billiards) player, " + 
      "and a firm believer that anyone can learn to do anything by Googling it long enough.</p><p>" +
      "Also, my friends think I\'m a pretty cool guy (even though they\'ll deny it after reading this.)"),
  };

  var initialize = function() {
    window.addEventListener('resize', resizeImages);
    if (window.innerWidth <= 768) {
      console.log('In Mobile');
      window.onload = resizeImages();
      resizeImages();
      console.log('Resized');
    }
  };

  var resizeImages = function() {
    if ( window.innerWidth > 768 ) {
      return;
    }
    var myPicture = document.querySelector('#about > .card-image');
    var codePicture = document.querySelector('#developer > .card-image');
    var longboardPicture = document.querySelector('#longboard > .card-image');
    var comicsPicture = document.querySelector('#comics > .card-image');

    var myRatio = 165 / 304; 
    var codeRatio = 127 / 304;
    var longboardRatio = 112 / 304;
    var comicsRatio = 157 / 304;

    myPicture.style.maxHeight = '' + ( myPicture.clientWidth * myRatio ) +'px';
    codePicture.style.maxHeight = '' + ( codePicture.clientWidth * myRatio ) +'px';
    longboardPicture.style.maxHeight = '' + ( longboardPicture.clientWidth * myRatio ) +'px';
    comicsPicture.style.maxHeight = '' + ( comicsPicture.clientWidth * myRatio ) +'px';
  };

  initialize();

});