'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial', 'ngRoute', 'ngLoadScript', 'ngSanitize']);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey') // blue-grey, teal
  .accentPalette('amber');

  $mdThemingProvider.theme('code')
  .primaryPalette('teal')
  .accentPalette('pink');

  $mdThemingProvider.theme('comics')
  .primaryPalette('lime')
  .accentPalette('amber');

  $mdThemingProvider.alwaysWatchTheme(true);
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.config(function($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home/home.html',
      title: 'Home',
      theme: 'default',
      iconColor: '#607D8B'
    })
    .when('/code', {
      templateUrl: '/views/projects/projects.html',
      title: 'Code',
      theme: 'code',
      iconColor: '#009688'
    })
    .when('/comics', {
      templateUrl: '/views/library/library.html',
      title: 'Comics',
      theme: 'comics',
      iconColor: '#CDDC39'
    })
    .when('/resume', {
      redirectTo: function() {
        window.location ='/resume.pdf';
      }
    })
    .when('/old', {
      redirectTo: function() {
        window.location = '/old';
      }
    })
    .when('/mean', {
      redirectTo: function() {
        window.location ='/mean';
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.config(function($mdIconProvider) {
  $mdIconProvider
    .icon('demo', 'icons/desktop\ mac.svg')
    .icon('github', 'icons/github.svg')
    .icon('comic', 'icons/dashboard.svg')
    .icon('code','icons/code.svg')
    .icon('resume','icons/description.svg')
    .icon('home','icons/home.svg')
    .icon('info', 'icons/info.svg');
});

app.controller('AppCtrl', function($scope, $log, $location) {
  $scope.$on('$routeChangeSuccess', function(event, data) {
    $scope.theme = data.theme;
  });
});

app.controller('NavCtrl', function($scope, $location, $mdSidenav, $log) {
  $scope.$on('$routeChangeSuccess', function (event, data) {
    $scope.pageTitle = data.title;
    $scope.iconColor = data.iconColor;
  });

  $scope.navLinks = [{
    name: 'Home',
    url: '/',
    icon: 'home'
  },{
    name: 'Code',
    url: '/code',
    icon: 'code'
  }, {
    name: 'Comics',
    url: '/comics',
    icon: 'comic'
  }, {
    name: 'Resume',
    url: '/resume',
    icon: 'resume'
  }];
  
  $scope.toggleSideMenu = function() {
    $mdSidenav('sideNav').toggle()
    .then(function(){
      if ($mdSidenav('sideNav').isOpen()) {
        var backdropElement = document.getElementsByClassName('md-sidenav-backdrop');
        if(backdropElement) {
          backdropElement[0].addEventListener('click', function() {
            animateToMenu();
          });
        }
      }
    });
  };

  $scope.navigateTo = function(url) {
    $location.path(url);
  };
});
