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
      templateUrl: '/views/home.html',
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

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $location) {

  $scope.$on('$routeChangeSuccess', function (event, data) {
    $scope.pageTitle = data.title;
  });
 
  $scope.hobbies = [{
    name: "Longboarder",
    desc: "I learned to ride about a year ago, and it might have been one of the" +
          "  best things I\'ve done in awhile. Its a really fun way to get" +
          " around and an even better way to stay active. I also managed to" +
          " design and paint my own decal onto my board!"
  },{
    name: "Comic Reader",
    desc: "I\'m a huge DC comics fan. I can appreciate the amount of work that goes" + 
          " into building not only a universe, but a multiverse. There are so many moving parts to factor in" +
          " and its amazing to see how authors can stick to canon, but also continue to innovate " +
          "the story and present their fans with new ideas every issue.",
    link: "#comics"
  },{
    name: "Developer",
    desc: "I\'m a full-stack web developer. Javascript is my weapon of choice. " +
          "I started off building apps with Ruby on Rails and have moved on to" +
          "really enjoying Node and Express. What you\'re looking at right now was actually built with " +
          "Node and Express, and a generous amount of Angular. Check out my other work here",
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

  $scope.navLinks = [{
    name: 'Home',
    url: '/',
    icon: ''
  },{
    name: 'Code',
    url: '/code',
    icon: ''
  }, {
    name: 'Comics',
    url: '/comics',
    icon: ''
  }, {
    name: 'Resume',
    url: '/resume',
    icon: ''
  }];

  $scope.aboutText = {          
    intro: "Hi, I\'m Alfred.",     
    body: "I\'m a Computer Science student at Northeastern, an amateur pool (pocket billiards) player, " + 
          "and a firm believer that anyone can learn to do anything by visiting the" +
          "appropriate subreddit. \n My friends think I\'m a pretty cool guy, though they\'ll deny it after reading this."
  };  

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
  }

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
      "screenshot": '',
      "description": '',
      "repository": '',
      "demoLink": 'https://turbotax.intuit.com/health-care/exemptions',
      "tech": [],
      "learned": ''
    },
    'mean': {
      "name": "MEAN Skeleton",
      "screenshot": '',
      "description": '',
      "repository": 'https://github.com/alfred/mean-skeleton',
      "demoLink": '',
      "tech": [],
      "learned": ''
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '',
      "description": '',
      "repository": '',
      "demoLink": '',
      "tech": [],
      "learned": 'https://github.com/alfred/Website'
    },
    'moderator': {
      "name": "Cengage Moderator",
      "screenshot": '',
      "description": '',
      "repository": '',
      "demoLink": '',
      "tech": [],
      "learned": ''
    },
    'cssLogos': {
      "name": "CSS Logos",
      "screenshot": '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwibGF6eS1qYXZhc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FsZnJlZC1tYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhbGZyZWRNYXRlcmlhbCcsIFsnbmdNYXRlcmlhbCcsICduZ1JvdXRlJywgJ25nTG9hZFNjcmlwdCddKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gIC5hY2NlbnRQYWxldHRlKCdhbWJlcicpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignLycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdIb21lJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29kZScsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcHJvamVjdHMvcHJvamVjdHMuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29kZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvbWljcycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvbGlicmFyeS9saWJyYXJ5Lmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvbWljcydcclxuICAgIH0pXHJcbiAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRsb2NhdGlvbikge1xyXG5cclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUucGFnZVRpdGxlID0gZGF0YS50aXRsZTtcclxuICB9KTtcclxuIFxyXG4gICRzY29wZS5ob2JiaWVzID0gW3tcclxuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcclxuICAgIGRlc2M6IFwiSSBsZWFybmVkIHRvIHJpZGUgYWJvdXQgYSB5ZWFyIGFnbywgYW5kIGl0IG1pZ2h0IGhhdmUgYmVlbiBvbmUgb2YgdGhlXCIgK1xyXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBkb25lIGluIGF3aGlsZS4gSXRzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xyXG4gICAgICAgICAgXCIgYXJvdW5kIGFuZCBhbiBldmVuIGJldHRlciB3YXkgdG8gc3RheSBhY3RpdmUuIEkgYWxzbyBtYW5hZ2VkIHRvXCIgK1xyXG4gICAgICAgICAgXCIgZGVzaWduIGFuZCBwYWludCBteSBvd24gZGVjYWwgb250byBteSBib2FyZCFcIlxyXG4gIH0se1xyXG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcclxuICAgIGRlc2M6IFwiSVxcJ20gYSBodWdlIERDIGNvbWljcyBmYW4uIEkgY2FuIGFwcHJlY2lhdGUgdGhlIGFtb3VudCBvZiB3b3JrIHRoYXQgZ29lc1wiICsgXHJcbiAgICAgICAgICBcIiBpbnRvIGJ1aWxkaW5nIG5vdCBvbmx5IGEgdW5pdmVyc2UsIGJ1dCBhIG11bHRpdmVyc2UuIFRoZXJlIGFyZSBzbyBtYW55IG1vdmluZyBwYXJ0cyB0byBmYWN0b3IgaW5cIiArXHJcbiAgICAgICAgICBcIiBhbmQgaXRzIGFtYXppbmcgdG8gc2VlIGhvdyBhdXRob3JzIGNhbiBzdGljayB0byBjYW5vbiwgYnV0IGFsc28gY29udGludWUgdG8gaW5ub3ZhdGUgXCIgK1xyXG4gICAgICAgICAgXCJ0aGUgc3RvcnkgYW5kIHByZXNlbnQgdGhlaXIgZmFucyB3aXRoIG5ldyBpZGVhcyBldmVyeSBpc3N1ZS5cIixcclxuICAgIGxpbms6IFwiI2NvbWljc1wiXHJcbiAgfSx7XHJcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxyXG4gICAgZGVzYzogXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3Blci4gSmF2YXNjcmlwdCBpcyBteSB3ZWFwb24gb2YgY2hvaWNlLiBcIiArXHJcbiAgICAgICAgICBcIkkgc3RhcnRlZCBvZmYgYnVpbGRpbmcgYXBwcyB3aXRoIFJ1Ynkgb24gUmFpbHMgYW5kIGhhdmUgbW92ZWQgb24gdG9cIiArXHJcbiAgICAgICAgICBcInJlYWxseSBlbmpveWluZyBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcclxuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIGhlcmVcIixcclxuICAgIGxpbms6IFwiXCJcclxuICB9XTtcclxuXHJcbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XHJcbiAgICBpZDogJ2J0bi10d2l0dGVyJyxcclxuICAgIGxhYmVsOiAnVFdJVFRFUicsXHJcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXHJcbiAgfSwge1xyXG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcclxuICAgIGxhYmVsOiAnR0lUSFVCJyxcclxuICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQnXHJcbiAgfSwge1xyXG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxyXG4gICAgbGFiZWw6ICdMSU5LRURJTicsXHJcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAnYnRuLWVtYWlsJyxcclxuICAgIGxhYmVsOiAnRU1BSUwnLFxyXG4gICAgdXJsOiAnJ1xyXG4gIH1dO1xyXG5cclxuICAkc2NvcGUubmF2TGlua3MgPSBbe1xyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgdXJsOiAnLycsXHJcbiAgICBpY29uOiAnJ1xyXG4gIH0se1xyXG4gICAgbmFtZTogJ0NvZGUnLFxyXG4gICAgdXJsOiAnL2NvZGUnLFxyXG4gICAgaWNvbjogJydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnQ29taWNzJyxcclxuICAgIHVybDogJy9jb21pY3MnLFxyXG4gICAgaWNvbjogJydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgaWNvbjogJydcclxuICB9XTtcclxuXHJcbiAgJHNjb3BlLmFib3V0VGV4dCA9IHsgICAgICAgICAgXHJcbiAgICBpbnRybzogXCJIaSwgSVxcJ20gQWxmcmVkLlwiLCAgICAgXHJcbiAgICBib2R5OiBcIklcXCdtIGEgQ29tcHV0ZXIgU2NpZW5jZSBzdHVkZW50IGF0IE5vcnRoZWFzdGVybiwgYW4gYW1hdGV1ciBwb29sIChwb2NrZXQgYmlsbGlhcmRzKSBwbGF5ZXIsIFwiICsgXHJcbiAgICAgICAgICBcImFuZCBhIGZpcm0gYmVsaWV2ZXIgdGhhdCBhbnlvbmUgY2FuIGxlYXJuIHRvIGRvIGFueXRoaW5nIGJ5IHZpc2l0aW5nIHRoZVwiICtcclxuICAgICAgICAgIFwiYXBwcm9wcmlhdGUgc3VicmVkZGl0LiBcXG4gTXkgZnJpZW5kcyB0aGluayBJXFwnbSBhIHByZXR0eSBjb29sIGd1eSwgdGhvdWdoIHRoZXlcXCdsbCBkZW55IGl0IGFmdGVyIHJlYWRpbmcgdGhpcy5cIlxyXG4gIH07ICBcclxuXHJcbiAgJHNjb3BlLnRvZ2dsZVNpZGVNZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkbWRTaWRlbmF2KCdzaWRlTmF2JykudG9nZ2xlKClcclxuICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmICgkbWRTaWRlbmF2KCdzaWRlTmF2JykuaXNPcGVuKCkpIHtcclxuICAgICAgICB2YXIgYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWQtc2lkZW5hdi1iYWNrZHJvcCcpO1xyXG4gICAgICAgIGlmKGJhY2tkcm9wRWxlbWVudCkge1xyXG4gICAgICAgICAgYmFja2Ryb3BFbGVtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVUb01lbnUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICRsb2NhdGlvbi5wYXRoKHVybCk7XHJcbiAgfVxyXG5cclxufSk7XHJcbiIsImFwcC5jb250cm9sbGVyKCdQcm9qZWN0c0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIlR1cmJvVGF4IEV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21lYW4tc2tlbGV0b24nLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZSdcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUuYWN0aXZlUHJldmlldyA9ICRzY29wZS5hbGxQcm9qZWN0c1snbWVhbiddO1xuXG5cbiAgJHNjb3BlLnNldEFzQWN0aXZlUHJldmlldyA9IGZ1bmN0aW9uKG5ld0FjdGl2ZUlkKSB7XG4gICAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbbmV3QWN0aXZlSWRdO1xuICB9O1xuXG4gIFxufSk7IiwiKGZ1bmN0aW9uIChuZykge1xuICAndXNlIHN0cmljdCc7XG4gXG4gIHZhciBhcHAgPSBuZy5tb2R1bGUoJ25nTG9hZFNjcmlwdCcsIFtdKTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JpcHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSBcbiAgICAgIHtcbiAgICAgICAgaWYgKGF0dHIudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQtbGF6eScpIFxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgIHMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHZhciBzcmMgPSBlbGVtLmF0dHIoJ3NyYycpO1xuICAgICAgICAgIGlmKHNyYyE9PXVuZGVmaW5lZClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY29kZSA9IGVsZW0udGV4dCgpO1xuICAgICAgICAgICAgICBzLnRleHQgPSBjb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiBcbn0oYW5ndWxhcikpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==