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

app.controller('ProjectsCtrl', function($scope, $timeout, $mdSidenav, $log) {

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
      "screenshot": '/imgs/projects/tt-ef.png',
      "description": '',
      "repository": '',
      "info": '',
      "demoLink": 'https://turbotax.intuit.com/health-care/exemptions',
      "tech": [],
      "learned": ''
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '/imgs/projects/old-site.png',
      "description": '',
      "repository": 'https://github.com/alfred/Website',
      "demoLink": '',
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
      "info": '',
      "demoLink": 'http://moderator.cengage.com',
      "tech": [],
      "learned": ''
    },
    'cssLogos': {
      "name": "CSS Logos",
      "screenshot": '/imgs/projects/md-grey-circle.png',
      "description": '',
      "repository": 'https://github.com/alfred/css-logos',
      "demoLink": '',
      "tech": [],
      "learned": ''
    }
  };

  $scope.activePreview = $scope.allProjects['mean'];


  $scope.setAsActivePreview = function(newActiveId) {
    $scope.activePreview = $scope.allProjects[newActiveId];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnXSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2hvbWUvaG9tZS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdIb21lJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvbWljcycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvbGlicmFyeS9saWJyYXJ5Lmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvbWljcydcclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZEljb25Qcm92aWRlcikge1xyXG4gICRtZEljb25Qcm92aWRlclxyXG4gICAgLmljb24oJ2RlbW8nLCAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnKVxyXG4gICAgLmljb24oJ2dpdGh1YicsICdpY29ucy9naXRodWIuc3ZnJylcclxuICAgIC5pY29uKCdjb21pYycsICdpY29ucy9kYXNoYm9hcmQuc3ZnJylcclxuICAgIC5pY29uKCdjb2RlJywnaWNvbnMvY29kZS5zdmcnKVxyXG4gICAgLmljb24oJ3Jlc3VtZScsJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycpXHJcbiAgICAuaWNvbignaG9tZScsJ2ljb25zL2hvbWUuc3ZnJylcclxuICAgIC5pY29uKCdpbmZvJywgJ2ljb25zL2luZm8uc3ZnJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRsb2NhdGlvbikge1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkbWRTaWRlbmF2LCAkbG9nKSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnBhZ2VUaXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICdob21lJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJ2NvZGUnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0NvbWljcycsXHJcbiAgICB1cmw6ICcvY29taWNzJyxcclxuICAgIGljb246ICdjb21pYydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJ3Jlc3VtZSdcclxuICB9XTtcclxuICBcclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGxvY2F0aW9uLnBhdGgodXJsKTtcclxuICB9O1xyXG59KTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2cpIHtcblxuICAkc2NvcGUuYWxsUHJvamVjdHMgPSB7XG4gICAgJ21kU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkFsZnJlZCBNYXRlcmlhbFwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICdtZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tYXRlcmlhbC13ZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWRhYmFiLmlvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2VmJzoge1xuICAgICAgXCJuYW1lXCI6IFwiRXhlbXB0aW9uIENoZWNrXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL3R0LWVmLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJpbmZvXCI6ICcnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cHM6Ly90dXJib3RheC5pbnR1aXQuY29tL2hlYWx0aC1jYXJlL2V4ZW1wdGlvbnMnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnb2xkU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIk9sZCBXZWJzaXRlXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL29sZC1zaXRlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLW9yYW5nZS1weXJhbWlkcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9tb2RlcmF0b3IuY2VuZ2FnZS5jb20nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnY3NzTG9nb3MnOiB7XG4gICAgICBcIm5hbWVcIjogXCJDU1MgTG9nb3NcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtZ3JleS1jaXJjbGUucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvY3NzLWxvZ29zJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbJ21lYW4nXTtcblxuXG4gICRzY29wZS5zZXRBc0FjdGl2ZVByZXZpZXcgPSBmdW5jdGlvbihuZXdBY3RpdmVJZCkge1xuICAgICRzY29wZS5hY3RpdmVQcmV2aWV3ID0gJHNjb3BlLmFsbFByb2plY3RzW25ld0FjdGl2ZUlkXTtcbiAgfTtcblxuICBcbn0pO1xuYXBwLmRpcmVjdGl2ZSgncHJvakltZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCdwcm9qSW1nJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHZhbHVlICsnKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5ob2JiaWVzID0gW3tcbiAgICBuYW1lOiBcIkxvbmdib2FyZGVyXCIsXG4gICAgZGVzYzogW1wiSSBsZWFybmVkIHRvIHJpZGUgYWJvdXQgYSB5ZWFyIGFnbywgYW5kIGxlYXJuaW5nIG1pZ2h0IGhhdmUgYmVlbiBvbmUgb2YgdGhlXCIgK1xuICAgICAgICAgIFwiICBiZXN0IHRoaW5ncyBJXFwndmUgZXZlciBkb25lLiBJdFxcJ3MgYSByZWFsbHkgZnVuIHdheSB0byBnZXRcIiArXG4gICAgICAgICAgXCIgYXJvdW5kIGFuZCBhbiBldmVuIGJldHRlciB3YXkgdG8gc3RheSBhY3RpdmUuXCIsXG4gICAgICAgICAgXCIgSSBldmVuIG1hbmFnZWQgdG8gZGVzaWduIGEgZGVjYWwgYW5kIHBhaW50IGl0IG9udG8gbXkgYm9hcmQhXCJdXG4gIH0se1xuICAgIG5hbWU6IFwiQ29taWMgUmVhZGVyXCIsXG4gICAgZGVzYzogW1wiSVxcJ20gYSBodWdlIERDIGNvbWljcyBmYW4uIEkgY2FuIGFwcHJlY2lhdGUgdGhlIGFtb3VudCBvZiB3b3JrIHRoYXQgZ29lcyBpbnRvIGJ1aWxkaW5nIGEgbXVsdGl2ZXJzZS5cIixcbiAgICAgICAgICBcIlRoZXJlIGFyZSBzbyBtYW55IG1vdmluZyBwYXJ0cyB0byBmYWN0b3IgaW4gYW5kIGl0XFwncyBhbWF6aW5nIHRvIHNlZSBob3cgXCIgKyBcbiAgICAgICAgICBcIiBhdXRob3JzIGNhbiBjb250aW51ZSB0byBpbm5vdmF0ZSB0aGUgY2hhcmFjdGVycyBhbmQgcHJlc2VudCB0aGVpciBmYW5zIHdpdGggbmV3IHRvcGljcyB0byB0aGluayBhYm91dCBldmVyeSBpc3N1ZS5cIl0sXG4gICAgbGluazogXCIjY29taWNzXCJcbiAgfSx7XG4gICAgbmFtZTogXCJEZXZlbG9wZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3BlciB3aG8gaGFwcGVucyB0byB3cml0ZSBsb3RzIG9mIEphdmFzY3JpcHQuIFwiLFxuICAgICAgICAgIFwiSSBzdGFydGVkIG9mZiBidWlsZGluZyBhcHBzIHdpdGggUnVieSBvbiBSYWlscyBhbmQgaGF2ZSBtb3ZlZCBvbiB0b1wiICtcbiAgICAgICAgICBcIiBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcbiAgICAgICAgICBcIk5vZGUgYW5kIEV4cHJlc3MsIGFuZCBhIGdlbmVyb3VzIGFtb3VudCBvZiBBbmd1bGFyLiBDaGVjayBvdXQgbXkgb3RoZXIgd29yayBoZXJlXCJdLFxuICAgIGxpbms6IFwiXCJcbiAgfV07XG5cbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XG4gICAgaWQ6ICdidG4tdHdpdHRlcicsXG4gICAgbGFiZWw6ICdUV0lUVEVSJyxcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1naXRodWInLFxuICAgIGxhYmVsOiAnR0lUSFVCJyxcbiAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxuICAgIGxhYmVsOiAnTElOS0VESU4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbGZyZWRhYmFiaW8vZW4nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1lbWFpbCcsXG4gICAgbGFiZWw6ICdFTUFJTCcsXG4gICAgdXJsOiAnJ1xuICB9XTtcblxuICAkc2NvcGUuYWJvdXRUZXh0ID0geyAgICAgICAgICBcbiAgICBpbnRybzogXCJIaSwgSVxcJ20gQWxmcmVkLlwiLCAgICAgXG4gICAgYm9keTogW1xuICAgICAgXCJJXFwnbSBhIENvbXB1dGVyIFNjaWVuY2Ugc3R1ZGVudCBhdCBOb3J0aGVhc3Rlcm4sIGFuIGFtYXRldXIgcG9vbCAocG9ja2V0IGJpbGxpYXJkcykgcGxheWVyLCBcIiArIFxuICAgICAgXCJhbmQgYSBmaXJtIGJlbGlldmVyIHRoYXQgYW55b25lIGNhbiBsZWFybiB0byBkbyBhbnl0aGluZyBieSBHb29nbGluZyBpdCBsb25nIGVub3VnaC5cIixcbiAgICAgIFwiQWxzbywgbXkgZnJpZW5kcyB0aGluayBJXFwnbSBhIHByZXR0eSBjb29sIGd1eSAoZXZlbiB0aG91Z2ggdGhleVxcJ2xsIGRlbnkgaXQgYWZ0ZXIgcmVhZGluZyB0aGlzLilcIl1cbiAgfTsgIFxufSk7IiwiKGZ1bmN0aW9uIChuZykge1xuICAndXNlIHN0cmljdCc7XG4gXG4gIHZhciBhcHAgPSBuZy5tb2R1bGUoJ25nTG9hZFNjcmlwdCcsIFtdKTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JpcHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSBcbiAgICAgIHtcbiAgICAgICAgaWYgKGF0dHIudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQtbGF6eScpIFxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgIHMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHZhciBzcmMgPSBlbGVtLmF0dHIoJ3NyYycpO1xuICAgICAgICAgIGlmKHNyYyE9PXVuZGVmaW5lZClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY29kZSA9IGVsZW0udGV4dCgpO1xuICAgICAgICAgICAgICBzLnRleHQgPSBjb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiBcbn0oYW5ndWxhcikpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==