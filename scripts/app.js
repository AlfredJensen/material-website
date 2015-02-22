'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
});

app.controller('AppCtrl', ['$scope', function($scope){
 
  $scope.subTitles = [{
    name : 'Developer',
    icon : 'keyboard'
  }, {
    name : 'Comic Nerd',
    icon : 'book'
  }, {
    name : 'Longboarder',
    icon : 'helmet'
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
    body: "I\'m a Computer Science major at Northeastern University. I like to do dope shit."
  };
}]);