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
    $location.path(url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvYWxmcmVkLW1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FsZnJlZE1hdGVyaWFsJywgWyduZ01hdGVyaWFsJywgJ25nUm91dGUnLCAnbmdMb2FkU2NyaXB0JywgJ25nU2FuaXRpemUnXSk7XHJcblxyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnZGVlcC1wdXJwbGUnLCB7XHJcbiAgICAnZGVmYXVsdCc6ICc0MDAnXHJcbiAgfSlcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxuXHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjb2RlJylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2N5YW4nLCB7XHJcbiAgICAnZGVmYXVsdCcgOic3MDAnXHJcbiAgfSlcclxuICAuYWNjZW50UGFsZXR0ZSgncGluaycpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2NvbWljcycpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdyZWQnLCB7XHJcbiAgICAnZGVmYXVsdCc6ICc2MDAnXHJcbiAgfSlcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxuXHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLmFsd2F5c1dhdGNoVGhlbWUodHJ1ZSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICR3aW5kb3cpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2hvbWUvaG9tZS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdIb21lJyxcclxuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcclxuICAgICAgaWNvbkNvbG9yOiAnIzdFNTdDMidcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvZGUnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3Byb2plY3RzL3Byb2plY3RzLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvZGUnLFxyXG4gICAgICB0aGVtZTogJ2NvZGUnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjMDA5N0E3J1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29taWNzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9saWJyYXJ5L2xpYnJhcnkuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnTGlicmFyeScsXHJcbiAgICAgIHRoZW1lOiAnY29taWNzJyxcclxuICAgICAgaWNvbkNvbG9yOiAnI0U1MzkzNSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL3Jlc3VtZScsIHtcclxuICAgICAgcmVkaXJlY3RUbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0nL3Jlc3VtZSc7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAud2hlbignL29sZCcsIHtcclxuICAgICAgcmVkaXJlY3RUbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9vbGQnO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9tZWFuJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPScvbWVhbic7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZEljb25Qcm92aWRlcikge1xyXG4gICRtZEljb25Qcm92aWRlclxyXG4gICAgLmljb24oJ2RlbW8nLCAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnKVxyXG4gICAgLmljb24oJ2dpdGh1YicsICdpY29ucy9naXRodWIuc3ZnJylcclxuICAgIC5pY29uKCdjb21pYycsICdpY29ucy9kYXNoYm9hcmQuc3ZnJylcclxuICAgIC5pY29uKCdjb2RlJywgJ2ljb25zL2NvZGUuc3ZnJylcclxuICAgIC5pY29uKCdyZXN1bWUnLCAnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJylcclxuICAgIC5pY29uKCdob21lJywgJ2ljb25zL2hvbWUuc3ZnJylcclxuICAgIC5pY29uKCdpbmZvJywgJ2ljb25zL2luZm8uc3ZnJyk7XHJcbn0pO1xyXG5cclxuYXBwLnJ1bihmdW5jdGlvbigkaHR0cCwgJHRlbXBsYXRlQ2FjaGUpIHtcclxuICB2YXIgaWNvblVybHMgPSBbXHJcbiAgICAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnLFxyXG4gICAgJ2ljb25zL2dpdGh1Yi5zdmcnLFxyXG4gICAgJ2ljb25zL2Rhc2hib2FyZC5zdmcnLFxyXG4gICAgJ2ljb25zL2NvZGUuc3ZnJyxcclxuICAgICdpY29ucy9kZXNjcmlwdGlvbi5zdmcnLFxyXG4gICAgJ2ljb25zL2hvbWUuc3ZnJyxcclxuICAgICdpY29ucy9pbmZvLnN2ZydcclxuICBdO1xyXG5cclxuICBhbmd1bGFyLmZvckVhY2goaWNvblVybHMsIGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGh0dHAuZ2V0KHVybCwge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbG9jYXRpb24pIHtcclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS50aGVtZSA9IGRhdGEudGhlbWU7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgJG1kU2lkZW5hdiwgJGxvZykge1xyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS5wYWdlVGl0bGUgPSBkYXRhLnRpdGxlO1xyXG4gICAgJHNjb3BlLmljb25Db2xvciA9IGRhdGEuaWNvbkNvbG9yO1xyXG4gIH0pO1xyXG5cclxuICAkc2NvcGUubmF2TGlua3MgPSBbe1xyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgdXJsOiAnLycsXHJcbiAgICBpY29uOiAnaG9tZSdcclxuICB9LHtcclxuICAgIG5hbWU6ICdDb2RlJyxcclxuICAgIHVybDogJy9jb2RlJyxcclxuICAgIGljb246ICdjb2RlJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdMaWJyYXJ5JyxcclxuICAgIHVybDogJy9jb21pY3MnLFxyXG4gICAgaWNvbjogJ2NvbWljJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdSZXN1bWUnLFxyXG4gICAgdXJsOiAnL3Jlc3VtZScsXHJcbiAgICBpY29uOiAncmVzdW1lJ1xyXG4gIH1dO1xyXG4gIFxyXG4gICRzY29wZS50b2dnbGVTaWRlTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJG1kU2lkZW5hdignc2lkZU5hdicpLnRvZ2dsZSgpXHJcbiAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJG1kU2lkZW5hdignc2lkZU5hdicpLmlzT3BlbigpKSB7XHJcbiAgICAgICAgdmFyIGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21kLXNpZGVuYXYtYmFja2Ryb3AnKTtcclxuICAgICAgICBpZihiYWNrZHJvcEVsZW1lbnQpIHtcclxuICAgICAgICAgIGJhY2tkcm9wRWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbmltYXRlVG9NZW51KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkbG9jYXRpb24ucGF0aCh1cmwpO1xyXG4gIH07XHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignUHJvamVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kRGlhbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtc2l0ZS1jb3Zlci5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tYXRlcmlhbC13ZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWRhYmFiLmlvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJyxcbiAgICAgIFwiZGFya092ZXJsYXlcIjogdHJ1ZVxuICAgIH0sXG4gICAgJ2VmJzoge1xuICAgICAgXCJuYW1lXCI6IFwiRXhlbXB0aW9uIENoZWNrXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL2VmLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJpbmZvXCI6IFsnVHVyYm9UYXggRXhlbXB0aW9uIENoZWNrIGlzIGEgdG9vbCBmb3IgY3VzdG9tZXJzIHRvIGZpbmQgb3V0IHdoZXRoZXIgdGhleSBhcmUgZXhlbXB0IGZyb20gdGhlIGhlYWx0aGNhcmUgcGVuYWx0eSBmb3IgdGhhdCB0YXggeWVhci4gJyArIFxuICAgICAgICAgICAgICAgICdXaGlsZSB3b3JraW5nIG9uIEV4ZW1wdGlvbiBDaGVjaywgSSB3YXMgYW4gZW5naW5lZXIgcmVzcG9uc2libGUgZm9yIGltcGxlbWVudGluZyBjcm9zcy1kZXZpY2UgZGF0YSBwZXJzaXN0ZW5jZS4gJyArIFxuICAgICAgICAgICAgICAgICdUaGlzIGFsbG93ZWQgY3VzdG9tZXJzIHRvIHN0YXJ0IHRoZSBhcHBsaWNhdGlvbiBvbiBvbmUgZGV2aWNlIGFuZCBzaWduIG91dCwgYW5kIHRoZW4gc2lnbiBiYWNrIGluIG9uIGEgc2Vjb25kIGRldmljZScgKyBcbiAgICAgICAgICAgICAgICAnYW5kIGNvbXBsZXRlIHRoZWlyIGFwcGxpY2F0aW9uIHdoZXJlIHRoZXkgbGVmdCBvZmYuJyxcbiAgICAgICAgICAgICAgICdJIHdhcyBhbHNvIHBhcnQgb2YgdGhlIHNtYWxsIHRlYW0gdGhhdCB3YXMgdGFza2VkIHdpdGggYSBtYXNzaXZlIHJld3JpdGUgb2YgdGhlIHRvb2wgb25jZSB0aGUgQWZmb3JkYWJsZSBDYXJlIEFjdCAnICsgXG4gICAgICAgICAgICAgICAgJ2xhdyBjaGFuZ2VkIHRvIGFsbG93IG9uZSBmb3JtIHBlciBob3VzZWhvbGQgaW5zdGVhZCBvZiBvbmUgZm9ybSBwZXIgbWVtYmVyIG9mIHRoZSBob3VzZWhvbGQuIFRoaXMgcmVxdWlyZWQgcmFwaWQgJyArIFxuICAgICAgICAgICAgICAgICdpbXBsZW1lbnRhdGlvbiBvZiBmZWF0dXJlcyBhbmQgYWxzbyByZXF1aXJlZCB0aGF0IHdlIGRpZG7igJl0IGJyZWFrIHRoZSBjb3JlIGZ1bmN0aW9uYWxpdHkgYXMgdGhhdCB3YXMgc3RpbGwgdGhlIHByaW1hcnkgdXNlLWNhc2UuJywgXG4gICAgICAgICAgICAgICAnSSB3YXMgYSBmdWxsLXN0YWNrIGVuZ2luZWVyLCBhcyBJIHdvcmtlZCB3aXRoIHRoZSBiYWNrZW5kIHNlcnZpY2VzIGFzIG11Y2ggYXMgSSB3YXMgZG9pbmcgQ1NTIHR3ZWFrcyBvbiB0aGUgZnJvbnRlbmQgd2hpY2gnICsgXG4gICAgICAgICAgICAgICAnIHJlcXVpcmVkIGNvbXByZWhlbnNpdmUgdW5pdCB0ZXN0cyBmb3IgYm90aC4gRHVyaW5nIHBlYWsgdGltZXMgSSB3YXMgYWxzbyByZXNwb25zaWJsZSBmb3IgbW9uaXRvcmluZyBvdXIgU3BsdW5rIGxvZ3MgZm9yIHNlcnZpY2Ugb3V0dGFnZXMgYW5kIGVycm9ycy4nXSxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJyxcbiAgICAgIFwiZGFya092ZXJsYXlcIjogdHJ1ZVxuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9vbGQtcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJy9vbGQnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnXG4gICAgfSxcbiAgICAnbWVhbic6IHtcbiAgICAgIFwibmFtZVwiOiBcIk1FQU4gU2tlbGV0b25cIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtb3JhbmdlLXB5cmFtaWRzLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21lYW4tc2tlbGV0b24nLFxuICAgICAgXCJkZW1vTGlua1wiOiAnL21lYW4nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnbW9kZXJhdG9yJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ2VuZ2FnZSBNb2RlcmF0b3JcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtdGVhbC10cmkuanBnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImluZm9cIjogWydXaGlsZSB3b3JraW5nIG9uIENlbmdhZ2UgTW9kZXJhdG9yLCBJIHdhcyBvbiBhIHNtYWxsIHRlYW0gb2YgZW5naW5lZXJzIHdobyBoYWQgYSBsb3Qgb2YgZnJlZWRvbSBvdmVyIHRoZSBhcmNoaXRlY3R1cmUgJyArIFxuICAgICAgICAgICAgICAgICdhbmQgdGVjaG5vbG9neSB1c2VkIHRvIGNyZWF0ZSBhIHF1ZXN0aW9uIGFuZCBhbnN3ZXIgYXBwbGljYXRpb24gZm9yIHRoZSBjb21wYW55IHRvIHVzZSB0byBhc2sgcXVlc3Rpb25zIG9mIHRoZSBDVE8gZHVyaW5nIGhpcyBvZmZpY2UgaG91cnMuJywgXG4gICAgICAgICAgICAgICAgJ0kgd2FzIHJlc3BvbnNpYmxlIGZvciBhcmNoaXRlY3RpbmcgdGhlIHVzZXIgbW9kZWwuIFRoaXMgbWVhbnMgdGhhdCBJIGltcGxlbWVudGVkIHVzZXIgYWNjb3VudCBjcmVhdGlvbiwgdXNlciBzZXNzaW9ucyBhbmQgJyArIFxuICAgICAgICAgICAgICAgICdhY2NvdW50IHJlY292ZXJ5LiBBbGwgb2YgbXkgc29sdXRpb25zIHdlcmUgY3JlYXRlZCBpbi1ob3VzZSBhcyB0aGUgcG9wdWxhciBSdWJ5IGdlbSwg4oCcZGV2aXNl4oCdIHdhcyB0b28gaGVhdnkgZm9yIHRoZSBzaW1wbGljaXR5IG9mIHRoZSBwcm9qZWN0LiAnICsgXG4gICAgICAgICAgICAgICAgJ0EgbG9uZyB3aXRoIHVzZXIgYWNjb3VudHMsIEkgYWxzbyBpbXBsZW1lbnRlZCB1c2VyIHByb2ZpbGVzIGFuZCBhY2Nlc3MgbGV2ZWxzIGZvciByb2xlcy4gJyxcbiAgICAgICAgICAgICAgICAnRHVlIHRvIHRoZSBuYXR1cmUgb2YgdGhlIGFwcGxpY2F0aW9uLCB3ZSBoYWQgbWFueSBuZXN0ZWQgZGF0YS1tb2RlbHMgYW5kIG15IHRlYW0gaGFkIHRvIHRlYWNoICcgKyBcbiAgICAgICAgICAgICAgICAnb3Vyc2VsdmVzIHJlbGF0aW9uYWwgZGF0YSBtb2RlbHMuIEZvciBleGFtcGxlLCB3ZSB1c2VkIG1hbnktdG8tbWFueSBmb3IgdXNlcnMgZmF2b3JpdGluZyBhbmQgdm90aW5nICcgKyBcbiAgICAgICAgICAgICAgICAnb24gcXVlc3Rpb25zLCBzbyB0aGF0IGEgdXNlciBjb3VsZCBicm93c2UgdGhlaXIgZmF2b3JpdGUgcXVlc3Rpb25zLiBJIGFsc28gc2V0IHVwIGF1dG9tYXRlZCB1bml0IGFuZCAnICsgXG4gICAgICAgICAgICAgICAgJ2ludGVncmF0aW9uIHRlc3Rpbmcgc3VpdGVzIGFuZCB3cm90ZSBzb21lIG9mIHRoZSBmcm9udGVuZCBpbnRlcmFjdGlvbnMuJ10sXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vbW9kZXJhdG9yLmNlbmdhZ2UuY29tJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2Nzc0xvZ29zJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ1NTIExvZ29zXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLWdyZXktY2lyY2xlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL2Nzcy1sb2dvcycsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkLmdpdGh1Yi5pby9jc3MtbG9nb3MvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUub3BlblByb2plY3RJbmZvID0gZnVuY3Rpb24oZXYsIG5hbWUpIHtcbiAgICB2YXIgYm9keUVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSk7XG4gICAgdmFyIHRoaXNQcm9qZWN0ID0gJHNjb3BlLmFsbFByb2plY3RzW25hbWVdO1xuICAgIHZhciBkaWFsb2dDb250ZW50ID0gJG1kRGlhbG9nLmFsZXJ0KHtcbiAgICAgIHBhcmVudDogYm9keUVsZW1lbnQsXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICB0ZW1wbGF0ZTpcbiAgICAgICAgICAgICc8bWQtZGlhbG9nPicgK1xuICAgICAgICAgICAgJyAgPG1kLXRvb2xiYXI+JyArIFxuICAgICAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzXCI+JyArXG4gICAgICAgICAgICAnICAgICA8aDI+e3twcm9qZWN0Lm5hbWV9fTwvaDI+JyArXG4gICAgICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICAgICAnICA8L21kLXRvb2xiYXI+JyArXG4gICAgICAgICAgICAnICA8bWQtZGlhbG9nLWNvbnRlbnQ+JytcbiAgICAgICAgICAgICcgICAgPHAgY2xhc3M9XCJpbnRlbnQtcFwiIG5nLXJlcGVhdD1cInAgaW4gcHJvamVjdC5pbmZvXCI+e3twfX08L3A+JyArXG4gICAgICAgICAgICAnICA8L21kLWRpYWxvZy1jb250ZW50PicgK1xuICAgICAgICAgICAgJyAgPGRpdiBjbGFzcz1cIm1kLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICcgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cImNsb3NlUHJvamVjdEluZm8oKVwiIGNsYXNzPVwibWQtcHJpbWFyeVwiPicgK1xuICAgICAgICAgICAgJyAgICAgIEltcHJlc3NpdmUhJyArXG4gICAgICAgICAgICAnICAgIDwvbWQtYnV0dG9uPicgK1xuICAgICAgICAgICAgJyAgPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9tZC1kaWFsb2c+JyxcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICBlc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgbG9jYWxzOiAge1xuICAgICAgICBwcm9qZWN0IDogdGhpc1Byb2plY3RcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBEaWFsb2dDb250cm9sbGVyKCRzY29wZSwgJG1kRGlhbG9nLCBwcm9qZWN0KSB7XG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgJHNjb3BlLmNsb3NlUHJvamVjdEluZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbWREaWFsb2cuaGlkZSgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJG1kRGlhbG9nLnNob3coZGlhbG9nQ29udGVudCkudGhlbihmdW5jdGlvbigpIHtcblxuICAgIH0pO1xuICB9O1xuICBcbn0pO1xuYXBwLmRpcmVjdGl2ZSgncHJvakltZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCdwcm9qSW1nJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHZhbHVlICsnKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc2NlKSB7XG4gICRzY29wZS5ob2JiaWVzID0gW3tcbiAgICBuYW1lOiBcIkxvbmdib2FyZGVyXCIsXG4gICAgZGVzYzogW1wiSSBsZWFybmVkIHRvIHJpZGUgYWJvdXQgYSB5ZWFyIGFnbywgYW5kIGxlYXJuaW5nIG1pZ2h0IGhhdmUgYmVlbiBvbmUgb2YgdGhlXCIgK1xuICAgICAgICAgIFwiICBiZXN0IHRoaW5ncyBJXFwndmUgZXZlciBkb25lLiBJdFxcJ3MgYSByZWFsbHkgZnVuIHdheSB0byBnZXRcIiArXG4gICAgICAgICAgXCIgYXJvdW5kIGFuZCBhbiBldmVuIGJldHRlciB3YXkgdG8gc3RheSBhY3RpdmUuXCIsXG4gICAgICAgICAgXCIgSSBldmVuIG1hbmFnZWQgdG8gZGVzaWduIGEgZGVjYWwgYW5kIHBhaW50IGl0IG9udG8gbXkgYm9hcmQhXCJdXG4gIH0se1xuICAgIG5hbWU6IFwiQ29taWMgUmVhZGVyXCIsXG4gICAgZGVzYzogW1wiSVxcJ20gYSBodWdlIERDIGNvbWljcyBmYW4uIEkgY2FuIGFwcHJlY2lhdGUgdGhlIGFtb3VudCBvZiB3b3JrIHRoYXQgZ29lcyBpbnRvIGJ1aWxkaW5nIGEgbXVsdGl2ZXJzZS5cIixcbiAgICAgICAgICBcIlRoZXJlIGFyZSBzbyBtYW55IG1vdmluZyBwYXJ0cyB0byBmYWN0b3IgaW4gYW5kIGl0XFwncyBhbWF6aW5nIHRvIHNlZSBob3cgXCIgKyBcbiAgICAgICAgICBcIiBhdXRob3JzIGNhbiBjb250aW51ZSB0byBpbm5vdmF0ZSB0aGUgY2hhcmFjdGVycyBhbmQgcHJlc2VudCB0aGVpciBmYW5zIHdpdGggbmV3IHRvcGljcyB0byB0aGluayBhYm91dCBldmVyeSBpc3N1ZS5cIl0sXG4gICAgbGluazogXCIjY29taWNzXCJcbiAgfSx7XG4gICAgbmFtZTogXCJEZXZlbG9wZXJcIixcbiAgICBkZXNjOiAkc2NlLnRydXN0QXNIdG1sKFwiSVxcJ20gYSBmdWxsLXN0YWNrIHdlYiBkZXZlbG9wZXIgd2hvIGhhcHBlbnMgdG8gd3JpdGUgbG90cyBvZiBKYXZhc2NyaXB0LiA8L3A+XCIgK1xuICAgICAgICAgIFwiPHA+SSBzdGFydGVkIG9mZiBidWlsZGluZyBhcHBzIHdpdGggUnVieSBvbiBSYWlscyBhbmQgaGF2ZSBtb3ZlZCBvbiB0b1wiICtcbiAgICAgICAgICBcIiBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcbiAgICAgICAgICBcIk5vZGUgYW5kIEV4cHJlc3MsIGFuZCBhIGdlbmVyb3VzIGFtb3VudCBvZiBBbmd1bGFyLiBDaGVjayBvdXQgbXkgb3RoZXIgd29yayA8YSBzdHlsZT1cXFwidGV4dC1kZWNvcmF0aW9uOm5vbmVcXFwiIGhyZWY9XFxcIi9jb2RlXFxcIj5oZXJlPC9hPlwiKSxcbiAgICBsaW5rOiBcIlwiXG4gIH1dO1xuXG4gICRzY29wZS5jb250YWN0SW5mb3MgPSBbe1xuICAgIGlkOiAnYnRuLXR3aXR0ZXInLFxuICAgIGxhYmVsOiAnVFdJVFRFUicsXG4gICAgdXJsOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9hbGZyZWRhYmFiX2lvJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcbiAgICBsYWJlbDogJ0dJVEhVQicsXG4gICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZCdcbiAgfSwge1xuICAgIGlkOiAnYnRuLWxpbmtlZGluJyxcbiAgICBsYWJlbDogJ0xJTktFRElOJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZW1haWwnLFxuICAgIGxhYmVsOiAnRU1BSUwnLFxuICAgIHVybDogJ21haWx0bzphYWJhYmlvNzVAZ21haWwuY29tJ1xuICB9XTtcblxuICAkc2NvcGUuYWJvdXRUZXh0ID0geyAgICAgICAgICBcbiAgICBpbnRybzogXCJIaSwgSVxcJ20gQWxmcmVkLlwiLCAgICAgXG4gICAgYm9keTogW1xuICAgICAgXCJJXFwnbSBhIENvbXB1dGVyIFNjaWVuY2Ugc3R1ZGVudCBhdCBOb3J0aGVhc3Rlcm4sIGFuIGFtYXRldXIgcG9vbCAocG9ja2V0IGJpbGxpYXJkcykgcGxheWVyLCBcIiArIFxuICAgICAgXCJhbmQgYSBmaXJtIGJlbGlldmVyIHRoYXQgYW55b25lIGNhbiBsZWFybiB0byBkbyBhbnl0aGluZyBieSBHb29nbGluZyBpdCBsb25nIGVub3VnaC5cIixcbiAgICAgIFwiQWxzbywgbXkgZnJpZW5kcyB0aGluayBJXFwnbSBhIHByZXR0eSBjb29sIGd1eSAoZXZlbiB0aG91Z2ggdGhleVxcJ2xsIGRlbnkgaXQgYWZ0ZXIgcmVhZGluZyB0aGlzLilcIl1cbiAgfTsgIFxufSk7IiwiKGZ1bmN0aW9uIChuZykge1xuICAndXNlIHN0cmljdCc7XG4gXG4gIHZhciBhcHAgPSBuZy5tb2R1bGUoJ25nTG9hZFNjcmlwdCcsIFtdKTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JpcHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSBcbiAgICAgIHtcbiAgICAgICAgaWYgKGF0dHIudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQtbGF6eScpIFxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgIHMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHZhciBzcmMgPSBlbGVtLmF0dHIoJ3NyYycpO1xuICAgICAgICAgIGlmKHNyYyE9PXVuZGVmaW5lZClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY29kZSA9IGVsZW0udGV4dCgpO1xuICAgICAgICAgICAgICBzLnRleHQgPSBjb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiBcbn0oYW5ndWxhcikpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==