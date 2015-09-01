'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial', 'ngRoute', 'ngLoadScript', 'ngSanitize']);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('deep-purple', {
    'default': '400'
  })
  .accentPalette('amber');

  $mdThemingProvider.theme('code')
  .primaryPalette('cyan', {
    'default' :'700'
  })
  .accentPalette('pink');

  $mdThemingProvider.theme('comics')
  .primaryPalette('red', {
    'default': '600'
  })
  .accentPalette('amber');

  $mdThemingProvider.alwaysWatchTheme(true);
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.config(function($routeProvider, $mdThemingProvider, $window) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home/home.html',
      title: 'Home',
      theme: 'default',
      iconColor: '#7E57C2'
    })
    .when('/code', {
      templateUrl: '/views/projects/projects.html',
      title: 'Code',
      theme: 'code',
      iconColor: '#0097A7'
    })
    .when('/comics', {
      templateUrl: '/views/library/library.html',
      title: 'Library',
      theme: 'comics',
      iconColor: '#E53935'
    })
    .when('/resume', {
      redirectTo: function() {
        $window.location.href ='/resume';
      }
    })
    .when('/old', {
      redirectTo: function() {
        $window.location.href = '/old';
      }
    })
    .when('/mean', {
      redirectTo: function() {
        $window.location.href ='/mean';
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
    .icon('code', 'icons/code.svg')
    .icon('resume', 'icons/description.svg')
    .icon('home', 'icons/home.svg')
    .icon('info', 'icons/info.svg');
});

app.run(function($http, $templateCache) {
  var iconUrls = [
    'icons/desktop\ mac.svg',
    'icons/github.svg',
    'icons/dashboard.svg',
    'icons/code.svg',
    'icons/description.svg',
    'icons/home.svg',
    'icons/info.svg'
  ];

  angular.forEach(iconUrls, function(url) {
    $http.get(url, {cache: $templateCache});
  });
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
    name: 'Library',
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
    if (url == '/resume') {
      $window.location.href = url;
    } else {
      $location.path(url);      
    }

  };
});

