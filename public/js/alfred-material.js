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

app.config(function($routeProvider, $mdThemingProvider) {
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

app.controller('NavCtrl', function($scope, $location, $mdSidenav, $log, $window) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnLCAnbmdTYW5pdGl6ZSddKTtcclxuXHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdkZWVwLXB1cnBsZScsIHtcclxuICAgICdkZWZhdWx0JzogJzQwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2NvZGUnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnY3lhbicsIHtcclxuICAgICdkZWZhdWx0JyA6JzcwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdwaW5rJyk7XHJcblxyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29taWNzJylcclxuICAucHJpbWFyeVBhbGV0dGUoJ3JlZCcsIHtcclxuICAgICdkZWZhdWx0JzogJzYwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuYWx3YXlzV2F0Y2hUaGVtZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnLFxyXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjN0U1N0MyJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZScsXHJcbiAgICAgIHRoZW1lOiAnY29kZScsXHJcbiAgICAgIGljb25Db2xvcjogJyMwMDk3QTcnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdMaWJyYXJ5JyxcclxuICAgICAgdGhlbWU6ICdjb21pY3MnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjRTUzOTM1J1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvcmVzdW1lJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPScvcmVzdW1lJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC53aGVuKCcvb2xkJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL29sZCc7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAud2hlbignL21lYW4nLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9Jy9tZWFuJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyXHJcbiAgICAuaWNvbignZGVtbycsICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycpXHJcbiAgICAuaWNvbignZ2l0aHViJywgJ2ljb25zL2dpdGh1Yi5zdmcnKVxyXG4gICAgLmljb24oJ2NvbWljJywgJ2ljb25zL2Rhc2hib2FyZC5zdmcnKVxyXG4gICAgLmljb24oJ2NvZGUnLCAnaWNvbnMvY29kZS5zdmcnKVxyXG4gICAgLmljb24oJ3Jlc3VtZScsICdpY29ucy9kZXNjcmlwdGlvbi5zdmcnKVxyXG4gICAgLmljb24oJ2hvbWUnLCAnaWNvbnMvaG9tZS5zdmcnKVxyXG4gICAgLmljb24oJ2luZm8nLCAnaWNvbnMvaW5mby5zdmcnKTtcclxufSk7XHJcblxyXG5hcHAucnVuKGZ1bmN0aW9uKCRodHRwLCAkdGVtcGxhdGVDYWNoZSkge1xyXG4gIHZhciBpY29uVXJscyA9IFtcclxuICAgICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycsXHJcbiAgICAnaWNvbnMvZ2l0aHViLnN2ZycsXHJcbiAgICAnaWNvbnMvZGFzaGJvYXJkLnN2ZycsXHJcbiAgICAnaWNvbnMvY29kZS5zdmcnLFxyXG4gICAgJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycsXHJcbiAgICAnaWNvbnMvaG9tZS5zdmcnLFxyXG4gICAgJ2ljb25zL2luZm8uc3ZnJ1xyXG4gIF07XHJcblxyXG4gIGFuZ3VsYXIuZm9yRWFjaChpY29uVXJscywgZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkaHR0cC5nZXQodXJsLCB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRsb2NhdGlvbikge1xyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnRoZW1lID0gZGF0YS50aGVtZTtcclxuICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkbWRTaWRlbmF2LCAkbG9nLCAkd2luZG93KSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnBhZ2VUaXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgICAkc2NvcGUuaWNvbkNvbG9yID0gZGF0YS5pY29uQ29sb3I7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICdob21lJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJ2NvZGUnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0xpYnJhcnknLFxyXG4gICAgdXJsOiAnL2NvbWljcycsXHJcbiAgICBpY29uOiAnY29taWMnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ1Jlc3VtZScsXHJcbiAgICB1cmw6ICcvcmVzdW1lJyxcclxuICAgIGljb246ICdyZXN1bWUnXHJcbiAgfV07XHJcbiAgXHJcbiAgJHNjb3BlLnRvZ2dsZVNpZGVNZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkbWRTaWRlbmF2KCdzaWRlTmF2JykudG9nZ2xlKClcclxuICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmICgkbWRTaWRlbmF2KCdzaWRlTmF2JykuaXNPcGVuKCkpIHtcclxuICAgICAgICB2YXIgYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWQtc2lkZW5hdi1iYWNrZHJvcCcpO1xyXG4gICAgICAgIGlmKGJhY2tkcm9wRWxlbWVudCkge1xyXG4gICAgICAgICAgYmFja2Ryb3BFbGVtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVUb01lbnUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIGlmICh1cmwgPT0gJy9yZXN1bWUnKSB7XHJcbiAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRsb2NhdGlvbi5wYXRoKHVybCk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gIH07XHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignUHJvamVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kRGlhbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtc2l0ZS1jb3Zlci5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tYXRlcmlhbC13ZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWRhYmFiLmlvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJyxcbiAgICAgIFwiZGFya092ZXJsYXlcIjogdHJ1ZVxuICAgIH0sXG4gICAgJ2VmJzoge1xuICAgICAgXCJuYW1lXCI6IFwiRXhlbXB0aW9uIENoZWNrXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL2VmLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJpbmZvXCI6IFsnVHVyYm9UYXggRXhlbXB0aW9uIENoZWNrIGlzIGEgdG9vbCBmb3IgY3VzdG9tZXJzIHRvIGZpbmQgb3V0IHdoZXRoZXIgdGhleSBhcmUgZXhlbXB0IGZyb20gdGhlIGhlYWx0aGNhcmUgcGVuYWx0eSBmb3IgdGhhdCB0YXggeWVhci4gJyArIFxuICAgICAgICAgICAgICAgICdXaGlsZSB3b3JraW5nIG9uIEV4ZW1wdGlvbiBDaGVjaywgSSB3YXMgYW4gZW5naW5lZXIgcmVzcG9uc2libGUgZm9yIGltcGxlbWVudGluZyBjcm9zcy1kZXZpY2UgZGF0YSBwZXJzaXN0ZW5jZS4gJyArIFxuICAgICAgICAgICAgICAgICdUaGlzIGFsbG93ZWQgY3VzdG9tZXJzIHRvIHN0YXJ0IHRoZSBhcHBsaWNhdGlvbiBvbiBvbmUgZGV2aWNlIGFuZCBzaWduIG91dCwgYW5kIHRoZW4gc2lnbiBiYWNrIGluIG9uIGEgc2Vjb25kIGRldmljZScgKyBcbiAgICAgICAgICAgICAgICAnYW5kIGNvbXBsZXRlIHRoZWlyIGFwcGxpY2F0aW9uIHdoZXJlIHRoZXkgbGVmdCBvZmYuJyxcbiAgICAgICAgICAgICAgICdJIHdhcyBhbHNvIHBhcnQgb2YgdGhlIHNtYWxsIHRlYW0gdGhhdCB3YXMgdGFza2VkIHdpdGggYSBtYXNzaXZlIHJld3JpdGUgb2YgdGhlIHRvb2wgb25jZSB0aGUgQWZmb3JkYWJsZSBDYXJlIEFjdCAnICsgXG4gICAgICAgICAgICAgICAgJ2xhdyBjaGFuZ2VkIHRvIGFsbG93IG9uZSBmb3JtIHBlciBob3VzZWhvbGQgaW5zdGVhZCBvZiBvbmUgZm9ybSBwZXIgbWVtYmVyIG9mIHRoZSBob3VzZWhvbGQuIFRoaXMgcmVxdWlyZWQgcmFwaWQgJyArIFxuICAgICAgICAgICAgICAgICdpbXBsZW1lbnRhdGlvbiBvZiBmZWF0dXJlcyBhbmQgYWxzbyByZXF1aXJlZCB0aGF0IHdlIGRpZG7igJl0IGJyZWFrIHRoZSBjb3JlIGZ1bmN0aW9uYWxpdHkgYXMgdGhhdCB3YXMgc3RpbGwgdGhlIHByaW1hcnkgdXNlLWNhc2UuJywgXG4gICAgICAgICAgICAgICAnSSB3YXMgYSBmdWxsLXN0YWNrIGVuZ2luZWVyLCBhcyBJIHdvcmtlZCB3aXRoIHRoZSBiYWNrZW5kIHNlcnZpY2VzIGFzIG11Y2ggYXMgSSB3YXMgZG9pbmcgQ1NTIHR3ZWFrcyBvbiB0aGUgZnJvbnRlbmQgd2hpY2gnICsgXG4gICAgICAgICAgICAgICAnIHJlcXVpcmVkIGNvbXByZWhlbnNpdmUgdW5pdCB0ZXN0cyBmb3IgYm90aC4gRHVyaW5nIHBlYWsgdGltZXMgSSB3YXMgYWxzbyByZXNwb25zaWJsZSBmb3IgbW9uaXRvcmluZyBvdXIgU3BsdW5rIGxvZ3MgZm9yIHNlcnZpY2Ugb3V0dGFnZXMgYW5kIGVycm9ycy4nXSxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJyxcbiAgICAgIFwiZGFya092ZXJsYXlcIjogdHJ1ZVxuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9vbGQtcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJy9vbGQnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnXG4gICAgfSxcbiAgICAnbWVhbic6IHtcbiAgICAgIFwibmFtZVwiOiBcIk1FQU4gU2tlbGV0b25cIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtb3JhbmdlLXB5cmFtaWRzLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21lYW4tc2tlbGV0b24nLFxuICAgICAgXCJkZW1vTGlua1wiOiAnL21lYW4nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnbW9kZXJhdG9yJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ2VuZ2FnZSBNb2RlcmF0b3JcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtdGVhbC10cmkuanBnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImluZm9cIjogWydXaGlsZSB3b3JraW5nIG9uIENlbmdhZ2UgTW9kZXJhdG9yLCBJIHdhcyBvbiBhIHNtYWxsIHRlYW0gb2YgZW5naW5lZXJzIHdobyBoYWQgYSBsb3Qgb2YgZnJlZWRvbSBvdmVyIHRoZSBhcmNoaXRlY3R1cmUgJyArIFxuICAgICAgICAgICAgICAgICdhbmQgdGVjaG5vbG9neSB1c2VkIHRvIGNyZWF0ZSBhIHF1ZXN0aW9uIGFuZCBhbnN3ZXIgYXBwbGljYXRpb24gZm9yIHRoZSBjb21wYW55IHRvIHVzZSB0byBhc2sgcXVlc3Rpb25zIG9mIHRoZSBDVE8gZHVyaW5nIGhpcyBvZmZpY2UgaG91cnMuJywgXG4gICAgICAgICAgICAgICAgJ0kgd2FzIHJlc3BvbnNpYmxlIGZvciBhcmNoaXRlY3RpbmcgdGhlIHVzZXIgbW9kZWwuIFRoaXMgbWVhbnMgdGhhdCBJIGltcGxlbWVudGVkIHVzZXIgYWNjb3VudCBjcmVhdGlvbiwgdXNlciBzZXNzaW9ucyBhbmQgJyArIFxuICAgICAgICAgICAgICAgICdhY2NvdW50IHJlY292ZXJ5LiBBbGwgb2YgbXkgc29sdXRpb25zIHdlcmUgY3JlYXRlZCBpbi1ob3VzZSBhcyB0aGUgcG9wdWxhciBSdWJ5IGdlbSwg4oCcZGV2aXNl4oCdIHdhcyB0b28gaGVhdnkgZm9yIHRoZSBzaW1wbGljaXR5IG9mIHRoZSBwcm9qZWN0LiAnICsgXG4gICAgICAgICAgICAgICAgJ0EgbG9uZyB3aXRoIHVzZXIgYWNjb3VudHMsIEkgYWxzbyBpbXBsZW1lbnRlZCB1c2VyIHByb2ZpbGVzIGFuZCBhY2Nlc3MgbGV2ZWxzIGZvciByb2xlcy4gJyxcbiAgICAgICAgICAgICAgICAnRHVlIHRvIHRoZSBuYXR1cmUgb2YgdGhlIGFwcGxpY2F0aW9uLCB3ZSBoYWQgbWFueSBuZXN0ZWQgZGF0YS1tb2RlbHMgYW5kIG15IHRlYW0gaGFkIHRvIHRlYWNoICcgKyBcbiAgICAgICAgICAgICAgICAnb3Vyc2VsdmVzIHJlbGF0aW9uYWwgZGF0YSBtb2RlbHMuIEZvciBleGFtcGxlLCB3ZSB1c2VkIG1hbnktdG8tbWFueSBmb3IgdXNlcnMgZmF2b3JpdGluZyBhbmQgdm90aW5nICcgKyBcbiAgICAgICAgICAgICAgICAnb24gcXVlc3Rpb25zLCBzbyB0aGF0IGEgdXNlciBjb3VsZCBicm93c2UgdGhlaXIgZmF2b3JpdGUgcXVlc3Rpb25zLiBJIGFsc28gc2V0IHVwIGF1dG9tYXRlZCB1bml0IGFuZCAnICsgXG4gICAgICAgICAgICAgICAgJ2ludGVncmF0aW9uIHRlc3Rpbmcgc3VpdGVzIGFuZCB3cm90ZSBzb21lIG9mIHRoZSBmcm9udGVuZCBpbnRlcmFjdGlvbnMuJ10sXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vbW9kZXJhdG9yLmNlbmdhZ2UuY29tJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2Nzc0xvZ29zJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ1NTIExvZ29zXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLWdyZXktY2lyY2xlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL2Nzcy1sb2dvcycsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkLmdpdGh1Yi5pby9jc3MtbG9nb3MvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUub3BlblByb2plY3RJbmZvID0gZnVuY3Rpb24oZXYsIG5hbWUpIHtcbiAgICB2YXIgYm9keUVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSk7XG4gICAgdmFyIHRoaXNQcm9qZWN0ID0gJHNjb3BlLmFsbFByb2plY3RzW25hbWVdO1xuICAgIHZhciBkaWFsb2dDb250ZW50ID0gJG1kRGlhbG9nLmFsZXJ0KHtcbiAgICAgIHBhcmVudDogYm9keUVsZW1lbnQsXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICB0ZW1wbGF0ZTpcbiAgICAgICAgICAgICc8bWQtZGlhbG9nPicgK1xuICAgICAgICAgICAgJyAgPG1kLXRvb2xiYXI+JyArIFxuICAgICAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzXCI+JyArXG4gICAgICAgICAgICAnICAgICA8aDI+e3twcm9qZWN0Lm5hbWV9fTwvaDI+JyArXG4gICAgICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICAgICAnICA8L21kLXRvb2xiYXI+JyArXG4gICAgICAgICAgICAnICA8bWQtZGlhbG9nLWNvbnRlbnQ+JytcbiAgICAgICAgICAgICcgICAgPHAgY2xhc3M9XCJpbnRlbnQtcFwiIG5nLXJlcGVhdD1cInAgaW4gcHJvamVjdC5pbmZvXCI+e3twfX08L3A+JyArXG4gICAgICAgICAgICAnICA8L21kLWRpYWxvZy1jb250ZW50PicgK1xuICAgICAgICAgICAgJyAgPGRpdiBjbGFzcz1cIm1kLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICcgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cImNsb3NlUHJvamVjdEluZm8oKVwiIGNsYXNzPVwibWQtcHJpbWFyeVwiPicgK1xuICAgICAgICAgICAgJyAgICAgIEltcHJlc3NpdmUhJyArXG4gICAgICAgICAgICAnICAgIDwvbWQtYnV0dG9uPicgK1xuICAgICAgICAgICAgJyAgPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9tZC1kaWFsb2c+JyxcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICBlc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgbG9jYWxzOiAge1xuICAgICAgICBwcm9qZWN0IDogdGhpc1Byb2plY3RcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBEaWFsb2dDb250cm9sbGVyKCRzY29wZSwgJG1kRGlhbG9nLCBwcm9qZWN0KSB7XG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgJHNjb3BlLmNsb3NlUHJvamVjdEluZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbWREaWFsb2cuaGlkZSgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJG1kRGlhbG9nLnNob3coZGlhbG9nQ29udGVudCkudGhlbihmdW5jdGlvbigpIHtcblxuICAgIH0pO1xuICB9O1xuICBcbn0pO1xuYXBwLmRpcmVjdGl2ZSgncHJvakltZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCdwcm9qSW1nJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHZhbHVlICsnKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc2NlKSB7XG4gICRzY29wZS5ob2JiaWVzID0gW3tcbiAgICBuYW1lOiBcIkxvbmdib2FyZGVyXCIsXG4gICAgZGVzYzogJHNjZS50cnVzdEFzSHRtbChcIkkgbGVhcm5lZCB0byByaWRlIGFib3V0IGEgeWVhciBhZ28sIGFuZCBsZWFybmluZyBtaWdodCBoYXZlIGJlZW4gb25lIG9mIHRoZVwiICtcbiAgICAgICAgICBcIiAgYmVzdCB0aGluZ3MgSVxcJ3ZlIGV2ZXIgZG9uZS4gSXRcXCdzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xuICAgICAgICAgIFwiIGFyb3VuZCBhbmQgYW4gZXZlbiBiZXR0ZXIgd2F5IHRvIHN0YXkgYWN0aXZlLjwvcD48cD5cIiArXG4gICAgICAgICAgXCIgSSBldmVuIG1hbmFnZWQgdG8gZGVzaWduIGEgZGVjYWwgYW5kIHBhaW50IGl0IG9udG8gbXkgYm9hcmQhXCIpLFxuICB9LHtcbiAgICBuYW1lOiBcIkNvbWljIFJlYWRlclwiLFxuICAgIGRlc2M6ICRzY2UudHJ1c3RBc0h0bWwoXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzIGludG8gYnVpbGRpbmcgYSBtdWx0aXZlcnNlLjwvcD5cIiArXG4gICAgICAgICAgXCI8cD5UaGVyZSBhcmUgc28gbWFueSBtb3ZpbmcgcGFydHMgdG8gZmFjdG9yIGluIGFuZCBpdFxcJ3MgYW1hemluZyB0byBzZWUgaG93IGF1dGhvcnMgY2FuIFwiICsgXG4gICAgICAgICAgXCJjb250aW51ZSB0byBpbm5vdmF0ZSB0aGUgY2hhcmFjdGVycyBhbmQgcHJlc2VudCB0aGVpciBmYW5zIHdpdGggbmV3IHRvcGljcyB0byB0aGluayBhYm91dCBldmVyeSBpc3N1ZS5cIiksXG4gICAgbGluazogXCIjY29taWNzXCJcbiAgfSx7XG4gICAgbmFtZTogXCJEZXZlbG9wZXJcIixcbiAgICBkZXNjOiAkc2NlLnRydXN0QXNIdG1sKFwiSVxcJ20gYSBmdWxsLXN0YWNrIHdlYiBkZXZlbG9wZXIgd2hvIGhhcHBlbnMgdG8gd3JpdGUgbG90cyBvZiBKYXZhc2NyaXB0LiA8L3A+XCIgK1xuICAgICAgICAgIFwiPHA+SSBzdGFydGVkIG9mZiBidWlsZGluZyBhcHBzIHdpdGggUnVieSBvbiBSYWlscyBhbmQgaGF2ZSBtb3ZlZCBvbiB0b1wiICtcbiAgICAgICAgICBcIiBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcbiAgICAgICAgICBcIk5vZGUgYW5kIEV4cHJlc3MsIGFuZCBhIGdlbmVyb3VzIGFtb3VudCBvZiBBbmd1bGFyLiBDaGVjayBvdXQgbXkgb3RoZXIgd29yayA8YSBzdHlsZT1cXFwidGV4dC1kZWNvcmF0aW9uOm5vbmVcXFwiIGhyZWY9XFxcIi9jb2RlXFxcIj5oZXJlPC9hPlwiKSxcbiAgICBsaW5rOiBcIlwiXG4gIH1dO1xuXG4gICRzY29wZS5jb250YWN0SW5mb3MgPSBbe1xuICAgIGlkOiAnYnRuLXR3aXR0ZXInLFxuICAgIGxhYmVsOiAnVFdJVFRFUicsXG4gICAgdXJsOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9hbGZyZWRhYmFiX2lvJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcbiAgICBsYWJlbDogJ0dJVEhVQicsXG4gICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZCdcbiAgfSwge1xuICAgIGlkOiAnYnRuLWxpbmtlZGluJyxcbiAgICBsYWJlbDogJ0xJTktFRElOJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZW1haWwnLFxuICAgIGxhYmVsOiAnRU1BSUwnLFxuICAgIHVybDogJ21haWx0bzphYWJhYmlvNzVAZ21haWwuY29tJ1xuICB9XTtcblxuICAkc2NvcGUuYWJvdXRUZXh0ID0geyAgICAgICAgICBcbiAgICBpbnRybzogXCJIaSwgSVxcJ20gQWxmcmVkLlwiLCAgICAgXG4gICAgYm9keTogJHNjZS50cnVzdEFzSHRtbChcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXG4gICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IEdvb2dsaW5nIGl0IGxvbmcgZW5vdWdoLjwvcD48cD5cIiArXG4gICAgICBcIkFsc28sIG15IGZyaWVuZHMgdGhpbmsgSVxcJ20gYSBwcmV0dHkgY29vbCBndXkgKGV2ZW4gdGhvdWdoIHRoZXlcXCdsbCBkZW55IGl0IGFmdGVyIHJlYWRpbmcgdGhpcy4pXCIpLFxuICB9OyAgXG59KTsiLCIoZnVuY3Rpb24gKG5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiBcbiAgdmFyIGFwcCA9IG5nLm1vZHVsZSgnbmdMb2FkU2NyaXB0JywgW10pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3NjcmlwdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIFxuICAgICAge1xuICAgICAgICBpZiAoYXR0ci50eXBlPT09J3RleHQvamF2YXNjcmlwdC1sYXp5JykgXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdmFyIHNyYyA9IGVsZW0uYXR0cignc3JjJyk7XG4gICAgICAgICAgaWYoc3JjIT09dW5kZWZpbmVkKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgIHMudGV4dCA9IGNvZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuIFxufShhbmd1bGFyKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
