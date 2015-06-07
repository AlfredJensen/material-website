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
                'background-size' : 'cover',
                'background-position' : 'center'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvYWxmcmVkLW1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FsZnJlZE1hdGVyaWFsJywgWyduZ01hdGVyaWFsJywgJ25nUm91dGUnLCAnbmdMb2FkU2NyaXB0J10pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgLmFjY2VudFBhbGV0dGUoJ2FtYmVyJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgJHJvdXRlUHJvdmlkZXJcclxuICAgIC53aGVuKCcvJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9ob21lL2hvbWUuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnSG9tZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvZGUnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3Byb2plY3RzL3Byb2plY3RzLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvZGUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb21pY3MnXHJcbiAgICB9KVxyXG4gICAgLm90aGVyd2lzZSh7XHJcbiAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRJY29uUHJvdmlkZXIpIHtcclxuICAkbWRJY29uUHJvdmlkZXJcclxuICAgIC5pY29uKCdkZW1vJywgJ2ljb25zL2Rlc2t0b3BcXCBtYWMuc3ZnJylcclxuICAgIC5pY29uKCdnaXRodWInLCAnaWNvbnMvZ2l0aHViLnN2ZycpXHJcbiAgICAuaWNvbignY29taWMnLCAnaWNvbnMvZGFzaGJvYXJkLnN2ZycpXHJcbiAgICAuaWNvbignY29kZScsJ2ljb25zL2NvZGUuc3ZnJylcclxuICAgIC5pY29uKCdyZXN1bWUnLCdpY29ucy9kZXNjcmlwdGlvbi5zdmcnKVxyXG4gICAgLmljb24oJ2hvbWUnLCdpY29ucy9ob21lLnN2ZycpO1xyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbG9jYXRpb24pIHtcclxuXHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgJG1kU2lkZW5hdiwgJGxvZykge1xyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS5wYWdlVGl0bGUgPSBkYXRhLnRpdGxlO1xyXG4gIH0pO1xyXG5cclxuICAkc2NvcGUubmF2TGlua3MgPSBbe1xyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgdXJsOiAnLycsXHJcbiAgICBpY29uOiAnaG9tZSdcclxuICB9LHtcclxuICAgIG5hbWU6ICdDb2RlJyxcclxuICAgIHVybDogJy9jb2RlJyxcclxuICAgIGljb246ICdjb2RlJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdDb21pY3MnLFxyXG4gICAgdXJsOiAnL2NvbWljcycsXHJcbiAgICBpY29uOiAnY29taWMnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ1Jlc3VtZScsXHJcbiAgICB1cmw6ICcvcmVzdW1lJyxcclxuICAgIGljb246ICdyZXN1bWUnXHJcbiAgfV07XHJcbiAgXHJcbiAgJHNjb3BlLnRvZ2dsZVNpZGVNZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkbWRTaWRlbmF2KCdzaWRlTmF2JykudG9nZ2xlKClcclxuICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmICgkbWRTaWRlbmF2KCdzaWRlTmF2JykuaXNPcGVuKCkpIHtcclxuICAgICAgICB2YXIgYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWQtc2lkZW5hdi1iYWNrZHJvcCcpO1xyXG4gICAgICAgIGlmKGJhY2tkcm9wRWxlbWVudCkge1xyXG4gICAgICAgICAgYmFja2Ryb3BFbGVtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVUb01lbnUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICRsb2NhdGlvbi5wYXRoKHVybCk7XHJcbiAgfTtcclxufSk7XHJcbiIsImFwcC5jb250cm9sbGVyKCdQcm9qZWN0c0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIlR1cmJvVGF4IEV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy90dC1lZi5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21lYW4tc2tlbGV0b24ucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWVhbi1za2VsZXRvbicsXG4gICAgICBcImRlbW9MaW5rXCI6ICcnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnb2xkU2l0ZSc6IHtcbiAgICAgIFwibmFtZVwiOiBcIk9sZCBXZWJzaXRlXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL29sZC1zaXRlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJ1xuICAgIH0sXG4gICAgJ21vZGVyYXRvcic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNlbmdhZ2UgTW9kZXJhdG9yXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL2NlbmdhZ2UtbW9kLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICcnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2Nzc0xvZ29zJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ1NTIExvZ29zXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL2Nzcy1sb2dvcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUuYWN0aXZlUHJldmlldyA9ICRzY29wZS5hbGxQcm9qZWN0c1snbWVhbiddO1xuXG5cbiAgJHNjb3BlLnNldEFzQWN0aXZlUHJldmlldyA9IGZ1bmN0aW9uKG5ld0FjdGl2ZUlkKSB7XG4gICAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbbmV3QWN0aXZlSWRdO1xuICB9O1xuXG4gIFxufSk7XG5hcHAuZGlyZWN0aXZlKCdwcm9qSW1nJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKXtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3Byb2pJbWcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdmFsdWUgKycpJyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJyA6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nIDogJ2NlbnRlcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5ob2JiaWVzID0gW3tcbiAgICBuYW1lOiBcIkxvbmdib2FyZGVyXCIsXG4gICAgZGVzYzogW1wiSSBsZWFybmVkIHRvIHJpZGUgYWJvdXQgYSB5ZWFyIGFnbywgYW5kIGxlYXJuaW5nIG1pZ2h0IGhhdmUgYmVlbiBvbmUgb2YgdGhlXCIgK1xuICAgICAgICAgIFwiICBiZXN0IHRoaW5ncyBJXFwndmUgZXZlciBkb25lLiBJdFxcJ3MgYSByZWFsbHkgZnVuIHdheSB0byBnZXRcIiArXG4gICAgICAgICAgXCIgYXJvdW5kIGFuZCBhbiBldmVuIGJldHRlciB3YXkgdG8gc3RheSBhY3RpdmUuXCIsXG4gICAgICAgICAgXCIgSSBldmVuIG1hbmFnZWQgdG8gZGVzaWduIGEgZGVjYWwgYW5kIHBhaW50IGl0IG9udG8gbXkgYm9hcmQhXCJdXG4gIH0se1xuICAgIG5hbWU6IFwiQ29taWMgUmVhZGVyXCIsXG4gICAgZGVzYzogW1wiSVxcJ20gYSBodWdlIERDIGNvbWljcyBmYW4uIEkgY2FuIGFwcHJlY2lhdGUgdGhlIGFtb3VudCBvZiB3b3JrIHRoYXQgZ29lcyBpbnRvIGJ1aWxkaW5nIGEgbXVsdGl2ZXJzZS5cIixcbiAgICAgICAgICBcIlRoZXJlIGFyZSBzbyBtYW55IG1vdmluZyBwYXJ0cyB0byBmYWN0b3IgaW4gYW5kIGl0XFwncyBhbWF6aW5nIHRvIHNlZSBob3cgXCIgKyBcbiAgICAgICAgICBcIiBhdXRob3JzIGNhbiBjb250aW51ZSB0byBpbm5vdmF0ZSB0aGUgY2hhcmFjdGVycyBhbmQgcHJlc2VudCB0aGVpciBmYW5zIHdpdGggbmV3IHRvcGljcyB0byB0aGluayBhYm91dCBldmVyeSBpc3N1ZS5cIl0sXG4gICAgbGluazogXCIjY29taWNzXCJcbiAgfSx7XG4gICAgbmFtZTogXCJEZXZlbG9wZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3BlciB3aG8gaGFwcGVucyB0byB3cml0ZSBsb3RzIG9mIEphdmFzY3JpcHQuIFwiLFxuICAgICAgICAgIFwiSSBzdGFydGVkIG9mZiBidWlsZGluZyBhcHBzIHdpdGggUnVieSBvbiBSYWlscyBhbmQgaGF2ZSBtb3ZlZCBvbiB0b1wiICtcbiAgICAgICAgICBcIiBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcbiAgICAgICAgICBcIk5vZGUgYW5kIEV4cHJlc3MsIGFuZCBhIGdlbmVyb3VzIGFtb3VudCBvZiBBbmd1bGFyLiBDaGVjayBvdXQgbXkgb3RoZXIgd29yayBoZXJlXCJdLFxuICAgIGxpbms6IFwiXCJcbiAgfV07XG5cbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XG4gICAgaWQ6ICdidG4tdHdpdHRlcicsXG4gICAgbGFiZWw6ICdUV0lUVEVSJyxcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1naXRodWInLFxuICAgIGxhYmVsOiAnR0lUSFVCJyxcbiAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkJ1xuICB9LCB7XG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxuICAgIGxhYmVsOiAnTElOS0VESU4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbGZyZWRhYmFiaW8vZW4nXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1lbWFpbCcsXG4gICAgbGFiZWw6ICdFTUFJTCcsXG4gICAgdXJsOiAnJ1xuICB9XTtcblxuICAkc2NvcGUuYWJvdXRUZXh0ID0geyAgICAgICAgICBcbiAgICBpbnRybzogXCJIaSwgSVxcJ20gQWxmcmVkLlwiLCAgICAgXG4gICAgYm9keTogW1xuICAgICAgXCJJXFwnbSBhIENvbXB1dGVyIFNjaWVuY2Ugc3R1ZGVudCBhdCBOb3J0aGVhc3Rlcm4sIGFuIGFtYXRldXIgcG9vbCAocG9ja2V0IGJpbGxpYXJkcykgcGxheWVyLCBcIiArIFxuICAgICAgXCJhbmQgYSBmaXJtIGJlbGlldmVyIHRoYXQgYW55b25lIGNhbiBsZWFybiB0byBkbyBhbnl0aGluZyBieSBHb29nbGluZyBpdCBsb25nIGVub3VnaC5cIixcbiAgICAgIFwiQWxzbywgbXkgZnJpZW5kcyB0aGluayBJXFwnbSBhIHByZXR0eSBjb29sIGd1eSAoZXZlbiB0aG91Z2ggdGhleVxcJ2xsIGRlbnkgaXQgYWZ0ZXIgcmVhZGluZyB0aGlzLilcIl1cbiAgfTsgIFxufSk7IiwiKGZ1bmN0aW9uIChuZykge1xuICAndXNlIHN0cmljdCc7XG4gXG4gIHZhciBhcHAgPSBuZy5tb2R1bGUoJ25nTG9hZFNjcmlwdCcsIFtdKTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JpcHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSBcbiAgICAgIHtcbiAgICAgICAgaWYgKGF0dHIudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQtbGF6eScpIFxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgIHMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHZhciBzcmMgPSBlbGVtLmF0dHIoJ3NyYycpO1xuICAgICAgICAgIGlmKHNyYyE9PXVuZGVmaW5lZClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY29kZSA9IGVsZW0udGV4dCgpO1xuICAgICAgICAgICAgICBzLnRleHQgPSBjb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiBcbn0oYW5ndWxhcikpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==