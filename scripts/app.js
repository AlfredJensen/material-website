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
}]);