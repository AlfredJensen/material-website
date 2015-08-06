'use strict'

var app = angular.module('alfredMaterial', ['ngMaterial', 'ngRoute', 'ngLoadScript']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home/home.html',
      title: 'Home'
    })
    .when('/code', {
      templateUrl: '/views/projects/projects.html',
      title: 'Code'
    })
    .when('/comics', {
      templateUrl: '/views/library/library.html',
      title: 'Comics'
    })
    .when('/old', {
      redirectTo: function() {
        window.location = '/old';
      };
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

});

app.controller('NavCtrl', function($scope, $location, $mdSidenav, $log) {
  $scope.$on('$routeChangeSuccess', function (event, data) {
    $scope.pageTitle = data.title;
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
      "screenshot": 'md-teal-tri.jpg',
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
      "info": 'While working on Exemption Check, I was an engineer responsible for implementing cross-browser functionality that would save the customer\'s location in the application flow' + 
              ', retrieve that data and location on sign-in, and load the customer data back into the application. I also was part of the small team that was tasked with a massive rewrite of the' + 
              'app when the law changed to support multiple household members on the same exemption form.' ,
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
      "demoLink": '',
      "tech": [],
      "learned": ''
    },
    'moderator': {
      "name": "Cengage Moderator",
      "screenshot": '/imgs/projects/md-teal-tri.jpg',
      "description": '',
      "repository": '',
      "info": 'While working on Cengage Moderator, I implemented: \n\t User Account Creation/Confirmation \n\t User Authentication \n\t Account Recovery/Forgot Password?' + 
              '\n\t Favoriting and Voting on Questions \n\t User Profiles \n\t User Roles/Permissions with CanCan (Admins, Moderators, Users) \n\t Many Front-end UI features' + 
              '\n\n\t I also set up Automated Unit and Integration Testing Frameworks with rSpec \n\t',
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
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title($scope.allProjects[name]['name'])
        .content($scope.allProjects[name]['info'])
        .ariaLabel($scope.allProjects[name]['name'] + ' Info')
        .ok('Impressive!')
        .targetEvent(ev)
    );
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
app.controller('HomeCtrl', function($scope) {
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
    desc: ["I\'m a full-stack web developer who happens to write lots of Javascript. ",
          "I started off building apps with Ruby on Rails and have moved on to" +
          " Node and Express. What you\'re looking at right now was actually built with " +
          "Node and Express, and a generous amount of Angular. Check out my other work here"],
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
    url: ''
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvYWxmcmVkLW1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FsZnJlZE1hdGVyaWFsJywgWyduZ01hdGVyaWFsJywgJ25nUm91dGUnLCAnbmdMb2FkU2NyaXB0J10pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgLmFjY2VudFBhbGV0dGUoJ2FtYmVyJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgJHJvdXRlUHJvdmlkZXJcclxuICAgIC53aGVuKCcvJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9ob21lL2hvbWUuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnSG9tZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvZGUnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3Byb2plY3RzL3Byb2plY3RzLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvZGUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb21pY3MnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9vbGQnLCB7XHJcbiAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvb2xkJztcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZEljb25Qcm92aWRlcikge1xyXG4gICRtZEljb25Qcm92aWRlclxyXG4gICAgLmljb24oJ2RlbW8nLCAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnKVxyXG4gICAgLmljb24oJ2dpdGh1YicsICdpY29ucy9naXRodWIuc3ZnJylcclxuICAgIC5pY29uKCdjb21pYycsICdpY29ucy9kYXNoYm9hcmQuc3ZnJylcclxuICAgIC5pY29uKCdjb2RlJywnaWNvbnMvY29kZS5zdmcnKVxyXG4gICAgLmljb24oJ3Jlc3VtZScsJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycpXHJcbiAgICAuaWNvbignaG9tZScsJ2ljb25zL2hvbWUuc3ZnJylcclxuICAgIC5pY29uKCdpbmZvJywgJ2ljb25zL2luZm8uc3ZnJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRsb2NhdGlvbikge1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkbWRTaWRlbmF2LCAkbG9nKSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnBhZ2VUaXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICdob21lJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJ2NvZGUnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0NvbWljcycsXHJcbiAgICB1cmw6ICcvY29taWNzJyxcclxuICAgIGljb246ICdjb21pYydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJ3Jlc3VtZSdcclxuICB9XTtcclxuICBcclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGxvY2F0aW9uLnBhdGgodXJsKTtcclxuICB9O1xyXG59KTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZERpYWxvZykge1xuXG4gICRzY29wZS5hbGxQcm9qZWN0cyA9IHtcbiAgICAnbWRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQWxmcmVkIE1hdGVyaWFsXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJ21kLXRlYWwtdHJpLmpwZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21hdGVyaWFsLXdlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZGFiYWIuaW8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnZWYnOiB7XG4gICAgICBcIm5hbWVcIjogXCJFeGVtcHRpb24gQ2hlY2tcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvZWYucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImluZm9cIjogJ1doaWxlIHdvcmtpbmcgb24gRXhlbXB0aW9uIENoZWNrLCBJIHdhcyBhbiBlbmdpbmVlciByZXNwb25zaWJsZSBmb3IgaW1wbGVtZW50aW5nIGNyb3NzLWJyb3dzZXIgZnVuY3Rpb25hbGl0eSB0aGF0IHdvdWxkIHNhdmUgdGhlIGN1c3RvbWVyXFwncyBsb2NhdGlvbiBpbiB0aGUgYXBwbGljYXRpb24gZmxvdycgKyBcbiAgICAgICAgICAgICAgJywgcmV0cmlldmUgdGhhdCBkYXRhIGFuZCBsb2NhdGlvbiBvbiBzaWduLWluLCBhbmQgbG9hZCB0aGUgY3VzdG9tZXIgZGF0YSBiYWNrIGludG8gdGhlIGFwcGxpY2F0aW9uLiBJIGFsc28gd2FzIHBhcnQgb2YgdGhlIHNtYWxsIHRlYW0gdGhhdCB3YXMgdGFza2VkIHdpdGggYSBtYXNzaXZlIHJld3JpdGUgb2YgdGhlJyArIFxuICAgICAgICAgICAgICAnYXBwIHdoZW4gdGhlIGxhdyBjaGFuZ2VkIHRvIHN1cHBvcnQgbXVsdGlwbGUgaG91c2Vob2xkIG1lbWJlcnMgb24gdGhlIHNhbWUgZXhlbXB0aW9uIGZvcm0uJyAsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwczovL3R1cmJvdGF4LmludHVpdC5jb20vaGVhbHRoLWNhcmUvZXhlbXB0aW9ucycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdvbGRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiT2xkIFdlYnNpdGVcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvb2xkLXMucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICcvb2xkJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLW9yYW5nZS1weXJhbWlkcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiAnV2hpbGUgd29ya2luZyBvbiBDZW5nYWdlIE1vZGVyYXRvciwgSSBpbXBsZW1lbnRlZDogXFxuXFx0IFVzZXIgQWNjb3VudCBDcmVhdGlvbi9Db25maXJtYXRpb24gXFxuXFx0IFVzZXIgQXV0aGVudGljYXRpb24gXFxuXFx0IEFjY291bnQgUmVjb3ZlcnkvRm9yZ290IFBhc3N3b3JkPycgKyBcbiAgICAgICAgICAgICAgJ1xcblxcdCBGYXZvcml0aW5nIGFuZCBWb3Rpbmcgb24gUXVlc3Rpb25zIFxcblxcdCBVc2VyIFByb2ZpbGVzIFxcblxcdCBVc2VyIFJvbGVzL1Blcm1pc3Npb25zIHdpdGggQ2FuQ2FuIChBZG1pbnMsIE1vZGVyYXRvcnMsIFVzZXJzKSBcXG5cXHQgTWFueSBGcm9udC1lbmQgVUkgZmVhdHVyZXMnICsgXG4gICAgICAgICAgICAgICdcXG5cXG5cXHQgSSBhbHNvIHNldCB1cCBBdXRvbWF0ZWQgVW5pdCBhbmQgSW50ZWdyYXRpb24gVGVzdGluZyBGcmFtZXdvcmtzIHdpdGggclNwZWMgXFxuXFx0JyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9tb2RlcmF0b3IuY2VuZ2FnZS5jb20nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnY3NzTG9nb3MnOiB7XG4gICAgICBcIm5hbWVcIjogXCJDU1MgTG9nb3NcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtZ3JleS1jaXJjbGUucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvY3NzLWxvZ29zJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWQuZ2l0aHViLmlvL2Nzcy1sb2dvcy8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfVxuICB9O1xuXG4gICRzY29wZS5vcGVuUHJvamVjdEluZm8gPSBmdW5jdGlvbihldiwgbmFtZSkge1xuICAgICRtZERpYWxvZy5zaG93KFxuICAgICAgJG1kRGlhbG9nLmFsZXJ0KClcbiAgICAgICAgLnBhcmVudChhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkpXG4gICAgICAgIC50aXRsZSgkc2NvcGUuYWxsUHJvamVjdHNbbmFtZV1bJ25hbWUnXSlcbiAgICAgICAgLmNvbnRlbnQoJHNjb3BlLmFsbFByb2plY3RzW25hbWVdWydpbmZvJ10pXG4gICAgICAgIC5hcmlhTGFiZWwoJHNjb3BlLmFsbFByb2plY3RzW25hbWVdWyduYW1lJ10gKyAnIEluZm8nKVxuICAgICAgICAub2soJ0ltcHJlc3NpdmUhJylcbiAgICAgICAgLnRhcmdldEV2ZW50KGV2KVxuICAgICk7XG4gIH07XG5cbiAgXG59KTtcbmFwcC5kaXJlY3RpdmUoJ3Byb2pJbWcnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpe1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgncHJvakltZycsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB2YWx1ZSArJyknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuaG9iYmllcyA9IFt7XG4gICAgbmFtZTogXCJMb25nYm9hcmRlclwiLFxuICAgIGRlc2M6IFtcIkkgbGVhcm5lZCB0byByaWRlIGFib3V0IGEgeWVhciBhZ28sIGFuZCBsZWFybmluZyBtaWdodCBoYXZlIGJlZW4gb25lIG9mIHRoZVwiICtcbiAgICAgICAgICBcIiAgYmVzdCB0aGluZ3MgSVxcJ3ZlIGV2ZXIgZG9uZS4gSXRcXCdzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xuICAgICAgICAgIFwiIGFyb3VuZCBhbmQgYW4gZXZlbiBiZXR0ZXIgd2F5IHRvIHN0YXkgYWN0aXZlLlwiLFxuICAgICAgICAgIFwiIEkgZXZlbiBtYW5hZ2VkIHRvIGRlc2lnbiBhIGRlY2FsIGFuZCBwYWludCBpdCBvbnRvIG15IGJvYXJkIVwiXVxuICB9LHtcbiAgICBuYW1lOiBcIkNvbWljIFJlYWRlclwiLFxuICAgIGRlc2M6IFtcIklcXCdtIGEgaHVnZSBEQyBjb21pY3MgZmFuLiBJIGNhbiBhcHByZWNpYXRlIHRoZSBhbW91bnQgb2Ygd29yayB0aGF0IGdvZXMgaW50byBidWlsZGluZyBhIG11bHRpdmVyc2UuXCIsXG4gICAgICAgICAgXCJUaGVyZSBhcmUgc28gbWFueSBtb3ZpbmcgcGFydHMgdG8gZmFjdG9yIGluIGFuZCBpdFxcJ3MgYW1hemluZyB0byBzZWUgaG93IFwiICsgXG4gICAgICAgICAgXCIgYXV0aG9ycyBjYW4gY29udGludWUgdG8gaW5ub3ZhdGUgdGhlIGNoYXJhY3RlcnMgYW5kIHByZXNlbnQgdGhlaXIgZmFucyB3aXRoIG5ldyB0b3BpY3MgdG8gdGhpbmsgYWJvdXQgZXZlcnkgaXNzdWUuXCJdLFxuICAgIGxpbms6IFwiI2NvbWljc1wiXG4gIH0se1xuICAgIG5hbWU6IFwiRGV2ZWxvcGVyXCIsXG4gICAgZGVzYzogW1wiSVxcJ20gYSBmdWxsLXN0YWNrIHdlYiBkZXZlbG9wZXIgd2hvIGhhcHBlbnMgdG8gd3JpdGUgbG90cyBvZiBKYXZhc2NyaXB0LiBcIixcbiAgICAgICAgICBcIkkgc3RhcnRlZCBvZmYgYnVpbGRpbmcgYXBwcyB3aXRoIFJ1Ynkgb24gUmFpbHMgYW5kIGhhdmUgbW92ZWQgb24gdG9cIiArXG4gICAgICAgICAgXCIgTm9kZSBhbmQgRXhwcmVzcy4gV2hhdCB5b3VcXCdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyB3YXMgYWN0dWFsbHkgYnVpbHQgd2l0aCBcIiArXG4gICAgICAgICAgXCJOb2RlIGFuZCBFeHByZXNzLCBhbmQgYSBnZW5lcm91cyBhbW91bnQgb2YgQW5ndWxhci4gQ2hlY2sgb3V0IG15IG90aGVyIHdvcmsgaGVyZVwiXSxcbiAgICBsaW5rOiBcIlwiXG4gIH1dO1xuXG4gICRzY29wZS5jb250YWN0SW5mb3MgPSBbe1xuICAgIGlkOiAnYnRuLXR3aXR0ZXInLFxuICAgIGxhYmVsOiAnVFdJVFRFUicsXG4gICAgdXJsOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9hbGZyZWRhYmFiX2lvJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcbiAgICBsYWJlbDogJ0dJVEhVQicsXG4gICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZCdcbiAgfSwge1xuICAgIGlkOiAnYnRuLWxpbmtlZGluJyxcbiAgICBsYWJlbDogJ0xJTktFRElOJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZW1haWwnLFxuICAgIGxhYmVsOiAnRU1BSUwnLFxuICAgIHVybDogJydcbiAgfV07XG5cbiAgJHNjb3BlLmFib3V0VGV4dCA9IHsgICAgICAgICAgXG4gICAgaW50cm86IFwiSGksIElcXCdtIEFsZnJlZC5cIiwgICAgIFxuICAgIGJvZHk6IFtcbiAgICAgIFwiSVxcJ20gYSBDb21wdXRlciBTY2llbmNlIHN0dWRlbnQgYXQgTm9ydGhlYXN0ZXJuLCBhbiBhbWF0ZXVyIHBvb2wgKHBvY2tldCBiaWxsaWFyZHMpIHBsYXllciwgXCIgKyBcbiAgICAgIFwiYW5kIGEgZmlybSBiZWxpZXZlciB0aGF0IGFueW9uZSBjYW4gbGVhcm4gdG8gZG8gYW55dGhpbmcgYnkgR29vZ2xpbmcgaXQgbG9uZyBlbm91Z2guXCIsXG4gICAgICBcIkFsc28sIG15IGZyaWVuZHMgdGhpbmsgSVxcJ20gYSBwcmV0dHkgY29vbCBndXkgKGV2ZW4gdGhvdWdoIHRoZXlcXCdsbCBkZW55IGl0IGFmdGVyIHJlYWRpbmcgdGhpcy4pXCJdXG4gIH07ICBcbn0pOyIsIihmdW5jdGlvbiAobmcpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuIFxuICB2YXIgYXBwID0gbmcubW9kdWxlKCduZ0xvYWRTY3JpcHQnLCBbXSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgnc2NyaXB0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikgXG4gICAgICB7XG4gICAgICAgIGlmIChhdHRyLnR5cGU9PT0ndGV4dC9qYXZhc2NyaXB0LWxhenknKSBcbiAgICAgICAge1xuICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICB2YXIgc3JjID0gZWxlbS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICBpZihzcmMhPT11bmRlZmluZWQpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlbGVtLnRleHQoKTtcbiAgICAgICAgICAgICAgcy50ZXh0ID0gY29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gXG59KGFuZ3VsYXIpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=