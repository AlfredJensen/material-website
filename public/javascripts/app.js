'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial', 'ngRoute']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
});

app.config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log){
 
  $scope.hobbies = [{
    name: "Longboarder",
    desc: "I designed my own decal and I am working on my slide steez."
  },{
    name: "Comic Reader",
    desc: "If you want to see what I\'m reading checkout my library",
    link: ""
  },{
    name: "Developer",
    desc: "I have been a full-stack web developer and am always trying to learn new technologies that will make my apps",
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

  $scope.aboutText = {          
    intro: "Hi, I\'m Alfred.",     
    body: "I like to do dope shit."    
  };  

  $scope.toggleSideMenu = function() {

    $mdSidenav('sideNav').toggle()
    .then(function(){});
  };

});
