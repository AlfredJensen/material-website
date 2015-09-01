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
        $window.location.href = '/resume';
      }
    })
    .when('/resume.pdf', {
      redirectTo: function() {
        $window.location.href = '/resume');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnLCAnbmdTYW5pdGl6ZSddKTtcclxuXHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdkZWVwLXB1cnBsZScsIHtcclxuICAgICdkZWZhdWx0JzogJzQwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2NvZGUnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnY3lhbicsIHtcclxuICAgICdkZWZhdWx0JyA6JzcwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdwaW5rJyk7XHJcblxyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29taWNzJylcclxuICAucHJpbWFyeVBhbGV0dGUoJ3JlZCcsIHtcclxuICAgICdkZWZhdWx0JzogJzYwMCdcclxuICB9KVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuYWx3YXlzV2F0Y2hUaGVtZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJHdpbmRvdykge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnLFxyXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjN0U1N0MyJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZScsXHJcbiAgICAgIHRoZW1lOiAnY29kZScsXHJcbiAgICAgIGljb25Db2xvcjogJyMwMDk3QTcnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdMaWJyYXJ5JyxcclxuICAgICAgdGhlbWU6ICdjb21pY3MnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjRTUzOTM1J1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvcmVzdW1lJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3Jlc3VtZSc7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAud2hlbignL3Jlc3VtZS5wZGYnLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcmVzdW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAud2hlbignL29sZCcsIHtcclxuICAgICAgcmVkaXJlY3RUbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9vbGQnO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9tZWFuJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPScvbWVhbic7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZEljb25Qcm92aWRlcikge1xyXG4gICRtZEljb25Qcm92aWRlclxyXG4gICAgLmljb24oJ2RlbW8nLCAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnKVxyXG4gICAgLmljb24oJ2dpdGh1YicsICdpY29ucy9naXRodWIuc3ZnJylcclxuICAgIC5pY29uKCdjb21pYycsICdpY29ucy9kYXNoYm9hcmQuc3ZnJylcclxuICAgIC5pY29uKCdjb2RlJywgJ2ljb25zL2NvZGUuc3ZnJylcclxuICAgIC5pY29uKCdyZXN1bWUnLCAnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJylcclxuICAgIC5pY29uKCdob21lJywgJ2ljb25zL2hvbWUuc3ZnJylcclxuICAgIC5pY29uKCdpbmZvJywgJ2ljb25zL2luZm8uc3ZnJyk7XHJcbn0pO1xyXG5cclxuYXBwLnJ1bihmdW5jdGlvbigkaHR0cCwgJHRlbXBsYXRlQ2FjaGUpIHtcclxuICB2YXIgaWNvblVybHMgPSBbXHJcbiAgICAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnLFxyXG4gICAgJ2ljb25zL2dpdGh1Yi5zdmcnLFxyXG4gICAgJ2ljb25zL2Rhc2hib2FyZC5zdmcnLFxyXG4gICAgJ2ljb25zL2NvZGUuc3ZnJyxcclxuICAgICdpY29ucy9kZXNjcmlwdGlvbi5zdmcnLFxyXG4gICAgJ2ljb25zL2hvbWUuc3ZnJyxcclxuICAgICdpY29ucy9pbmZvLnN2ZydcclxuICBdO1xyXG5cclxuICBhbmd1bGFyLmZvckVhY2goaWNvblVybHMsIGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGh0dHAuZ2V0KHVybCwge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbG9jYXRpb24pIHtcclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS50aGVtZSA9IGRhdGEudGhlbWU7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgJG1kU2lkZW5hdiwgJGxvZykge1xyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS5wYWdlVGl0bGUgPSBkYXRhLnRpdGxlO1xyXG4gICAgJHNjb3BlLmljb25Db2xvciA9IGRhdGEuaWNvbkNvbG9yO1xyXG4gIH0pO1xyXG5cclxuICAkc2NvcGUubmF2TGlua3MgPSBbe1xyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgdXJsOiAnLycsXHJcbiAgICBpY29uOiAnaG9tZSdcclxuICB9LHtcclxuICAgIG5hbWU6ICdDb2RlJyxcclxuICAgIHVybDogJy9jb2RlJyxcclxuICAgIGljb246ICdjb2RlJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdMaWJyYXJ5JyxcclxuICAgIHVybDogJy9jb21pY3MnLFxyXG4gICAgaWNvbjogJ2NvbWljJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdSZXN1bWUnLFxyXG4gICAgdXJsOiAnL3Jlc3VtZScsXHJcbiAgICBpY29uOiAncmVzdW1lJ1xyXG4gIH1dO1xyXG4gIFxyXG4gICRzY29wZS50b2dnbGVTaWRlTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJG1kU2lkZW5hdignc2lkZU5hdicpLnRvZ2dsZSgpXHJcbiAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJG1kU2lkZW5hdignc2lkZU5hdicpLmlzT3BlbigpKSB7XHJcbiAgICAgICAgdmFyIGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21kLXNpZGVuYXYtYmFja2Ryb3AnKTtcclxuICAgICAgICBpZihiYWNrZHJvcEVsZW1lbnQpIHtcclxuICAgICAgICAgIGJhY2tkcm9wRWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbmltYXRlVG9NZW51KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICBpZiAodXJsID09ICcvcmVzdW1lJykge1xyXG4gICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkbG9jYXRpb24ucGF0aCh1cmwpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICB9O1xyXG59KTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZERpYWxvZykge1xuXG4gICRzY29wZS5hbGxQcm9qZWN0cyA9IHtcbiAgICAnbWRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQWxmcmVkIE1hdGVyaWFsXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLXNpdGUtY292ZXIuanBnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJycsXG4gICAgICBcImRhcmtPdmVybGF5XCI6IHRydWVcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9lZi5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiBbJ1R1cmJvVGF4IEV4ZW1wdGlvbiBDaGVjayBpcyBhIHRvb2wgZm9yIGN1c3RvbWVycyB0byBmaW5kIG91dCB3aGV0aGVyIHRoZXkgYXJlIGV4ZW1wdCBmcm9tIHRoZSBoZWFsdGhjYXJlIHBlbmFsdHkgZm9yIHRoYXQgdGF4IHllYXIuICcgKyBcbiAgICAgICAgICAgICAgICAnV2hpbGUgd29ya2luZyBvbiBFeGVtcHRpb24gQ2hlY2ssIEkgd2FzIGFuIGVuZ2luZWVyIHJlc3BvbnNpYmxlIGZvciBpbXBsZW1lbnRpbmcgY3Jvc3MtZGV2aWNlIGRhdGEgcGVyc2lzdGVuY2UuICcgKyBcbiAgICAgICAgICAgICAgICAnVGhpcyBhbGxvd2VkIGN1c3RvbWVycyB0byBzdGFydCB0aGUgYXBwbGljYXRpb24gb24gb25lIGRldmljZSBhbmQgc2lnbiBvdXQsIGFuZCB0aGVuIHNpZ24gYmFjayBpbiBvbiBhIHNlY29uZCBkZXZpY2UnICsgXG4gICAgICAgICAgICAgICAgJ2FuZCBjb21wbGV0ZSB0aGVpciBhcHBsaWNhdGlvbiB3aGVyZSB0aGV5IGxlZnQgb2ZmLicsXG4gICAgICAgICAgICAgICAnSSB3YXMgYWxzbyBwYXJ0IG9mIHRoZSBzbWFsbCB0ZWFtIHRoYXQgd2FzIHRhc2tlZCB3aXRoIGEgbWFzc2l2ZSByZXdyaXRlIG9mIHRoZSB0b29sIG9uY2UgdGhlIEFmZm9yZGFibGUgQ2FyZSBBY3QgJyArIFxuICAgICAgICAgICAgICAgICdsYXcgY2hhbmdlZCB0byBhbGxvdyBvbmUgZm9ybSBwZXIgaG91c2Vob2xkIGluc3RlYWQgb2Ygb25lIGZvcm0gcGVyIG1lbWJlciBvZiB0aGUgaG91c2Vob2xkLiBUaGlzIHJlcXVpcmVkIHJhcGlkICcgKyBcbiAgICAgICAgICAgICAgICAnaW1wbGVtZW50YXRpb24gb2YgZmVhdHVyZXMgYW5kIGFsc28gcmVxdWlyZWQgdGhhdCB3ZSBkaWRu4oCZdCBicmVhayB0aGUgY29yZSBmdW5jdGlvbmFsaXR5IGFzIHRoYXQgd2FzIHN0aWxsIHRoZSBwcmltYXJ5IHVzZS1jYXNlLicsIFxuICAgICAgICAgICAgICAgJ0kgd2FzIGEgZnVsbC1zdGFjayBlbmdpbmVlciwgYXMgSSB3b3JrZWQgd2l0aCB0aGUgYmFja2VuZCBzZXJ2aWNlcyBhcyBtdWNoIGFzIEkgd2FzIGRvaW5nIENTUyB0d2Vha3Mgb24gdGhlIGZyb250ZW5kIHdoaWNoJyArIFxuICAgICAgICAgICAgICAgJyByZXF1aXJlZCBjb21wcmVoZW5zaXZlIHVuaXQgdGVzdHMgZm9yIGJvdGguIER1cmluZyBwZWFrIHRpbWVzIEkgd2FzIGFsc28gcmVzcG9uc2libGUgZm9yIG1vbml0b3Jpbmcgb3VyIFNwbHVuayBsb2dzIGZvciBzZXJ2aWNlIG91dHRhZ2VzIGFuZCBlcnJvcnMuJ10sXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwczovL3R1cmJvdGF4LmludHVpdC5jb20vaGVhbHRoLWNhcmUvZXhlbXB0aW9ucycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJycsXG4gICAgICBcImRhcmtPdmVybGF5XCI6IHRydWVcbiAgICB9LFxuICAgICdvbGRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiT2xkIFdlYnNpdGVcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvb2xkLXMucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICcvb2xkJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLW9yYW5nZS1weXJhbWlkcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJy9tZWFuJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ21vZGVyYXRvcic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNlbmdhZ2UgTW9kZXJhdG9yXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLXRlYWwtdHJpLmpwZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJpbmZvXCI6IFsnV2hpbGUgd29ya2luZyBvbiBDZW5nYWdlIE1vZGVyYXRvciwgSSB3YXMgb24gYSBzbWFsbCB0ZWFtIG9mIGVuZ2luZWVycyB3aG8gaGFkIGEgbG90IG9mIGZyZWVkb20gb3ZlciB0aGUgYXJjaGl0ZWN0dXJlICcgKyBcbiAgICAgICAgICAgICAgICAnYW5kIHRlY2hub2xvZ3kgdXNlZCB0byBjcmVhdGUgYSBxdWVzdGlvbiBhbmQgYW5zd2VyIGFwcGxpY2F0aW9uIGZvciB0aGUgY29tcGFueSB0byB1c2UgdG8gYXNrIHF1ZXN0aW9ucyBvZiB0aGUgQ1RPIGR1cmluZyBoaXMgb2ZmaWNlIGhvdXJzLicsIFxuICAgICAgICAgICAgICAgICdJIHdhcyByZXNwb25zaWJsZSBmb3IgYXJjaGl0ZWN0aW5nIHRoZSB1c2VyIG1vZGVsLiBUaGlzIG1lYW5zIHRoYXQgSSBpbXBsZW1lbnRlZCB1c2VyIGFjY291bnQgY3JlYXRpb24sIHVzZXIgc2Vzc2lvbnMgYW5kICcgKyBcbiAgICAgICAgICAgICAgICAnYWNjb3VudCByZWNvdmVyeS4gQWxsIG9mIG15IHNvbHV0aW9ucyB3ZXJlIGNyZWF0ZWQgaW4taG91c2UgYXMgdGhlIHBvcHVsYXIgUnVieSBnZW0sIOKAnGRldmlzZeKAnSB3YXMgdG9vIGhlYXZ5IGZvciB0aGUgc2ltcGxpY2l0eSBvZiB0aGUgcHJvamVjdC4gJyArIFxuICAgICAgICAgICAgICAgICdBIGxvbmcgd2l0aCB1c2VyIGFjY291bnRzLCBJIGFsc28gaW1wbGVtZW50ZWQgdXNlciBwcm9maWxlcyBhbmQgYWNjZXNzIGxldmVscyBmb3Igcm9sZXMuICcsXG4gICAgICAgICAgICAgICAgJ0R1ZSB0byB0aGUgbmF0dXJlIG9mIHRoZSBhcHBsaWNhdGlvbiwgd2UgaGFkIG1hbnkgbmVzdGVkIGRhdGEtbW9kZWxzIGFuZCBteSB0ZWFtIGhhZCB0byB0ZWFjaCAnICsgXG4gICAgICAgICAgICAgICAgJ291cnNlbHZlcyByZWxhdGlvbmFsIGRhdGEgbW9kZWxzLiBGb3IgZXhhbXBsZSwgd2UgdXNlZCBtYW55LXRvLW1hbnkgZm9yIHVzZXJzIGZhdm9yaXRpbmcgYW5kIHZvdGluZyAnICsgXG4gICAgICAgICAgICAgICAgJ29uIHF1ZXN0aW9ucywgc28gdGhhdCBhIHVzZXIgY291bGQgYnJvd3NlIHRoZWlyIGZhdm9yaXRlIHF1ZXN0aW9ucy4gSSBhbHNvIHNldCB1cCBhdXRvbWF0ZWQgdW5pdCBhbmQgJyArIFxuICAgICAgICAgICAgICAgICdpbnRlZ3JhdGlvbiB0ZXN0aW5nIHN1aXRlcyBhbmQgd3JvdGUgc29tZSBvZiB0aGUgZnJvbnRlbmQgaW50ZXJhY3Rpb25zLiddLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL21vZGVyYXRvci5jZW5nYWdlLmNvbScsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1ncmV5LWNpcmNsZS5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZC5naXRodWIuaW8vY3NzLWxvZ29zLycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLm9wZW5Qcm9qZWN0SW5mbyA9IGZ1bmN0aW9uKGV2LCBuYW1lKSB7XG4gICAgdmFyIGJvZHlFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpO1xuICAgIHZhciB0aGlzUHJvamVjdCA9ICRzY29wZS5hbGxQcm9qZWN0c1tuYW1lXTtcbiAgICB2YXIgZGlhbG9nQ29udGVudCA9ICRtZERpYWxvZy5hbGVydCh7XG4gICAgICBwYXJlbnQ6IGJvZHlFbGVtZW50LFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgdGVtcGxhdGU6XG4gICAgICAgICAgICAnPG1kLWRpYWxvZz4nICtcbiAgICAgICAgICAgICcgIDxtZC10b29sYmFyPicgKyBcbiAgICAgICAgICAgICcgICA8ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29sc1wiPicgK1xuICAgICAgICAgICAgJyAgICAgPGgyPnt7cHJvamVjdC5uYW1lfX08L2gyPicgK1xuICAgICAgICAgICAgJyAgIDwvZGl2PicgK1xuICAgICAgICAgICAgJyAgPC9tZC10b29sYmFyPicgK1xuICAgICAgICAgICAgJyAgPG1kLWRpYWxvZy1jb250ZW50PicrXG4gICAgICAgICAgICAnICAgIDxwIGNsYXNzPVwiaW50ZW50LXBcIiBuZy1yZXBlYXQ9XCJwIGluIHByb2plY3QuaW5mb1wiPnt7cH19PC9wPicgK1xuICAgICAgICAgICAgJyAgPC9tZC1kaWFsb2ctY29udGVudD4nICtcbiAgICAgICAgICAgICcgIDxkaXYgY2xhc3M9XCJtZC1hY3Rpb25zXCI+JyArXG4gICAgICAgICAgICAnICAgIDxtZC1idXR0b24gbmctY2xpY2s9XCJjbG9zZVByb2plY3RJbmZvKClcIiBjbGFzcz1cIm1kLXByaW1hcnlcIj4nICtcbiAgICAgICAgICAgICcgICAgICBJbXByZXNzaXZlIScgK1xuICAgICAgICAgICAgJyAgICA8L21kLWJ1dHRvbj4nICtcbiAgICAgICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAgICAgJzwvbWQtZGlhbG9nPicsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgZXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgIGxvY2FsczogIHtcbiAgICAgICAgcHJvamVjdCA6IHRoaXNQcm9qZWN0XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gRGlhbG9nQ29udHJvbGxlcigkc2NvcGUsICRtZERpYWxvZywgcHJvamVjdCkge1xuICAgICAgICAkc2NvcGUucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgICRzY29wZS5jbG9zZVByb2plY3RJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRtZERpYWxvZy5zaG93KGRpYWxvZ0NvbnRlbnQpLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAgICB9KTtcbiAgfTtcbiAgXG59KTtcbmFwcC5kaXJlY3RpdmUoJ3Byb2pJbWcnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpe1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgncHJvakltZycsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB2YWx1ZSArJyknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHNjZSkge1xuICAkc2NvcGUuaG9iYmllcyA9IFt7XG4gICAgbmFtZTogXCJMb25nYm9hcmRlclwiLFxuICAgIGRlc2M6IFtcIkkgbGVhcm5lZCB0byByaWRlIGFib3V0IGEgeWVhciBhZ28sIGFuZCBsZWFybmluZyBtaWdodCBoYXZlIGJlZW4gb25lIG9mIHRoZVwiICtcbiAgICAgICAgICBcIiAgYmVzdCB0aGluZ3MgSVxcJ3ZlIGV2ZXIgZG9uZS4gSXRcXCdzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xuICAgICAgICAgIFwiIGFyb3VuZCBhbmQgYW4gZXZlbiBiZXR0ZXIgd2F5IHRvIHN0YXkgYWN0aXZlLlwiLFxuICAgICAgICAgIFwiIEkgZXZlbiBtYW5hZ2VkIHRvIGRlc2lnbiBhIGRlY2FsIGFuZCBwYWludCBpdCBvbnRvIG15IGJvYXJkIVwiXVxuICB9LHtcbiAgICBuYW1lOiBcIkNvbWljIFJlYWRlclwiLFxuICAgIGRlc2M6IFtcIklcXCdtIGEgaHVnZSBEQyBjb21pY3MgZmFuLiBJIGNhbiBhcHByZWNpYXRlIHRoZSBhbW91bnQgb2Ygd29yayB0aGF0IGdvZXMgaW50byBidWlsZGluZyBhIG11bHRpdmVyc2UuXCIsXG4gICAgICAgICAgXCJUaGVyZSBhcmUgc28gbWFueSBtb3ZpbmcgcGFydHMgdG8gZmFjdG9yIGluIGFuZCBpdFxcJ3MgYW1hemluZyB0byBzZWUgaG93IFwiICsgXG4gICAgICAgICAgXCIgYXV0aG9ycyBjYW4gY29udGludWUgdG8gaW5ub3ZhdGUgdGhlIGNoYXJhY3RlcnMgYW5kIHByZXNlbnQgdGhlaXIgZmFucyB3aXRoIG5ldyB0b3BpY3MgdG8gdGhpbmsgYWJvdXQgZXZlcnkgaXNzdWUuXCJdLFxuICAgIGxpbms6IFwiI2NvbWljc1wiXG4gIH0se1xuICAgIG5hbWU6IFwiRGV2ZWxvcGVyXCIsXG4gICAgZGVzYzogJHNjZS50cnVzdEFzSHRtbChcIklcXCdtIGEgZnVsbC1zdGFjayB3ZWIgZGV2ZWxvcGVyIHdobyBoYXBwZW5zIHRvIHdyaXRlIGxvdHMgb2YgSmF2YXNjcmlwdC4gPC9wPlwiICtcbiAgICAgICAgICBcIjxwPkkgc3RhcnRlZCBvZmYgYnVpbGRpbmcgYXBwcyB3aXRoIFJ1Ynkgb24gUmFpbHMgYW5kIGhhdmUgbW92ZWQgb24gdG9cIiArXG4gICAgICAgICAgXCIgTm9kZSBhbmQgRXhwcmVzcy4gV2hhdCB5b3VcXCdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyB3YXMgYWN0dWFsbHkgYnVpbHQgd2l0aCBcIiArXG4gICAgICAgICAgXCJOb2RlIGFuZCBFeHByZXNzLCBhbmQgYSBnZW5lcm91cyBhbW91bnQgb2YgQW5ndWxhci4gQ2hlY2sgb3V0IG15IG90aGVyIHdvcmsgPGEgc3R5bGU9XFxcInRleHQtZGVjb3JhdGlvbjpub25lXFxcIiBocmVmPVxcXCIvY29kZVxcXCI+aGVyZTwvYT5cIiksXG4gICAgbGluazogXCJcIlxuICB9XTtcblxuICAkc2NvcGUuY29udGFjdEluZm9zID0gW3tcbiAgICBpZDogJ2J0bi10d2l0dGVyJyxcbiAgICBsYWJlbDogJ1RXSVRURVInLFxuICAgIHVybDogJ2h0dHBzOi8vdHdpdHRlci5jb20vYWxmcmVkYWJhYl9pbydcbiAgfSwge1xuICAgIGlkOiAnYnRuLWdpdGh1YicsXG4gICAgbGFiZWw6ICdHSVRIVUInLFxuICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQnXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1saW5rZWRpbicsXG4gICAgbGFiZWw6ICdMSU5LRURJTicsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FsZnJlZGFiYWJpby9lbidcbiAgfSwge1xuICAgIGlkOiAnYnRuLWVtYWlsJyxcbiAgICBsYWJlbDogJ0VNQUlMJyxcbiAgICB1cmw6ICdtYWlsdG86YWFiYWJpbzc1QGdtYWlsLmNvbSdcbiAgfV07XG5cbiAgJHNjb3BlLmFib3V0VGV4dCA9IHsgICAgICAgICAgXG4gICAgaW50cm86IFwiSGksIElcXCdtIEFsZnJlZC5cIiwgICAgIFxuICAgIGJvZHk6IFtcbiAgICAgIFwiSVxcJ20gYSBDb21wdXRlciBTY2llbmNlIHN0dWRlbnQgYXQgTm9ydGhlYXN0ZXJuLCBhbiBhbWF0ZXVyIHBvb2wgKHBvY2tldCBiaWxsaWFyZHMpIHBsYXllciwgXCIgKyBcbiAgICAgIFwiYW5kIGEgZmlybSBiZWxpZXZlciB0aGF0IGFueW9uZSBjYW4gbGVhcm4gdG8gZG8gYW55dGhpbmcgYnkgR29vZ2xpbmcgaXQgbG9uZyBlbm91Z2guXCIsXG4gICAgICBcIkFsc28sIG15IGZyaWVuZHMgdGhpbmsgSVxcJ20gYSBwcmV0dHkgY29vbCBndXkgKGV2ZW4gdGhvdWdoIHRoZXlcXCdsbCBkZW55IGl0IGFmdGVyIHJlYWRpbmcgdGhpcy4pXCJdXG4gIH07ICBcbn0pOyIsIihmdW5jdGlvbiAobmcpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuIFxuICB2YXIgYXBwID0gbmcubW9kdWxlKCduZ0xvYWRTY3JpcHQnLCBbXSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgnc2NyaXB0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikgXG4gICAgICB7XG4gICAgICAgIGlmIChhdHRyLnR5cGU9PT0ndGV4dC9qYXZhc2NyaXB0LWxhenknKSBcbiAgICAgICAge1xuICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICB2YXIgc3JjID0gZWxlbS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICBpZihzcmMhPT11bmRlZmluZWQpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlbGVtLnRleHQoKTtcbiAgICAgICAgICAgICAgcy50ZXh0ID0gY29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gXG59KGFuZ3VsYXIpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=