app.controller('ProjectsCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog) {

  $scope.allProjects = {
    'mdSite': {
      "name": "Alfred Material",
      "screenshot": '/imgs/projects/md-site-cover.jpg',
      "description": '',
      "repository": 'https://github.com/alfred/material-website',
      "demoLink": 'http://alfredabab.io',
      "tech": [],
      "learned": '',
      "darkOverlay": true
    },
    'ef': {
      "name": "Exemption Check",
      "screenshot": '/imgs/projects/ef.png',
      "description": '',
      "repository": '',
      "info": ['TurboTax Exemption Check is a tool for customers to find out whether they are exempt from the healthcare penalty for that tax year. ' + 
                'While working on Exemption Check, I was an engineer responsible for implementing cross-device data persistence. ' + 
                'This allowed customers to start the application on one device and sign out, and then sign back in on a second device' + 
                'and complete their application where they left off.',
               'I was also part of the small team that was tasked with a massive rewrite of the tool once the Affordable Care Act ' + 
                'law changed to allow one form per household instead of one form per member of the household. This required rapid ' + 
                'implementation of features and also required that we didn’t break the core functionality as that was still the primary use-case.', 
               'I was a full-stack engineer, as I worked with the backend services as much as I was doing CSS tweaks on the frontend which' + 
               ' required comprehensive unit tests for both. During peak times I was also responsible for monitoring our Splunk logs for service outtages and errors.'],
      "demoLink": 'https://turbotax.intuit.com/health-care/exemptions',
      "tech": [],
      "learned": '',
      "darkOverlay": true
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '/imgs/projects/old-s.png',
      "description": '',
      "repository": 'https://github.com/alfred/Website',
      "demoLink": '/old',
      "tech": [],
      "learned": 'https://github.com/alfred/Website'
    },
    'mean': {
      "name": "MEAN Skeleton",
      "screenshot": '/imgs/projects/md-orange-pyramids.png',
      "description": '',
      "repository": 'https://github.com/alfred/mean-skeleton',
      "demoLink": '/mean',
      "tech": [],
      "learned": ''
    },
    'moderator': {
      "name": "Cengage Moderator",
      "screenshot": '/imgs/projects/md-teal-tri.jpg',
      "description": '',
      "repository": '',
      "info": ['While working on Cengage Moderator, I was on a small team of engineers who had a lot of freedom over the architecture ' + 
                'and technology used to create a question and answer application for the company to use to ask questions of the CTO during his office hours.', 
                'I was responsible for architecting the user model. This means that I implemented user account creation, user sessions and ' + 
                'account recovery. All of my solutions were created in-house as the popular Ruby gem, “devise” was too heavy for the simplicity of the project. ' + 
                'A long with user accounts, I also implemented user profiles and access levels for roles. ',
                'Due to the nature of the application, we had many nested data-models and my team had to teach ' + 
                'ourselves relational data models. For example, we used many-to-many for users favoriting and voting ' + 
                'on questions, so that a user could browse their favorite questions. I also set up automated unit and ' + 
                'integration testing suites and wrote some of the frontend interactions.'],
      "demoLink": 'http://moderator.cengage.com',
      "tech": [],
      "learned": ''
    },
    'cssLogos': {
      "name": "CSS Logos",
      "screenshot": '/imgs/projects/md-grey-circle.png',
      "description": '',
      "repository": 'https://github.com/alfred/css-logos',
      "demoLink": 'http://alfred.github.io/css-logos/',
      "tech": [],
      "learned": ''
    }
  };

  $scope.openProjectInfo = function(ev, name) {
    var bodyElement = angular.element(document.body);
    var thisProject = $scope.allProjects[name];
    var dialogContent = $mdDialog.alert({
      parent: bodyElement,
      targetEvent: ev,
      template:
            '<md-dialog>' +
            '  <md-toolbar>' + 
            '   <div class="md-toolbar-tools">' +
            '     <h2>{{project.name}}</h2>' +
            '   </div>' +
            '  </md-toolbar>' +
            '  <md-dialog-content>'+
            '    <p class="intent-p" ng-repeat="p in project.info">{{p}}</p>' +
            '  </md-dialog-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeProjectInfo()" class="md-primary">' +
            '      Impressive!' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
      clickOutsideToClose: true,
      escapeToClose: true,
      locals:  {
        project : thisProject
      },
      controller: function DialogController($scope, $mdDialog, project) {
        $scope.project = project;
        $scope.closeProjectInfo = function() {
          $mdDialog.hide();
        };
      }
    });

    $mdDialog.show(dialogContent).then(function() {

    });
  };
  
});
app.directive('projImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('projImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')'
            });
        });
    };
});
app.controller('HomeCtrl', function($scope, $sce) {
  $scope.hobbies = [{
    name: "Longboarder",
    desc: ["I learned to ride about a year ago, and learning might have been one of the" +
          "  best things I\'ve ever done. It\'s a really fun way to get" +
          " around and an even better way to stay active.",
          " I even managed to design a decal and paint it onto my board!"]
  },{
    name: "Comic Reader",
    desc: ["I\'m a huge DC comics fan. I can appreciate the amount of work that goes into building a multiverse.",
          "There are so many moving parts to factor in and it\'s amazing to see how " + 
          " authors can continue to innovate the characters and present their fans with new topics to think about every issue."],
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
    body: [
      "I\'m a Computer Science student at Northeastern, an amateur pool (pocket billiards) player, " + 
      "and a firm believer that anyone can learn to do anything by Googling it long enough.",
      "Also, my friends think I\'m a pretty cool guy (even though they\'ll deny it after reading this.)"]
  };  
});
(function (ng) {
  'use strict';
 
  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) 
      {
        if (attr.type==='text/javascript-lazy') 
        {
          var s = document.createElement("script");
          s.type = "text/javascript";                
          var src = elem.attr('src');
          if(src!==undefined)
          {
              s.src = src;
          }
          else
          {
              var code = elem.text();
              s.text = code;
          }
          document.head.appendChild(s);
          elem.remove();
        }
      }
    };
  });
 
}(angular));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FsZnJlZC1tYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhbGZyZWRNYXRlcmlhbCcsIFsnbmdNYXRlcmlhbCcsICduZ1JvdXRlJywgJ25nTG9hZFNjcmlwdCcsICduZ1Nhbml0aXplJ10pO1xyXG5cclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2RlZXAtcHVycGxlJywge1xyXG4gICAgJ2RlZmF1bHQnOiAnNDAwJ1xyXG4gIH0pXHJcbiAgLmFjY2VudFBhbGV0dGUoJ2FtYmVyJyk7XHJcblxyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29kZScpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdjeWFuJywge1xyXG4gICAgJ2RlZmF1bHQnIDonNzAwJ1xyXG4gIH0pXHJcbiAgLmFjY2VudFBhbGV0dGUoJ3BpbmsnKTtcclxuXHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjb21pY3MnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgncmVkJywge1xyXG4gICAgJ2RlZmF1bHQnOiAnNjAwJ1xyXG4gIH0pXHJcbiAgLmFjY2VudFBhbGV0dGUoJ2FtYmVyJyk7XHJcblxyXG4gICRtZFRoZW1pbmdQcm92aWRlci5hbHdheXNXYXRjaFRoZW1lKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkd2luZG93KSB7XHJcbiAgJHJvdXRlUHJvdmlkZXJcclxuICAgIC53aGVuKCcvJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9ob21lL2hvbWUuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnSG9tZScsXHJcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXHJcbiAgICAgIGljb25Db2xvcjogJyM3RTU3QzInXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb2RlJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9wcm9qZWN0cy9wcm9qZWN0cy5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb2RlJyxcclxuICAgICAgdGhlbWU6ICdjb2RlJyxcclxuICAgICAgaWNvbkNvbG9yOiAnIzAwOTdBNydcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvbWljcycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvbGlicmFyeS9saWJyYXJ5Lmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0xpYnJhcnknLFxyXG4gICAgICB0aGVtZTogJ2NvbWljcycsXHJcbiAgICAgIGljb25Db2xvcjogJyNFNTM5MzUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9yZXN1bWUnLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9Jy9yZXN1bWUnO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9vbGQnLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvb2xkJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC53aGVuKCcvbWVhbicsIHtcclxuICAgICAgcmVkaXJlY3RUbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0nL21lYW4nO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLm90aGVyd2lzZSh7XHJcbiAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRJY29uUHJvdmlkZXIpIHtcclxuICAkbWRJY29uUHJvdmlkZXJcclxuICAgIC5pY29uKCdkZW1vJywgJ2ljb25zL2Rlc2t0b3BcXCBtYWMuc3ZnJylcclxuICAgIC5pY29uKCdnaXRodWInLCAnaWNvbnMvZ2l0aHViLnN2ZycpXHJcbiAgICAuaWNvbignY29taWMnLCAnaWNvbnMvZGFzaGJvYXJkLnN2ZycpXHJcbiAgICAuaWNvbignY29kZScsICdpY29ucy9jb2RlLnN2ZycpXHJcbiAgICAuaWNvbigncmVzdW1lJywgJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycpXHJcbiAgICAuaWNvbignaG9tZScsICdpY29ucy9ob21lLnN2ZycpXHJcbiAgICAuaWNvbignaW5mbycsICdpY29ucy9pbmZvLnN2ZycpO1xyXG59KTtcclxuXHJcbmFwcC5ydW4oZnVuY3Rpb24oJGh0dHAsICR0ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgdmFyIGljb25VcmxzID0gW1xyXG4gICAgJ2ljb25zL2Rlc2t0b3BcXCBtYWMuc3ZnJyxcclxuICAgICdpY29ucy9naXRodWIuc3ZnJyxcclxuICAgICdpY29ucy9kYXNoYm9hcmQuc3ZnJyxcclxuICAgICdpY29ucy9jb2RlLnN2ZycsXHJcbiAgICAnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJyxcclxuICAgICdpY29ucy9ob21lLnN2ZycsXHJcbiAgICAnaWNvbnMvaW5mby5zdmcnXHJcbiAgXTtcclxuXHJcbiAgYW5ndWxhci5mb3JFYWNoKGljb25VcmxzLCBmdW5jdGlvbih1cmwpIHtcclxuICAgICRodHRwLmdldCh1cmwsIHtjYWNoZTogJHRlbXBsYXRlQ2FjaGV9KTtcclxuICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJGxvY2F0aW9uKSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUudGhlbWUgPSBkYXRhLnRoZW1lO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdOYXZDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRtZFNpZGVuYXYsICRsb2cpIHtcclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUucGFnZVRpdGxlID0gZGF0YS50aXRsZTtcclxuICAgICRzY29wZS5pY29uQ29sb3IgPSBkYXRhLmljb25Db2xvcjtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLm5hdkxpbmtzID0gW3tcclxuICAgIG5hbWU6ICdIb21lJyxcclxuICAgIHVybDogJy8nLFxyXG4gICAgaWNvbjogJ2hvbWUnXHJcbiAgfSx7XHJcbiAgICBuYW1lOiAnQ29kZScsXHJcbiAgICB1cmw6ICcvY29kZScsXHJcbiAgICBpY29uOiAnY29kZSdcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnTGlicmFyeScsXHJcbiAgICB1cmw6ICcvY29taWNzJyxcclxuICAgIGljb246ICdjb21pYydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJ3Jlc3VtZSdcclxuICB9XTtcclxuICBcclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgaWYgKHVybCA9PSAnL3Jlc3VtZScpIHtcclxuICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGxvY2F0aW9uLnBhdGgodXJsKTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgfTtcclxufSk7XHJcbiIsImFwcC5jb250cm9sbGVyKCdQcm9qZWN0c0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWREaWFsb2cpIHtcblxuICAkc2NvcGUuYWxsUHJvamVjdHMgPSB7XG4gICAgJ21kU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkFsZnJlZCBNYXRlcmlhbFwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1zaXRlLWNvdmVyLmpwZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21hdGVyaWFsLXdlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZGFiYWIuaW8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnLFxuICAgICAgXCJkYXJrT3ZlcmxheVwiOiB0cnVlXG4gICAgfSxcbiAgICAnZWYnOiB7XG4gICAgICBcIm5hbWVcIjogXCJFeGVtcHRpb24gQ2hlY2tcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvZWYucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImluZm9cIjogWydUdXJib1RheCBFeGVtcHRpb24gQ2hlY2sgaXMgYSB0b29sIGZvciBjdXN0b21lcnMgdG8gZmluZCBvdXQgd2hldGhlciB0aGV5IGFyZSBleGVtcHQgZnJvbSB0aGUgaGVhbHRoY2FyZSBwZW5hbHR5IGZvciB0aGF0IHRheCB5ZWFyLiAnICsgXG4gICAgICAgICAgICAgICAgJ1doaWxlIHdvcmtpbmcgb24gRXhlbXB0aW9uIENoZWNrLCBJIHdhcyBhbiBlbmdpbmVlciByZXNwb25zaWJsZSBmb3IgaW1wbGVtZW50aW5nIGNyb3NzLWRldmljZSBkYXRhIHBlcnNpc3RlbmNlLiAnICsgXG4gICAgICAgICAgICAgICAgJ1RoaXMgYWxsb3dlZCBjdXN0b21lcnMgdG8gc3RhcnQgdGhlIGFwcGxpY2F0aW9uIG9uIG9uZSBkZXZpY2UgYW5kIHNpZ24gb3V0LCBhbmQgdGhlbiBzaWduIGJhY2sgaW4gb24gYSBzZWNvbmQgZGV2aWNlJyArIFxuICAgICAgICAgICAgICAgICdhbmQgY29tcGxldGUgdGhlaXIgYXBwbGljYXRpb24gd2hlcmUgdGhleSBsZWZ0IG9mZi4nLFxuICAgICAgICAgICAgICAgJ0kgd2FzIGFsc28gcGFydCBvZiB0aGUgc21hbGwgdGVhbSB0aGF0IHdhcyB0YXNrZWQgd2l0aCBhIG1hc3NpdmUgcmV3cml0ZSBvZiB0aGUgdG9vbCBvbmNlIHRoZSBBZmZvcmRhYmxlIENhcmUgQWN0ICcgKyBcbiAgICAgICAgICAgICAgICAnbGF3IGNoYW5nZWQgdG8gYWxsb3cgb25lIGZvcm0gcGVyIGhvdXNlaG9sZCBpbnN0ZWFkIG9mIG9uZSBmb3JtIHBlciBtZW1iZXIgb2YgdGhlIGhvdXNlaG9sZC4gVGhpcyByZXF1aXJlZCByYXBpZCAnICsgXG4gICAgICAgICAgICAgICAgJ2ltcGxlbWVudGF0aW9uIG9mIGZlYXR1cmVzIGFuZCBhbHNvIHJlcXVpcmVkIHRoYXQgd2UgZGlkbuKAmXQgYnJlYWsgdGhlIGNvcmUgZnVuY3Rpb25hbGl0eSBhcyB0aGF0IHdhcyBzdGlsbCB0aGUgcHJpbWFyeSB1c2UtY2FzZS4nLCBcbiAgICAgICAgICAgICAgICdJIHdhcyBhIGZ1bGwtc3RhY2sgZW5naW5lZXIsIGFzIEkgd29ya2VkIHdpdGggdGhlIGJhY2tlbmQgc2VydmljZXMgYXMgbXVjaCBhcyBJIHdhcyBkb2luZyBDU1MgdHdlYWtzIG9uIHRoZSBmcm9udGVuZCB3aGljaCcgKyBcbiAgICAgICAgICAgICAgICcgcmVxdWlyZWQgY29tcHJlaGVuc2l2ZSB1bml0IHRlc3RzIGZvciBib3RoLiBEdXJpbmcgcGVhayB0aW1lcyBJIHdhcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBtb25pdG9yaW5nIG91ciBTcGx1bmsgbG9ncyBmb3Igc2VydmljZSBvdXR0YWdlcyBhbmQgZXJyb3JzLiddLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cHM6Ly90dXJib3RheC5pbnR1aXQuY29tL2hlYWx0aC1jYXJlL2V4ZW1wdGlvbnMnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnLFxuICAgICAgXCJkYXJrT3ZlcmxheVwiOiB0cnVlXG4gICAgfSxcbiAgICAnb2xkU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIk9sZCBXZWJzaXRlXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL29sZC1zLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnL29sZCcsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZSdcbiAgICB9LFxuICAgICdtZWFuJzoge1xuICAgICAgXCJuYW1lXCI6IFwiTUVBTiBTa2VsZXRvblwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1vcmFuZ2UtcHlyYW1pZHMucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWVhbi1za2VsZXRvbicsXG4gICAgICBcImRlbW9MaW5rXCI6ICcvbWVhbicsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiBbJ1doaWxlIHdvcmtpbmcgb24gQ2VuZ2FnZSBNb2RlcmF0b3IsIEkgd2FzIG9uIGEgc21hbGwgdGVhbSBvZiBlbmdpbmVlcnMgd2hvIGhhZCBhIGxvdCBvZiBmcmVlZG9tIG92ZXIgdGhlIGFyY2hpdGVjdHVyZSAnICsgXG4gICAgICAgICAgICAgICAgJ2FuZCB0ZWNobm9sb2d5IHVzZWQgdG8gY3JlYXRlIGEgcXVlc3Rpb24gYW5kIGFuc3dlciBhcHBsaWNhdGlvbiBmb3IgdGhlIGNvbXBhbnkgdG8gdXNlIHRvIGFzayBxdWVzdGlvbnMgb2YgdGhlIENUTyBkdXJpbmcgaGlzIG9mZmljZSBob3Vycy4nLCBcbiAgICAgICAgICAgICAgICAnSSB3YXMgcmVzcG9uc2libGUgZm9yIGFyY2hpdGVjdGluZyB0aGUgdXNlciBtb2RlbC4gVGhpcyBtZWFucyB0aGF0IEkgaW1wbGVtZW50ZWQgdXNlciBhY2NvdW50IGNyZWF0aW9uLCB1c2VyIHNlc3Npb25zIGFuZCAnICsgXG4gICAgICAgICAgICAgICAgJ2FjY291bnQgcmVjb3ZlcnkuIEFsbCBvZiBteSBzb2x1dGlvbnMgd2VyZSBjcmVhdGVkIGluLWhvdXNlIGFzIHRoZSBwb3B1bGFyIFJ1YnkgZ2VtLCDigJxkZXZpc2XigJ0gd2FzIHRvbyBoZWF2eSBmb3IgdGhlIHNpbXBsaWNpdHkgb2YgdGhlIHByb2plY3QuICcgKyBcbiAgICAgICAgICAgICAgICAnQSBsb25nIHdpdGggdXNlciBhY2NvdW50cywgSSBhbHNvIGltcGxlbWVudGVkIHVzZXIgcHJvZmlsZXMgYW5kIGFjY2VzcyBsZXZlbHMgZm9yIHJvbGVzLiAnLFxuICAgICAgICAgICAgICAgICdEdWUgdG8gdGhlIG5hdHVyZSBvZiB0aGUgYXBwbGljYXRpb24sIHdlIGhhZCBtYW55IG5lc3RlZCBkYXRhLW1vZGVscyBhbmQgbXkgdGVhbSBoYWQgdG8gdGVhY2ggJyArIFxuICAgICAgICAgICAgICAgICdvdXJzZWx2ZXMgcmVsYXRpb25hbCBkYXRhIG1vZGVscy4gRm9yIGV4YW1wbGUsIHdlIHVzZWQgbWFueS10by1tYW55IGZvciB1c2VycyBmYXZvcml0aW5nIGFuZCB2b3RpbmcgJyArIFxuICAgICAgICAgICAgICAgICdvbiBxdWVzdGlvbnMsIHNvIHRoYXQgYSB1c2VyIGNvdWxkIGJyb3dzZSB0aGVpciBmYXZvcml0ZSBxdWVzdGlvbnMuIEkgYWxzbyBzZXQgdXAgYXV0b21hdGVkIHVuaXQgYW5kICcgKyBcbiAgICAgICAgICAgICAgICAnaW50ZWdyYXRpb24gdGVzdGluZyBzdWl0ZXMgYW5kIHdyb3RlIHNvbWUgb2YgdGhlIGZyb250ZW5kIGludGVyYWN0aW9ucy4nXSxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9tb2RlcmF0b3IuY2VuZ2FnZS5jb20nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnY3NzTG9nb3MnOiB7XG4gICAgICBcIm5hbWVcIjogXCJDU1MgTG9nb3NcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtZ3JleS1jaXJjbGUucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvY3NzLWxvZ29zJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWQuZ2l0aHViLmlvL2Nzcy1sb2dvcy8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfVxuICB9O1xuXG4gICRzY29wZS5vcGVuUHJvamVjdEluZm8gPSBmdW5jdGlvbihldiwgbmFtZSkge1xuICAgIHZhciBib2R5RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KTtcbiAgICB2YXIgdGhpc1Byb2plY3QgPSAkc2NvcGUuYWxsUHJvamVjdHNbbmFtZV07XG4gICAgdmFyIGRpYWxvZ0NvbnRlbnQgPSAkbWREaWFsb2cuYWxlcnQoe1xuICAgICAgcGFyZW50OiBib2R5RWxlbWVudCxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIHRlbXBsYXRlOlxuICAgICAgICAgICAgJzxtZC1kaWFsb2c+JyArXG4gICAgICAgICAgICAnICA8bWQtdG9vbGJhcj4nICsgXG4gICAgICAgICAgICAnICAgPGRpdiBjbGFzcz1cIm1kLXRvb2xiYXItdG9vbHNcIj4nICtcbiAgICAgICAgICAgICcgICAgIDxoMj57e3Byb2plY3QubmFtZX19PC9oMj4nICtcbiAgICAgICAgICAgICcgICA8L2Rpdj4nICtcbiAgICAgICAgICAgICcgIDwvbWQtdG9vbGJhcj4nICtcbiAgICAgICAgICAgICcgIDxtZC1kaWFsb2ctY29udGVudD4nK1xuICAgICAgICAgICAgJyAgICA8cCBjbGFzcz1cImludGVudC1wXCIgbmctcmVwZWF0PVwicCBpbiBwcm9qZWN0LmluZm9cIj57e3B9fTwvcD4nICtcbiAgICAgICAgICAgICcgIDwvbWQtZGlhbG9nLWNvbnRlbnQ+JyArXG4gICAgICAgICAgICAnICA8ZGl2IGNsYXNzPVwibWQtYWN0aW9uc1wiPicgK1xuICAgICAgICAgICAgJyAgICA8bWQtYnV0dG9uIG5nLWNsaWNrPVwiY2xvc2VQcm9qZWN0SW5mbygpXCIgY2xhc3M9XCJtZC1wcmltYXJ5XCI+JyArXG4gICAgICAgICAgICAnICAgICAgSW1wcmVzc2l2ZSEnICtcbiAgICAgICAgICAgICcgICAgPC9tZC1idXR0b24+JyArXG4gICAgICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L21kLWRpYWxvZz4nLFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgIGVzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICBsb2NhbHM6ICB7XG4gICAgICAgIHByb2plY3QgOiB0aGlzUHJvamVjdFxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIERpYWxvZ0NvbnRyb2xsZXIoJHNjb3BlLCAkbWREaWFsb2csIHByb2plY3QpIHtcbiAgICAgICAgJHNjb3BlLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICAkc2NvcGUuY2xvc2VQcm9qZWN0SW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRtZERpYWxvZy5oaWRlKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkbWREaWFsb2cuc2hvdyhkaWFsb2dDb250ZW50KS50aGVuKGZ1bmN0aW9uKCkge1xuXG4gICAgfSk7XG4gIH07XG4gIFxufSk7XG5hcHAuZGlyZWN0aXZlKCdwcm9qSW1nJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKXtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3Byb2pJbWcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdmFsdWUgKycpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTsiLCJhcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzY2UpIHtcbiAgJHNjb3BlLmhvYmJpZXMgPSBbe1xuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcbiAgICBkZXNjOiBbXCJJIGxlYXJuZWQgdG8gcmlkZSBhYm91dCBhIHllYXIgYWdvLCBhbmQgbGVhcm5pbmcgbWlnaHQgaGF2ZSBiZWVuIG9uZSBvZiB0aGVcIiArXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBldmVyIGRvbmUuIEl0XFwncyBhIHJlYWxseSBmdW4gd2F5IHRvIGdldFwiICtcbiAgICAgICAgICBcIiBhcm91bmQgYW5kIGFuIGV2ZW4gYmV0dGVyIHdheSB0byBzdGF5IGFjdGl2ZS5cIixcbiAgICAgICAgICBcIiBJIGV2ZW4gbWFuYWdlZCB0byBkZXNpZ24gYSBkZWNhbCBhbmQgcGFpbnQgaXQgb250byBteSBib2FyZCFcIl1cbiAgfSx7XG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzIGludG8gYnVpbGRpbmcgYSBtdWx0aXZlcnNlLlwiLFxuICAgICAgICAgIFwiVGhlcmUgYXJlIHNvIG1hbnkgbW92aW5nIHBhcnRzIHRvIGZhY3RvciBpbiBhbmQgaXRcXCdzIGFtYXppbmcgdG8gc2VlIGhvdyBcIiArIFxuICAgICAgICAgIFwiIGF1dGhvcnMgY2FuIGNvbnRpbnVlIHRvIGlubm92YXRlIHRoZSBjaGFyYWN0ZXJzIGFuZCBwcmVzZW50IHRoZWlyIGZhbnMgd2l0aCBuZXcgdG9waWNzIHRvIHRoaW5rIGFib3V0IGV2ZXJ5IGlzc3VlLlwiXSxcbiAgICBsaW5rOiBcIiNjb21pY3NcIlxuICB9LHtcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxuICAgIGRlc2M6ICRzY2UudHJ1c3RBc0h0bWwoXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3BlciB3aG8gaGFwcGVucyB0byB3cml0ZSBsb3RzIG9mIEphdmFzY3JpcHQuIDwvcD5cIiArXG4gICAgICAgICAgXCI8cD5JIHN0YXJ0ZWQgb2ZmIGJ1aWxkaW5nIGFwcHMgd2l0aCBSdWJ5IG9uIFJhaWxzIGFuZCBoYXZlIG1vdmVkIG9uIHRvXCIgK1xuICAgICAgICAgIFwiIE5vZGUgYW5kIEV4cHJlc3MuIFdoYXQgeW91XFwncmUgbG9va2luZyBhdCByaWdodCBub3cgd2FzIGFjdHVhbGx5IGJ1aWx0IHdpdGggXCIgK1xuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIDxhIHN0eWxlPVxcXCJ0ZXh0LWRlY29yYXRpb246bm9uZVxcXCIgaHJlZj1cXFwiL2NvZGVcXFwiPmhlcmU8L2E+XCIpLFxuICAgIGxpbms6IFwiXCJcbiAgfV07XG5cbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XG4gICAgaWQ6ICdidG4tdHdpdHRlcicsXG4gICAgbGFiZWw6ICdUV0lUVEVSJyxcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1naXRodWInLFxuICAgIGxhYmVsOiAnR0lUSFVCJyxcbiAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxuICAgIGxhYmVsOiAnTElOS0VESU4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbGZyZWRhYmFiaW8vZW4nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1lbWFpbCcsXG4gICAgbGFiZWw6ICdFTUFJTCcsXG4gICAgdXJsOiAnbWFpbHRvOmFhYmFiaW83NUBnbWFpbC5jb20nXG4gIH1dO1xuXG4gICRzY29wZS5hYm91dFRleHQgPSB7ICAgICAgICAgIFxuICAgIGludHJvOiBcIkhpLCBJXFwnbSBBbGZyZWQuXCIsICAgICBcbiAgICBib2R5OiBbXG4gICAgICBcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXG4gICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IEdvb2dsaW5nIGl0IGxvbmcgZW5vdWdoLlwiLFxuICAgICAgXCJBbHNvLCBteSBmcmllbmRzIHRoaW5rIElcXCdtIGEgcHJldHR5IGNvb2wgZ3V5IChldmVuIHRob3VnaCB0aGV5XFwnbGwgZGVueSBpdCBhZnRlciByZWFkaW5nIHRoaXMuKVwiXVxuICB9OyAgXG59KTsiLCIoZnVuY3Rpb24gKG5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiBcbiAgdmFyIGFwcCA9IG5nLm1vZHVsZSgnbmdMb2FkU2NyaXB0JywgW10pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3NjcmlwdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIFxuICAgICAge1xuICAgICAgICBpZiAoYXR0ci50eXBlPT09J3RleHQvamF2YXNjcmlwdC1sYXp5JykgXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdmFyIHNyYyA9IGVsZW0uYXR0cignc3JjJyk7XG4gICAgICAgICAgaWYoc3JjIT09dW5kZWZpbmVkKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgIHMudGV4dCA9IGNvZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuIFxufShhbmd1bGFyKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9