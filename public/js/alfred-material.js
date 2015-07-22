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
    .icon('home','icons/home.svg');
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
      "name": "TurboTax Exemption Check",
      "screenshot": '/imgs/projects/tt-ef.png',
      "description": '',
      "repository": '',
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
      "demoLink": '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnXSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2hvbWUvaG9tZS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdIb21lJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvbWljcycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvbGlicmFyeS9saWJyYXJ5Lmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvbWljcydcclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZEljb25Qcm92aWRlcikge1xyXG4gICRtZEljb25Qcm92aWRlclxyXG4gICAgLmljb24oJ2RlbW8nLCAnaWNvbnMvZGVza3RvcFxcIG1hYy5zdmcnKVxyXG4gICAgLmljb24oJ2dpdGh1YicsICdpY29ucy9naXRodWIuc3ZnJylcclxuICAgIC5pY29uKCdjb21pYycsICdpY29ucy9kYXNoYm9hcmQuc3ZnJylcclxuICAgIC5pY29uKCdjb2RlJywnaWNvbnMvY29kZS5zdmcnKVxyXG4gICAgLmljb24oJ3Jlc3VtZScsJ2ljb25zL2Rlc2NyaXB0aW9uLnN2ZycpXHJcbiAgICAuaWNvbignaG9tZScsJ2ljb25zL2hvbWUuc3ZnJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRsb2NhdGlvbikge1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkbWRTaWRlbmF2LCAkbG9nKSB7XHJcbiAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgJHNjb3BlLnBhZ2VUaXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICdob21lJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJ2NvZGUnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0NvbWljcycsXHJcbiAgICB1cmw6ICcvY29taWNzJyxcclxuICAgIGljb246ICdjb21pYydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJ3Jlc3VtZSdcclxuICB9XTtcclxuICBcclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgJGxvY2F0aW9uLnBhdGgodXJsKTtcclxuICB9O1xyXG59KTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2cpIHtcblxuICAkc2NvcGUuYWxsUHJvamVjdHMgPSB7XG4gICAgJ21kU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkFsZnJlZCBNYXRlcmlhbFwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICdtZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tYXRlcmlhbC13ZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHA6Ly9hbGZyZWRhYmFiLmlvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2VmJzoge1xuICAgICAgXCJuYW1lXCI6IFwiVHVyYm9UYXggRXhlbXB0aW9uIENoZWNrXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL3R0LWVmLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cHM6Ly90dXJib3RheC5pbnR1aXQuY29tL2hlYWx0aC1jYXJlL2V4ZW1wdGlvbnMnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnb2xkU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIk9sZCBXZWJzaXRlXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL29sZC1zaXRlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLW9yYW5nZS1weXJhbWlkcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC10ZWFsLXRyaS5qcGcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1ncmV5LWNpcmNsZS5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUuYWN0aXZlUHJldmlldyA9ICRzY29wZS5hbGxQcm9qZWN0c1snbWVhbiddO1xuXG5cbiAgJHNjb3BlLnNldEFzQWN0aXZlUHJldmlldyA9IGZ1bmN0aW9uKG5ld0FjdGl2ZUlkKSB7XG4gICAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbbmV3QWN0aXZlSWRdO1xuICB9O1xuXG4gIFxufSk7XG5hcHAuZGlyZWN0aXZlKCdwcm9qSW1nJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKXtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3Byb2pJbWcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdmFsdWUgKycpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTsiLCJhcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgJHNjb3BlLmhvYmJpZXMgPSBbe1xuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcbiAgICBkZXNjOiBbXCJJIGxlYXJuZWQgdG8gcmlkZSBhYm91dCBhIHllYXIgYWdvLCBhbmQgbGVhcm5pbmcgbWlnaHQgaGF2ZSBiZWVuIG9uZSBvZiB0aGVcIiArXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBldmVyIGRvbmUuIEl0XFwncyBhIHJlYWxseSBmdW4gd2F5IHRvIGdldFwiICtcbiAgICAgICAgICBcIiBhcm91bmQgYW5kIGFuIGV2ZW4gYmV0dGVyIHdheSB0byBzdGF5IGFjdGl2ZS5cIixcbiAgICAgICAgICBcIiBJIGV2ZW4gbWFuYWdlZCB0byBkZXNpZ24gYSBkZWNhbCBhbmQgcGFpbnQgaXQgb250byBteSBib2FyZCFcIl1cbiAgfSx7XG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzIGludG8gYnVpbGRpbmcgYSBtdWx0aXZlcnNlLlwiLFxuICAgICAgICAgIFwiVGhlcmUgYXJlIHNvIG1hbnkgbW92aW5nIHBhcnRzIHRvIGZhY3RvciBpbiBhbmQgaXRcXCdzIGFtYXppbmcgdG8gc2VlIGhvdyBcIiArIFxuICAgICAgICAgIFwiIGF1dGhvcnMgY2FuIGNvbnRpbnVlIHRvIGlubm92YXRlIHRoZSBjaGFyYWN0ZXJzIGFuZCBwcmVzZW50IHRoZWlyIGZhbnMgd2l0aCBuZXcgdG9waWNzIHRvIHRoaW5rIGFib3V0IGV2ZXJ5IGlzc3VlLlwiXSxcbiAgICBsaW5rOiBcIiNjb21pY3NcIlxuICB9LHtcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxuICAgIGRlc2M6IFtcIklcXCdtIGEgZnVsbC1zdGFjayB3ZWIgZGV2ZWxvcGVyIHdobyBoYXBwZW5zIHRvIHdyaXRlIGxvdHMgb2YgSmF2YXNjcmlwdC4gXCIsXG4gICAgICAgICAgXCJJIHN0YXJ0ZWQgb2ZmIGJ1aWxkaW5nIGFwcHMgd2l0aCBSdWJ5IG9uIFJhaWxzIGFuZCBoYXZlIG1vdmVkIG9uIHRvXCIgK1xuICAgICAgICAgIFwiIE5vZGUgYW5kIEV4cHJlc3MuIFdoYXQgeW91XFwncmUgbG9va2luZyBhdCByaWdodCBub3cgd2FzIGFjdHVhbGx5IGJ1aWx0IHdpdGggXCIgK1xuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIGhlcmVcIl0sXG4gICAgbGluazogXCJcIlxuICB9XTtcblxuICAkc2NvcGUuY29udGFjdEluZm9zID0gW3tcbiAgICBpZDogJ2J0bi10d2l0dGVyJyxcbiAgICBsYWJlbDogJ1RXSVRURVInLFxuICAgIHVybDogJ2h0dHBzOi8vdHdpdHRlci5jb20vYWxmcmVkYWJhYl9pbydcbiAgfSwge1xuICAgIGlkOiAnYnRuLWdpdGh1YicsXG4gICAgbGFiZWw6ICdHSVRIVUInLFxuICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQnXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1saW5rZWRpbicsXG4gICAgbGFiZWw6ICdMSU5LRURJTicsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FsZnJlZGFiYWJpby9lbidcbiAgfSwge1xuICAgIGlkOiAnYnRuLWVtYWlsJyxcbiAgICBsYWJlbDogJ0VNQUlMJyxcbiAgICB1cmw6ICcnXG4gIH1dO1xuXG4gICRzY29wZS5hYm91dFRleHQgPSB7ICAgICAgICAgIFxuICAgIGludHJvOiBcIkhpLCBJXFwnbSBBbGZyZWQuXCIsICAgICBcbiAgICBib2R5OiBbXG4gICAgICBcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXG4gICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IEdvb2dsaW5nIGl0IGxvbmcgZW5vdWdoLlwiLFxuICAgICAgXCJBbHNvLCBteSBmcmllbmRzIHRoaW5rIElcXCdtIGEgcHJldHR5IGNvb2wgZ3V5IChldmVuIHRob3VnaCB0aGV5XFwnbGwgZGVueSBpdCBhZnRlciByZWFkaW5nIHRoaXMuKVwiXVxuICB9OyAgXG59KTsiLCIoZnVuY3Rpb24gKG5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiBcbiAgdmFyIGFwcCA9IG5nLm1vZHVsZSgnbmdMb2FkU2NyaXB0JywgW10pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3NjcmlwdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIFxuICAgICAge1xuICAgICAgICBpZiAoYXR0ci50eXBlPT09J3RleHQvamF2YXNjcmlwdC1sYXp5JykgXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdmFyIHNyYyA9IGVsZW0uYXR0cignc3JjJyk7XG4gICAgICAgICAgaWYoc3JjIT09dW5kZWZpbmVkKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgIHMudGV4dCA9IGNvZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuIFxufShhbmd1bGFyKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9