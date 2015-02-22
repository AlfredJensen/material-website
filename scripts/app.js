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
    url: 'https://twitter.com/alfredabab_io',
    color: '#55ACEE' 
  }, {
    id: 'btn-github',
    label: 'GITHUB',
    url: 'https://github.com/alfred',
    color: '#000000'
  }, {
    id: 'btn-linkedin',
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/alfredababio/en',
    color: '#0077B5'
  }, {
    id: 'btn-email',
    label: 'EMAIL',
    url: 'mailto:aababio75@gmail.com',
    color: ''
  }];
}]);