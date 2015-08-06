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
      "info": '',
      "demoLink": 'https://turbotax.intuit.com/health-care/exemptions',
      "tech": [],
      "learned": ''
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '/imgs/projects/old-s.png',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwiaG9tZS5qcyIsImxhenktamF2YXNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FsZnJlZC1tYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhbGZyZWRNYXRlcmlhbCcsIFsnbmdNYXRlcmlhbCcsICduZ1JvdXRlJywgJ25nTG9hZFNjcmlwdCddKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb2RlJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9wcm9qZWN0cy9wcm9qZWN0cy5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb2RlJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29taWNzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9saWJyYXJ5L2xpYnJhcnkuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29taWNzJ1xyXG4gICAgfSlcclxuICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyXHJcbiAgICAuaWNvbignZGVtbycsICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycpXHJcbiAgICAuaWNvbignZ2l0aHViJywgJ2ljb25zL2dpdGh1Yi5zdmcnKVxyXG4gICAgLmljb24oJ2NvbWljJywgJ2ljb25zL2Rhc2hib2FyZC5zdmcnKVxyXG4gICAgLmljb24oJ2NvZGUnLCdpY29ucy9jb2RlLnN2ZycpXHJcbiAgICAuaWNvbigncmVzdW1lJywnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJylcclxuICAgIC5pY29uKCdob21lJywnaWNvbnMvaG9tZS5zdmcnKVxyXG4gICAgLmljb24oJ2luZm8nLCAnaWNvbnMvaW5mby5zdmcnKTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJGxvY2F0aW9uKSB7XHJcblxyXG59KTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdOYXZDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRtZFNpZGVuYXYsICRsb2cpIHtcclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUucGFnZVRpdGxlID0gZGF0YS50aXRsZTtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLm5hdkxpbmtzID0gW3tcclxuICAgIG5hbWU6ICdIb21lJyxcclxuICAgIHVybDogJy8nLFxyXG4gICAgaWNvbjogJ2hvbWUnXHJcbiAgfSx7XHJcbiAgICBuYW1lOiAnQ29kZScsXHJcbiAgICB1cmw6ICcvY29kZScsXHJcbiAgICBpY29uOiAnY29kZSdcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnQ29taWNzJyxcclxuICAgIHVybDogJy9jb21pY3MnLFxyXG4gICAgaWNvbjogJ2NvbWljJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdSZXN1bWUnLFxyXG4gICAgdXJsOiAnL3Jlc3VtZScsXHJcbiAgICBpY29uOiAncmVzdW1lJ1xyXG4gIH1dO1xyXG4gIFxyXG4gICRzY29wZS50b2dnbGVTaWRlTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJG1kU2lkZW5hdignc2lkZU5hdicpLnRvZ2dsZSgpXHJcbiAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJG1kU2lkZW5hdignc2lkZU5hdicpLmlzT3BlbigpKSB7XHJcbiAgICAgICAgdmFyIGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21kLXNpZGVuYXYtYmFja2Ryb3AnKTtcclxuICAgICAgICBpZihiYWNrZHJvcEVsZW1lbnQpIHtcclxuICAgICAgICAgIGJhY2tkcm9wRWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbmltYXRlVG9NZW51KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkbG9jYXRpb24ucGF0aCh1cmwpO1xyXG4gIH07XHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignUHJvamVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kRGlhbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnbWQtdGVhbC10cmkuanBnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIkV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9lZi5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiaW5mb1wiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9vbGQtcy5wbmcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9XZWJzaXRlJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZSdcbiAgICB9LFxuICAgICdtZWFuJzoge1xuICAgICAgXCJuYW1lXCI6IFwiTUVBTiBTa2VsZXRvblwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcvaW1ncy9wcm9qZWN0cy9tZC1vcmFuZ2UtcHlyYW1pZHMucG5nJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWVhbi1za2VsZXRvbicsXG4gICAgICBcImRlbW9MaW5rXCI6ICcnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnbW9kZXJhdG9yJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ2VuZ2FnZSBNb2RlcmF0b3JcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnL2ltZ3MvcHJvamVjdHMvbWQtdGVhbC10cmkuanBnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImluZm9cIjogJ1doaWxlIHdvcmtpbmcgb24gQ2VuZ2FnZSBNb2RlcmF0b3IsIEkgaW1wbGVtZW50ZWQ6IFxcblxcdCBVc2VyIEFjY291bnQgQ3JlYXRpb24vQ29uZmlybWF0aW9uIFxcblxcdCBVc2VyIEF1dGhlbnRpY2F0aW9uIFxcblxcdCBBY2NvdW50IFJlY292ZXJ5L0ZvcmdvdCBQYXNzd29yZD8nICsgXG4gICAgICAgICAgICAgICdcXG5cXHQgRmF2b3JpdGluZyBhbmQgVm90aW5nIG9uIFF1ZXN0aW9ucyBcXG5cXHQgVXNlciBQcm9maWxlcyBcXG5cXHQgVXNlciBSb2xlcy9QZXJtaXNzaW9ucyB3aXRoIENhbkNhbiAoQWRtaW5zLCBNb2RlcmF0b3JzLCBVc2VycykgXFxuXFx0IE1hbnkgRnJvbnQtZW5kIFVJIGZlYXR1cmVzJyArIFxuICAgICAgICAgICAgICAnXFxuXFxuXFx0IEkgYWxzbyBzZXQgdXAgQXV0b21hdGVkIFVuaXQgYW5kIEludGVncmF0aW9uIFRlc3RpbmcgRnJhbWV3b3JrcyB3aXRoIHJTcGVjIFxcblxcdCcsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vbW9kZXJhdG9yLmNlbmdhZ2UuY29tJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ2Nzc0xvZ29zJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ1NTIExvZ29zXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJy9pbWdzL3Byb2plY3RzL21kLWdyZXktY2lyY2xlLnBuZycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL2Nzcy1sb2dvcycsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkLmdpdGh1Yi5pby9jc3MtbG9nb3MvJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUub3BlblByb2plY3RJbmZvID0gZnVuY3Rpb24oZXYsIG5hbWUpIHtcbiAgICAkbWREaWFsb2cuc2hvdyhcbiAgICAgICRtZERpYWxvZy5hbGVydCgpXG4gICAgICAgIC5wYXJlbnQoYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpKVxuICAgICAgICAudGl0bGUoJHNjb3BlLmFsbFByb2plY3RzW25hbWVdWyduYW1lJ10pXG4gICAgICAgIC5jb250ZW50KCRzY29wZS5hbGxQcm9qZWN0c1tuYW1lXVsnaW5mbyddKVxuICAgICAgICAuYXJpYUxhYmVsKCRzY29wZS5hbGxQcm9qZWN0c1tuYW1lXVsnbmFtZSddICsgJyBJbmZvJylcbiAgICAgICAgLm9rKCdJbXByZXNzaXZlIScpXG4gICAgICAgIC50YXJnZXRFdmVudChldilcbiAgICApO1xuICB9O1xuXG4gIFxufSk7XG5hcHAuZGlyZWN0aXZlKCdwcm9qSW1nJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKXtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3Byb2pJbWcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdmFsdWUgKycpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTsiLCJhcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgJHNjb3BlLmhvYmJpZXMgPSBbe1xuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcbiAgICBkZXNjOiBbXCJJIGxlYXJuZWQgdG8gcmlkZSBhYm91dCBhIHllYXIgYWdvLCBhbmQgbGVhcm5pbmcgbWlnaHQgaGF2ZSBiZWVuIG9uZSBvZiB0aGVcIiArXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBldmVyIGRvbmUuIEl0XFwncyBhIHJlYWxseSBmdW4gd2F5IHRvIGdldFwiICtcbiAgICAgICAgICBcIiBhcm91bmQgYW5kIGFuIGV2ZW4gYmV0dGVyIHdheSB0byBzdGF5IGFjdGl2ZS5cIixcbiAgICAgICAgICBcIiBJIGV2ZW4gbWFuYWdlZCB0byBkZXNpZ24gYSBkZWNhbCBhbmQgcGFpbnQgaXQgb250byBteSBib2FyZCFcIl1cbiAgfSx7XG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcbiAgICBkZXNjOiBbXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzIGludG8gYnVpbGRpbmcgYSBtdWx0aXZlcnNlLlwiLFxuICAgICAgICAgIFwiVGhlcmUgYXJlIHNvIG1hbnkgbW92aW5nIHBhcnRzIHRvIGZhY3RvciBpbiBhbmQgaXRcXCdzIGFtYXppbmcgdG8gc2VlIGhvdyBcIiArIFxuICAgICAgICAgIFwiIGF1dGhvcnMgY2FuIGNvbnRpbnVlIHRvIGlubm92YXRlIHRoZSBjaGFyYWN0ZXJzIGFuZCBwcmVzZW50IHRoZWlyIGZhbnMgd2l0aCBuZXcgdG9waWNzIHRvIHRoaW5rIGFib3V0IGV2ZXJ5IGlzc3VlLlwiXSxcbiAgICBsaW5rOiBcIiNjb21pY3NcIlxuICB9LHtcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxuICAgIGRlc2M6IFtcIklcXCdtIGEgZnVsbC1zdGFjayB3ZWIgZGV2ZWxvcGVyIHdobyBoYXBwZW5zIHRvIHdyaXRlIGxvdHMgb2YgSmF2YXNjcmlwdC4gXCIsXG4gICAgICAgICAgXCJJIHN0YXJ0ZWQgb2ZmIGJ1aWxkaW5nIGFwcHMgd2l0aCBSdWJ5IG9uIFJhaWxzIGFuZCBoYXZlIG1vdmVkIG9uIHRvXCIgK1xuICAgICAgICAgIFwiIE5vZGUgYW5kIEV4cHJlc3MuIFdoYXQgeW91XFwncmUgbG9va2luZyBhdCByaWdodCBub3cgd2FzIGFjdHVhbGx5IGJ1aWx0IHdpdGggXCIgK1xuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIGhlcmVcIl0sXG4gICAgbGluazogXCJcIlxuICB9XTtcblxuICAkc2NvcGUuY29udGFjdEluZm9zID0gW3tcbiAgICBpZDogJ2J0bi10d2l0dGVyJyxcbiAgICBsYWJlbDogJ1RXSVRURVInLFxuICAgIHVybDogJ2h0dHBzOi8vdHdpdHRlci5jb20vYWxmcmVkYWJhYl9pbydcbiAgfSwge1xuICAgIGlkOiAnYnRuLWdpdGh1YicsXG4gICAgbGFiZWw6ICdHSVRIVUInLFxuICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQnXG4gIH0sIHtcbiAgICBpZDogJ2J0bi1saW5rZWRpbicsXG4gICAgbGFiZWw6ICdMSU5LRURJTicsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FsZnJlZGFiYWJpby9lbidcbiAgfSwge1xuICAgIGlkOiAnYnRuLWVtYWlsJyxcbiAgICBsYWJlbDogJ0VNQUlMJyxcbiAgICB1cmw6ICcnXG4gIH1dO1xuXG4gICRzY29wZS5hYm91dFRleHQgPSB7ICAgICAgICAgIFxuICAgIGludHJvOiBcIkhpLCBJXFwnbSBBbGZyZWQuXCIsICAgICBcbiAgICBib2R5OiBbXG4gICAgICBcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXG4gICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IEdvb2dsaW5nIGl0IGxvbmcgZW5vdWdoLlwiLFxuICAgICAgXCJBbHNvLCBteSBmcmllbmRzIHRoaW5rIElcXCdtIGEgcHJldHR5IGNvb2wgZ3V5IChldmVuIHRob3VnaCB0aGV5XFwnbGwgZGVueSBpdCBhZnRlciByZWFkaW5nIHRoaXMuKVwiXVxuICB9OyAgXG59KTsiLCIoZnVuY3Rpb24gKG5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiBcbiAgdmFyIGFwcCA9IG5nLm1vZHVsZSgnbmdMb2FkU2NyaXB0JywgW10pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3NjcmlwdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIFxuICAgICAge1xuICAgICAgICBpZiAoYXR0ci50eXBlPT09J3RleHQvamF2YXNjcmlwdC1sYXp5JykgXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdmFyIHNyYyA9IGVsZW0uYXR0cignc3JjJyk7XG4gICAgICAgICAgaWYoc3JjIT09dW5kZWZpbmVkKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgIHMudGV4dCA9IGNvZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuIFxufShhbmd1bGFyKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9