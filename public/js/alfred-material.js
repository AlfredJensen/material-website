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
      "screenshot": '',
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
    'mean': {
      "name": "MEAN Skeleton",
      "screenshot": '/imgs/projects/mean-skeleton.png',
      "description": '',
      "repository": 'https://github.com/alfred/mean-skeleton',
      "demoLink": '',
      "tech": [],
      "learned": ''
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '/imgs/projects/old-site.png',
      "description": '',
      "repository": '',
      "demoLink": '',
      "tech": [],
      "learned": 'https://github.com/alfred/Website'
    },
    'moderator': {
      "name": "Cengage Moderator",
      "screenshot": '/imgs/projects/cengage-mod.png',
      "description": '',
      "repository": '',
      "demoLink": '',
      "tech": [],
      "learned": ''
    },
    'cssLogos': {
      "name": "CSS Logos",
      "screenshot": '/imgs/projects/css-logos.png',
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
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FsZnJlZC1tYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhbGZyZWRNYXRlcmlhbCcsIFsnbmdNYXRlcmlhbCcsICduZ1JvdXRlJywgJ25nTG9hZFNjcmlwdCddKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb2RlJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9wcm9qZWN0cy9wcm9qZWN0cy5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb2RlJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29taWNzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9saWJyYXJ5L2xpYnJhcnkuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29taWNzJ1xyXG4gICAgfSlcclxuICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyXHJcbiAgICAuaWNvbignZGVtbycsICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycpXHJcbiAgICAuaWNvbignZ2l0aHViJywgJ2ljb25zL2dpdGh1Yi5zdmcnKVxyXG4gICAgLmljb24oJ2NvbWljJywgJ2ljb25zL2Rhc2hib2FyZC5zdmcnKVxyXG4gICAgLmljb24oJ2NvZGUnLCdpY29ucy9jb2RlLnN2ZycpXHJcbiAgICAuaWNvbigncmVzdW1lJywnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJylcclxuICAgIC5pY29uKCdob21lJywnaWNvbnMvaG9tZS5zdmcnKTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJGxvY2F0aW9uKSB7XHJcblxyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdOYXZDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRtZFNpZGVuYXYsICRsb2cpIHtcclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUucGFnZVRpdGxlID0gZGF0YS50aXRsZTtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLm5hdkxpbmtzID0gW3tcclxuICAgIG5hbWU6ICdIb21lJyxcclxuICAgIHVybDogJy8nLFxyXG4gICAgaWNvbjogJ2hvbWUnXHJcbiAgfSx7XHJcbiAgICBuYW1lOiAnQ29kZScsXHJcbiAgICB1cmw6ICcvY29kZScsXHJcbiAgICBpY29uOiAnY29kZSdcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnQ29taWNzJyxcclxuICAgIHVybDogJy9jb21pY3MnLFxyXG4gICAgaWNvbjogJ2NvbWljJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdSZXN1bWUnLFxyXG4gICAgdXJsOiAnL3Jlc3VtZScsXHJcbiAgICBpY29uOiAncmVzdW1lJ1xyXG4gIH1dO1xyXG4gIFxyXG4gICRzY29wZS50b2dnbGVTaWRlTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJG1kU2lkZW5hdignc2lkZU5hdicpLnRvZ2dsZSgpXHJcbiAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJG1kU2lkZW5hdignc2lkZU5hdicpLmlzT3BlbigpKSB7XHJcbiAgICAgICAgdmFyIGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21kLXNpZGVuYXYtYmFja2Ryb3AnKTtcclxuICAgICAgICBpZihiYWNrZHJvcEVsZW1lbnQpIHtcclxuICAgICAgICAgIGJhY2tkcm9wRWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbmltYXRlVG9NZW51KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkbG9jYXRpb24ucGF0aCh1cmwpO1xyXG4gIH07XHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignUHJvamVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZykge1xuXG4gICRzY29wZS5hbGxQcm9qZWN0cyA9IHtcbiAgICAnbWRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQWxmcmVkIE1hdGVyaWFsXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21hdGVyaWFsLXdlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZGFiYWIuaW8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnZWYnOiB7XG4gICAgICBcIm5hbWVcIjogXCJUdXJib1RheCBFeGVtcHRpb24gQ2hlY2tcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvdHQtZWYucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwczovL3R1cmJvdGF4LmludHVpdC5jb20vaGVhbHRoLWNhcmUvZXhlbXB0aW9ucycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtZWFuJzoge1xuICAgICAgXCJuYW1lXCI6IFwiTUVBTiBTa2VsZXRvblwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZWFuLXNrZWxldG9uLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21lYW4tc2tlbGV0b24nLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9vbGQtc2l0ZS5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZSdcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9jZW5nYWdlLW1vZC5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9jc3MtbG9nb3MucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvY3NzLWxvZ29zJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbJ21lYW4nXTtcblxuXG4gICRzY29wZS5zZXRBc0FjdGl2ZVByZXZpZXcgPSBmdW5jdGlvbihuZXdBY3RpdmVJZCkge1xuICAgICRzY29wZS5hY3RpdmVQcmV2aWV3ID0gJHNjb3BlLmFsbFByb2plY3RzW25ld0FjdGl2ZUlkXTtcbiAgfTtcblxuICBcbn0pO1xuYXBwLmRpcmVjdGl2ZSgncHJvakltZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCdwcm9qSW1nJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHZhbHVlICsnKScsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZScgOiAnY292ZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuaG9iYmllcyA9IFt7XG4gICAgbmFtZTogXCJMb25nYm9hcmRlclwiLFxuICAgIGRlc2M6IFtcIkkgbGVhcm5lZCB0byByaWRlIGFib3V0IGEgeWVhciBhZ28sIGFuZCBsZWFybmluZyBtaWdodCBoYXZlIGJlZW4gb25lIG9mIHRoZVwiICtcbiAgICAgICAgICBcIiAgYmVzdCB0aGluZ3MgSVxcJ3ZlIGV2ZXIgZG9uZS4gSXRcXCdzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xuICAgICAgICAgIFwiIGFyb3VuZCBhbmQgYW4gZXZlbiBiZXR0ZXIgd2F5IHRvIHN0YXkgYWN0aXZlLlwiLFxuICAgICAgICAgIFwiIEkgZXZlbiBtYW5hZ2VkIHRvIGRlc2lnbiBhIGRlY2FsIGFuZCBwYWludCBpdCBvbnRvIG15IGJvYXJkIVwiXVxuICB9LHtcbiAgICBuYW1lOiBcIkNvbWljIFJlYWRlclwiLFxuICAgIGRlc2M6IFtcIklcXCdtIGEgaHVnZSBEQyBjb21pY3MgZmFuLiBJIGNhbiBhcHByZWNpYXRlIHRoZSBhbW91bnQgb2Ygd29yayB0aGF0IGdvZXMgaW50byBidWlsZGluZyBhIG11bHRpdmVyc2UuXCIsXG4gICAgICAgICAgXCJUaGVyZSBhcmUgc28gbWFueSBtb3ZpbmcgcGFydHMgdG8gZmFjdG9yIGluIGFuZCBpdFxcJ3MgYW1hemluZyB0byBzZWUgaG93IFwiICsgXG4gICAgICAgICAgXCIgYXV0aG9ycyBjYW4gY29udGludWUgdG8gaW5ub3ZhdGUgdGhlIGNoYXJhY3RlcnMgYW5kIHByZXNlbnQgdGhlaXIgZmFucyB3aXRoIG5ldyB0b3BpY3MgdG8gdGhpbmsgYWJvdXQgZXZlcnkgaXNzdWUuXCJdLFxuICAgIGxpbms6IFwiI2NvbWljc1wiXG4gIH0se1xuICAgIG5hbWU6IFwiRGV2ZWxvcGVyXCIsXG4gICAgZGVzYzogW1wiSVxcJ20gYSBmdWxsLXN0YWNrIHdlYiBkZXZlbG9wZXIgd2hvIGhhcHBlbnMgdG8gd3JpdGUgbG90cyBvZiBKYXZhc2NyaXB0LiBcIixcbiAgICAgICAgICBcIkkgc3RhcnRlZCBvZmYgYnVpbGRpbmcgYXBwcyB3aXRoIFJ1Ynkgb24gUmFpbHMgYW5kIGhhdmUgbW92ZWQgb24gdG9cIiArXG4gICAgICAgICAgXCIgTm9kZSBhbmQgRXhwcmVzcy4gV2hhdCB5b3VcXCdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyB3YXMgYWN0dWFsbHkgYnVpbHQgd2l0aCBcIiArXG4gICAgICAgICAgXCJOb2RlIGFuZCBFeHByZXNzLCBhbmQgYSBnZW5lcm91cyBhbW91bnQgb2YgQW5ndWxhci4gQ2hlY2sgb3V0IG15IG90aGVyIHdvcmsgaGVyZVwiXSxcbiAgICBsaW5rOiBcIlwiXG4gIH1dO1xuXG4gICRzY29wZS5jb250YWN0SW5mb3MgPSBbe1xuICAgIGlkOiAnYnRuLXR3aXR0ZXInLFxuICAgIGxhYmVsOiAnVFdJVFRFUicsXG4gICAgdXJsOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9hbGZyZWRhYmFiX2lvJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcbiAgICBsYWJlbDogJ0dJVEhVQicsXG4gICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZCdcbiAgfSwge1xuICAgIGlkOiAnYnRuLWxpbmtlZGluJyxcbiAgICBsYWJlbDogJ0xJTktFRElOJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tZW1haWwnLFxuICAgIGxhYmVsOiAnRU1BSUwnLFxuICAgIHVybDogJydcbiAgfV07XG5cbiAgJHNjb3BlLmFib3V0VGV4dCA9IHsgICAgICAgICAgXG4gICAgaW50cm86IFwiSGksIElcXCdtIEFsZnJlZC5cIiwgICAgIFxuICAgIGJvZHk6IFtcbiAgICAgIFwiSVxcJ20gYSBDb21wdXRlciBTY2llbmNlIHN0dWRlbnQgYXQgTm9ydGhlYXN0ZXJuLCBhbiBhbWF0ZXVyIHBvb2wgKHBvY2tldCBiaWxsaWFyZHMpIHBsYXllciwgXCIgKyBcbiAgICAgIFwiYW5kIGEgZmlybSBiZWxpZXZlciB0aGF0IGFueW9uZSBjYW4gbGVhcm4gdG8gZG8gYW55dGhpbmcgYnkgR29vZ2xpbmcgaXQgbG9uZyBlbm91Z2guXCIsXG4gICAgICBcIkFsc28sIG15IGZyaWVuZHMgdGhpbmsgSVxcJ20gYSBwcmV0dHkgY29vbCBndXkgKGV2ZW4gdGhvdWdoIHRoZXlcXCdsbCBkZW55IGl0IGFmdGVyIHJlYWRpbmcgdGhpcy4pXCJdXG4gIH07ICBcbn0pOyIsIihmdW5jdGlvbiAobmcpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuIFxuICB2YXIgYXBwID0gbmcubW9kdWxlKCduZ0xvYWRTY3JpcHQnLCBbXSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgnc2NyaXB0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikgXG4gICAgICB7XG4gICAgICAgIGlmIChhdHRyLnR5cGU9PT0ndGV4dC9qYXZhc2NyaXB0LWxhenknKSBcbiAgICAgICAge1xuICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICB2YXIgc3JjID0gZWxlbS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICBpZihzcmMhPT11bmRlZmluZWQpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlbGVtLnRleHQoKTtcbiAgICAgICAgICAgICAgcy50ZXh0ID0gY29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gXG59KGFuZ3VsYXIpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=