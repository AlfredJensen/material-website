'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial', 'ngRoute', 'ngLoadScript']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html'
    })
    .when('/code', {
      templateUrl: '/views/projects/projects.html'
    })
    .when('/comics', {
      templateUrl: '/views/library/library.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log){
 
  $scope.hobbies = [{
    name: "Longboarder",
    desc: "I learned to ride about a year ago, and now I barely ever walk. " + 
          "See that image up above this text part of this card? Yeah I designed " +
          "and painted that on my board."
  },{
    name: "Comic Reader",
    desc: "I\'m a huge DC comics fan.  If you want to see what I\'m reading, " + 
          " checkout my library.",
    link: "#comics"
  },{
    name: "Developer",
    desc: "I am a full-stack web developer and my interests are learning about user " +
          "experience principles and the psychology that fuels design. I really like" +
          " solving problems." ,
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
    url: ''
  }];

  $scope.navLinks = [{
    name: 'Code',
    url: 'code'
  }, {
    name: 'Comics',
    url: 'comics'
  }];

  $scope.aboutText = {          
    intro: "Hi, I\'m Alfred.",     
    body: "I like to do dope things. "
  };  

  $scope.toggleSideMenu = function() {
    $mdSidenav('sideNav').toggle()
    .then(function(){});
  };

});
