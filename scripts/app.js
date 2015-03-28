'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
});

app.controller('AppCtrl', ['$scope', function($scope){
 
  $scope.hobbies = [{
    name: "Longboarder",
    desc: "I designed my own decal and I am working on my slide steez."
  },{
    name: "Comic Reader",
    desc: "If you want to see what I\'m reading checkout my library",
    link: ""
  },{
    name: "Developer",
    desc: "",
    link: ""
  }]

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
    body: "I like to make cool stuff."    
  };  
}]);
