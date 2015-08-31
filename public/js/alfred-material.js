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

app.controller('ProjectsCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog) {

  $scope.allProjects = {
    'mdSite': {
      "name": "Alfred Material",
      "screenshot": '/imgs/projects/anotherrotated4.jpg', //_MG_2891.CR2 and anotherrotated
      "description": '',
      "repository": 'https://github.com/alfred/material-website',
      "demoLink": 'http://alfredabab.io',
      "tech": [],
      "learned": ''
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
      "learned": ''
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
  
  function useDarkOverlay(project) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnLCAnbmdTYW5pdGl6ZSddKTtcclxuXHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdibHVlLWdyZXknKSAvLyBibHVlLWdyZXksIHRlYWxcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxuXHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjb2RlJylcclxuICAucHJpbWFyeVBhbGV0dGUoJ3RlYWwnKVxyXG4gIC5hY2NlbnRQYWxldHRlKCdwaW5rJyk7XHJcblxyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29taWNzJylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2xpbWUnKVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG5cclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuYWx3YXlzV2F0Y2hUaGVtZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnLFxyXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxyXG4gICAgICBpY29uQ29sb3I6ICcjNjA3RDhCJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZScsXHJcbiAgICAgIHRoZW1lOiAnY29kZScsXHJcbiAgICAgIGljb25Db2xvcjogJyMwMDk2ODgnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb21pY3MnLFxyXG4gICAgICB0aGVtZTogJ2NvbWljcycsXHJcbiAgICAgIGljb25Db2xvcjogJyNDRERDMzknXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9yZXN1bWUnLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9Jy9yZXN1bWUucGRmJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC53aGVuKCcvb2xkJywge1xyXG4gICAgICByZWRpcmVjdFRvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL29sZCc7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAud2hlbignL21lYW4nLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9Jy9tZWFuJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyXHJcbiAgICAuaWNvbignZGVtbycsICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycpXHJcbiAgICAuaWNvbignZ2l0aHViJywgJ2ljb25zL2dpdGh1Yi5zdmcnKVxyXG4gICAgLmljb24oJ2NvbWljJywgJ2ljb25zL2Rhc2hib2FyZC5zdmcnKVxyXG4gICAgLmljb24oJ2NvZGUnLCAnaWNvbnMvY29kZS5zdmcnKVxyXG4gICAgLmljb24oJ3Jlc3VtZScsICdpY29ucy9kZXNjcmlwdGlvbi5zdmcnKVxyXG4gICAgLmljb24oJ2hvbWUnLCAnaWNvbnMvaG9tZS5zdmcnKVxyXG4gICAgLmljb24oJ2luZm8nLCAnaWNvbnMvaW5mby5zdmcnKTtcclxufSk7XHJcblxyXG5hcHAucnVuKGZ1bmN0aW9uKCRodHRwLCAkdGVtcGxhdGVDYWNoZSkge1xyXG4gIHZhciBpY29uVXJscyA9IFtcclxuICAgICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycsXHJcbiAgICAnaWNvbnMvZ2l0aHViLnN2ZycsXHJcbiAgICAnaWNvbnMvZGFzaGJvYXJkLnN2ZycsXHJcbiAgICAnaWNvbnMvY29kZS5zdmcnLFxyXG4gICAgJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycsXHJcbiAgICAnaWNvbnMvaG9tZS5zdmcnLFxyXG4gICAgJ2ljb25zL2luZm8uc3ZnJ1xyXG4gIF07XHJcblxyXG4gIGFuZ3VsYXIuZm9yRWFjaChpY29uVXJscywgZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkaHR0cC5nZXQodXJsLCB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRsb2NhdGlvbikge1xyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnRoZW1lID0gZGF0YS50aGVtZTtcclxuICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkbWRTaWRlbmF2LCAkbG9nKSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnBhZ2VUaXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgICAkc2NvcGUuaWNvbkNvbG9yID0gZGF0YS5pY29uQ29sb3I7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICdob21lJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJ2NvZGUnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0NvbWljcycsXHJcbiAgICB1cmw6ICcvY29taWNzJyxcclxuICAgIGljb246ICdjb21pYydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJ3Jlc3VtZSdcclxuICB9XTtcclxuICBcclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGxvY2F0aW9uLnBhdGgodXJsKTtcclxuICB9O1xyXG59KTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZERpYWxvZykge1xuXG4gICRzY29wZS5hbGxQcm9qZWN0cyA9IHtcbiAgICAnbWRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQWxmcmVkIE1hdGVyaWFsXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL2Fub3RoZXJyb3RhdGVkNC5qcGcnLCAvL19NR18yODkxLkNSMiBhbmQgYW5vdGhlcnJvdGF0ZWRcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9lZi5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiBbJ1R1cmJvVGF4IEV4ZW1wdGlvbiBDaGVjayBpcyBhIHRvb2wgZm9yIGN1c3RvbWVycyB0byBmaW5kIG91dCB3aGV0aGVyIHRoZXkgYXJlIGV4ZW1wdCBmcm9tIHRoZSBoZWFsdGhjYXJlIHBlbmFsdHkgZm9yIHRoYXQgdGF4IHllYXIuICcgKyBcbiAgICAgICAgICAgICAgICAnV2hpbGUgd29ya2luZyBvbiBFeGVtcHRpb24gQ2hlY2ssIEkgd2FzIGFuIGVuZ2luZWVyIHJlc3BvbnNpYmxlIGZvciBpbXBsZW1lbnRpbmcgY3Jvc3MtZGV2aWNlIGRhdGEgcGVyc2lzdGVuY2UuICcgKyBcbiAgICAgICAgICAgICAgICAnVGhpcyBhbGxvd2VkIGN1c3RvbWVycyB0byBzdGFydCB0aGUgYXBwbGljYXRpb24gb24gb25lIGRldmljZSBhbmQgc2lnbiBvdXQsIGFuZCB0aGVuIHNpZ24gYmFjayBpbiBvbiBhIHNlY29uZCBkZXZpY2UnICsgXG4gICAgICAgICAgICAgICAgJ2FuZCBjb21wbGV0ZSB0aGVpciBhcHBsaWNhdGlvbiB3aGVyZSB0aGV5IGxlZnQgb2ZmLicsXG4gICAgICAgICAgICAgICAnSSB3YXMgYWxzbyBwYXJ0IG9mIHRoZSBzbWFsbCB0ZWFtIHRoYXQgd2FzIHRhc2tlZCB3aXRoIGEgbWFzc2l2ZSByZXdyaXRlIG9mIHRoZSB0b29sIG9uY2UgdGhlIEFmZm9yZGFibGUgQ2FyZSBBY3QgJyArIFxuICAgICAgICAgICAgICAgICdsYXcgY2hhbmdlZCB0byBhbGxvdyBvbmUgZm9ybSBwZXIgaG91c2Vob2xkIGluc3RlYWQgb2Ygb25lIGZvcm0gcGVyIG1lbWJlciBvZiB0aGUgaG91c2Vob2xkLiBUaGlzIHJlcXVpcmVkIHJhcGlkICcgKyBcbiAgICAgICAgICAgICAgICAnaW1wbGVtZW50YXRpb24gb2YgZmVhdHVyZXMgYW5kIGFsc28gcmVxdWlyZWQgdGhhdCB3ZSBkaWRu4oCZdCBicmVhayB0aGUgY29yZSBmdW5jdGlvbmFsaXR5IGFzIHRoYXQgd2FzIHN0aWxsIHRoZSBwcmltYXJ5IHVzZS1jYXNlLicsIFxuICAgICAgICAgICAgICAgJ0kgd2FzIGEgZnVsbC1zdGFjayBlbmdpbmVlciwgYXMgSSB3b3JrZWQgd2l0aCB0aGUgYmFja2VuZCBzZXJ2aWNlcyBhcyBtdWNoIGFzIEkgd2FzIGRvaW5nIENTUyB0d2Vha3Mgb24gdGhlIGZyb250ZW5kIHdoaWNoJyArIFxuICAgICAgICAgICAgICAgJyByZXF1aXJlZCBjb21wcmVoZW5zaXZlIHVuaXQgdGVzdHMgZm9yIGJvdGguIER1cmluZyBwZWFrIHRpbWVzIEkgd2FzIGFsc28gcmVzcG9uc2libGUgZm9yIG1vbml0b3Jpbmcgb3VyIFNwbHVuayBsb2dzIGZvciBzZXJ2aWNlIG91dHRhZ2VzIGFuZCBlcnJvcnMuJ10sXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwczovL3R1cmJvdGF4LmludHVpdC5jb20vaGVhbHRoLWNhcmUvZXhlbXB0aW9ucycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdvbGRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiT2xkIFdlYnNpdGVcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvb2xkLXMucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICcvb2xkJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLW9yYW5nZS1weXJhbWlkcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJy9tZWFuJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ21vZGVyYXRvcic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNlbmdhZ2UgTW9kZXJhdG9yXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLXRlYWwtdHJpLmpwZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJpbmZvXCI6IFsnV2hpbGUgd29ya2luZyBvbiBDZW5nYWdlIE1vZGVyYXRvciwgSSB3YXMgb24gYSBzbWFsbCB0ZWFtIG9mIGVuZ2luZWVycyB3aG8gaGFkIGEgbG90IG9mIGZyZWVkb20gb3ZlciB0aGUgYXJjaGl0ZWN0dXJlICcgKyBcbiAgICAgICAgICAgICAgICAnYW5kIHRlY2hub2xvZ3kgdXNlZCB0byBjcmVhdGUgYSBxdWVzdGlvbiBhbmQgYW5zd2VyIGFwcGxpY2F0aW9uIGZvciB0aGUgY29tcGFueSB0byB1c2UgdG8gYXNrIHF1ZXN0aW9ucyBvZiB0aGUgQ1RPIGR1cmluZyBoaXMgb2ZmaWNlIGhvdXJzLicsIFxuICAgICAgICAgICAgICAgICdJIHdhcyByZXNwb25zaWJsZSBmb3IgYXJjaGl0ZWN0aW5nIHRoZSB1c2VyIG1vZGVsLiBUaGlzIG1lYW5zIHRoYXQgSSBpbXBsZW1lbnRlZCB1c2VyIGFjY291bnQgY3JlYXRpb24sIHVzZXIgc2Vzc2lvbnMgYW5kICcgKyBcbiAgICAgICAgICAgICAgICAnYWNjb3VudCByZWNvdmVyeS4gQWxsIG9mIG15IHNvbHV0aW9ucyB3ZXJlIGNyZWF0ZWQgaW4taG91c2UgYXMgdGhlIHBvcHVsYXIgUnVieSBnZW0sIOKAnGRldmlzZeKAnSB3YXMgdG9vIGhlYXZ5IGZvciB0aGUgc2ltcGxpY2l0eSBvZiB0aGUgcHJvamVjdC4gJyArIFxuICAgICAgICAgICAgICAgICdBIGxvbmcgd2l0aCB1c2VyIGFjY291bnRzLCBJIGFsc28gaW1wbGVtZW50ZWQgdXNlciBwcm9maWxlcyBhbmQgYWNjZXNzIGxldmVscyBmb3Igcm9sZXMuICcsXG4gICAgICAgICAgICAgICAgJ0R1ZSB0byB0aGUgbmF0dXJlIG9mIHRoZSBhcHBsaWNhdGlvbiwgd2UgaGFkIG1hbnkgbmVzdGVkIGRhdGEtbW9kZWxzIGFuZCBteSB0ZWFtIGhhZCB0byB0ZWFjaCAnICsgXG4gICAgICAgICAgICAgICAgJ291cnNlbHZlcyByZWxhdGlvbmFsIGRhdGEgbW9kZWxzLiBGb3IgZXhhbXBsZSwgd2UgdXNlZCBtYW55LXRvLW1hbnkgZm9yIHVzZXJzIGZhdm9yaXRpbmcgYW5kIHZvdGluZyAnICsgXG4gICAgICAgICAgICAgICAgJ29uIHF1ZXN0aW9ucywgc28gdGhhdCBhIHVzZXIgY291bGQgYnJvd3NlIHRoZWlyIGZhdm9yaXRlIHF1ZXN0aW9ucy4gSSBhbHNvIHNldCB1cCBhdXRvbWF0ZWQgdW5pdCBhbmQgJyArIFxuICAgICAgICAgICAgICAgICdpbnRlZ3JhdGlvbiB0ZXN0aW5nIHN1aXRlcyBhbmQgd3JvdGUgc29tZSBvZiB0aGUgZnJvbnRlbmQgaW50ZXJhY3Rpb25zLiddLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL21vZGVyYXRvci5jZW5nYWdlLmNvbScsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1ncmV5LWNpcmNsZS5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZC5naXRodWIuaW8vY3NzLWxvZ29zLycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLm9wZW5Qcm9qZWN0SW5mbyA9IGZ1bmN0aW9uKGV2LCBuYW1lKSB7XG4gICAgdmFyIGJvZHlFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpO1xuICAgIHZhciB0aGlzUHJvamVjdCA9ICRzY29wZS5hbGxQcm9qZWN0c1tuYW1lXTtcbiAgICB2YXIgZGlhbG9nQ29udGVudCA9ICRtZERpYWxvZy5hbGVydCh7XG4gICAgICBwYXJlbnQ6IGJvZHlFbGVtZW50LFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgdGVtcGxhdGU6XG4gICAgICAgICAgICAnPG1kLWRpYWxvZz4nICtcbiAgICAgICAgICAgICcgIDxtZC10b29sYmFyPicgKyBcbiAgICAgICAgICAgICcgICA8ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29sc1wiPicgK1xuICAgICAgICAgICAgJyAgICAgPGgyPnt7cHJvamVjdC5uYW1lfX08L2gyPicgK1xuICAgICAgICAgICAgJyAgIDwvZGl2PicgK1xuICAgICAgICAgICAgJyAgPC9tZC10b29sYmFyPicgK1xuICAgICAgICAgICAgJyAgPG1kLWRpYWxvZy1jb250ZW50PicrXG4gICAgICAgICAgICAnICAgIDxwIGNsYXNzPVwiaW50ZW50LXBcIiBuZy1yZXBlYXQ9XCJwIGluIHByb2plY3QuaW5mb1wiPnt7cH19PC9wPicgK1xuICAgICAgICAgICAgJyAgPC9tZC1kaWFsb2ctY29udGVudD4nICtcbiAgICAgICAgICAgICcgIDxkaXYgY2xhc3M9XCJtZC1hY3Rpb25zXCI+JyArXG4gICAgICAgICAgICAnICAgIDxtZC1idXR0b24gbmctY2xpY2s9XCJjbG9zZVByb2plY3RJbmZvKClcIiBjbGFzcz1cIm1kLXByaW1hcnlcIj4nICtcbiAgICAgICAgICAgICcgICAgICBJbXByZXNzaXZlIScgK1xuICAgICAgICAgICAgJyAgICA8L21kLWJ1dHRvbj4nICtcbiAgICAgICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAgICAgJzwvbWQtZGlhbG9nPicsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgZXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgIGxvY2FsczogIHtcbiAgICAgICAgcHJvamVjdCA6IHRoaXNQcm9qZWN0XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gRGlhbG9nQ29udHJvbGxlcigkc2NvcGUsICRtZERpYWxvZywgcHJvamVjdCkge1xuICAgICAgICAkc2NvcGUucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgICRzY29wZS5jbG9zZVByb2plY3RJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRtZERpYWxvZy5zaG93KGRpYWxvZ0NvbnRlbnQpLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAgICB9KTtcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIHVzZURhcmtPdmVybGF5KHByb2plY3QpIHtcblxuICB9O1xufSk7XG5hcHAuZGlyZWN0aXZlKCdwcm9qSW1nJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKXtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3Byb2pJbWcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdmFsdWUgKycpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTsiLCJhcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzY2UpIHtcbiAgJHNjb3BlLmhvYmJpZXMgPSBbe1xuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcbiAgICBkZXNjOiBbXCJJIGxlYXJuZWQgdG8gcmlkZSBhYm91dCBhIHllYXIgYWdvLCBhbmQgbGVhcm5pbmcgbWlnaHQgaGF2ZSBiZWVuIG9uZSBvZiB0aGVcIiArXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBldmVyIGRvbmUuIEl0XFwncyBhIHJlYWxseSBmdW4gd2F5IHRvIGdldFwiICtcbiAgICAgICAgICBcIiBhcm91bmQgYW5kIGFuIGV2ZW4gYmV0dGVyIHdheSB0byBzdGF5IGFjdGl2ZS5cIixcbiAgICAgICAgICBcIiBJIGV2ZW4gbWFuYWdlZCB0byBkZXNpZ24gYSBkZWNhbCBhbmQgcGFpbnQgaXQgb250byBteSBib2FyZCFcIl1cbiAgfSx7XG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzIGludG8gYnVpbGRpbmcgYSBtdWx0aXZlcnNlLlwiLFxuICAgICAgICAgIFwiVGhlcmUgYXJlIHNvIG1hbnkgbW92aW5nIHBhcnRzIHRvIGZhY3RvciBpbiBhbmQgaXRcXCdzIGFtYXppbmcgdG8gc2VlIGhvdyBcIiArIFxuICAgICAgICAgIFwiIGF1dGhvcnMgY2FuIGNvbnRpbnVlIHRvIGlubm92YXRlIHRoZSBjaGFyYWN0ZXJzIGFuZCBwcmVzZW50IHRoZWlyIGZhbnMgd2l0aCBuZXcgdG9waWNzIHRvIHRoaW5rIGFib3V0IGV2ZXJ5IGlzc3VlLlwiXSxcbiAgICBsaW5rOiBcIiNjb21pY3NcIlxuICB9LHtcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxuICAgIGRlc2M6ICRzY2UudHJ1c3RBc0h0bWwoXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3BlciB3aG8gaGFwcGVucyB0byB3cml0ZSBsb3RzIG9mIEphdmFzY3JpcHQuIDwvcD5cIiArXG4gICAgICAgICAgXCI8cD5JIHN0YXJ0ZWQgb2ZmIGJ1aWxkaW5nIGFwcHMgd2l0aCBSdWJ5IG9uIFJhaWxzIGFuZCBoYXZlIG1vdmVkIG9uIHRvXCIgK1xuICAgICAgICAgIFwiIE5vZGUgYW5kIEV4cHJlc3MuIFdoYXQgeW91XFwncmUgbG9va2luZyBhdCByaWdodCBub3cgd2FzIGFjdHVhbGx5IGJ1aWx0IHdpdGggXCIgK1xuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIDxhIHN0eWxlPVxcXCJ0ZXh0LWRlY29yYXRpb246bm9uZVxcXCIgaHJlZj1cXFwiL2NvZGVcXFwiPmhlcmU8L2E+XCIpLFxuICAgIGxpbms6IFwiXCJcbiAgfV07XG5cbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XG4gICAgaWQ6ICdidG4tdHdpdHRlcicsXG4gICAgbGFiZWw6ICdUV0lUVEVSJyxcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1naXRodWInLFxuICAgIGxhYmVsOiAnR0lUSFVCJyxcbiAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxuICAgIGxhYmVsOiAnTElOS0VESU4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbGZyZWRhYmFiaW8vZW4nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1lbWFpbCcsXG4gICAgbGFiZWw6ICdFTUFJTCcsXG4gICAgdXJsOiAnbWFpbHRvOmFhYmFiaW83NUBnbWFpbC5jb20nXG4gIH1dO1xuXG4gICRzY29wZS5hYm91dFRleHQgPSB7ICAgICAgICAgIFxuICAgIGludHJvOiBcIkhpLCBJXFwnbSBBbGZyZWQuXCIsICAgICBcbiAgICBib2R5OiBbXG4gICAgICBcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXG4gICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IEdvb2dsaW5nIGl0IGxvbmcgZW5vdWdoLlwiLFxuICAgICAgXCJBbHNvLCBteSBmcmllbmRzIHRoaW5rIElcXCdtIGEgcHJldHR5IGNvb2wgZ3V5IChldmVuIHRob3VnaCB0aGV5XFwnbGwgZGVueSBpdCBhZnRlciByZWFkaW5nIHRoaXMuKVwiXVxuICB9OyAgXG59KTsiLCIoZnVuY3Rpb24gKG5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiBcbiAgdmFyIGFwcCA9IG5nLm1vZHVsZSgnbmdMb2FkU2NyaXB0JywgW10pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3NjcmlwdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIFxuICAgICAge1xuICAgICAgICBpZiAoYXR0ci50eXBlPT09J3RleHQvamF2YXNjcmlwdC1sYXp5JykgXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdmFyIHNyYyA9IGVsZW0uYXR0cignc3JjJyk7XG4gICAgICAgICAgaWYoc3JjIT09dW5kZWZpbmVkKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgIHMudGV4dCA9IGNvZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuIFxufShhbmd1bGFyKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9