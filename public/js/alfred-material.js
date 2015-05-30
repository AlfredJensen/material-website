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

app.config(function($mdIconProvider) {
  $mdIconProvider
    .icon('demo', 'icons/desktop\ mac.svg')
    .icon('github', 'icons/github.svg')
    .icon('comic', 'icons/dashboard.svg')
    .icon('code','icons/code.svg')
    .icon('resume','icons/description.svg')
    .icon('home','icons/home.svg');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwibGF6eS1qYXZhc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvYWxmcmVkLW1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FsZnJlZE1hdGVyaWFsJywgWyduZ01hdGVyaWFsJywgJ25nUm91dGUnLCAnbmdMb2FkU2NyaXB0J10pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgLmFjY2VudFBhbGV0dGUoJ2FtYmVyJyk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgJHJvdXRlUHJvdmlkZXJcclxuICAgIC53aGVuKCcvJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0hvbWUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb2RlJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9wcm9qZWN0cy9wcm9qZWN0cy5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb2RlJ1xyXG4gICAgfSlcclxuICAgIC53aGVuKCcvY29taWNzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9saWJyYXJ5L2xpYnJhcnkuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnQ29taWNzJ1xyXG4gICAgfSlcclxuICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyXHJcbiAgICAuaWNvbignZGVtbycsICdpY29ucy9kZXNrdG9wXFwgbWFjLnN2ZycpXHJcbiAgICAuaWNvbignZ2l0aHViJywgJ2ljb25zL2dpdGh1Yi5zdmcnKVxyXG4gICAgLmljb24oJ2NvbWljJywgJ2ljb25zL2Rhc2hib2FyZC5zdmcnKVxyXG4gICAgLmljb24oJ2NvZGUnLCdpY29ucy9jb2RlLnN2ZycpXHJcbiAgICAuaWNvbigncmVzdW1lJywnaWNvbnMvZGVzY3JpcHRpb24uc3ZnJylcclxuICAgIC5pY29uKCdob21lJywnaWNvbnMvaG9tZS5zdmcnKTtcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRsb2NhdGlvbikge1xyXG5cclxuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAkc2NvcGUucGFnZVRpdGxlID0gZGF0YS50aXRsZTtcclxuICB9KTtcclxuIFxyXG4gICRzY29wZS5ob2JiaWVzID0gW3tcclxuICAgIG5hbWU6IFwiTG9uZ2JvYXJkZXJcIixcclxuICAgIGRlc2M6IFwiSSBsZWFybmVkIHRvIHJpZGUgYWJvdXQgYSB5ZWFyIGFnbywgYW5kIGl0IG1pZ2h0IGhhdmUgYmVlbiBvbmUgb2YgdGhlXCIgK1xyXG4gICAgICAgICAgXCIgIGJlc3QgdGhpbmdzIElcXCd2ZSBkb25lIGluIGF3aGlsZS4gSXRzIGEgcmVhbGx5IGZ1biB3YXkgdG8gZ2V0XCIgK1xyXG4gICAgICAgICAgXCIgYXJvdW5kIGFuZCBhbiBldmVuIGJldHRlciB3YXkgdG8gc3RheSBhY3RpdmUuIEkgYWxzbyBtYW5hZ2VkIHRvXCIgK1xyXG4gICAgICAgICAgXCIgZGVzaWduIGFuZCBwYWludCBteSBvd24gZGVjYWwgb250byBteSBib2FyZCFcIlxyXG4gIH0se1xyXG4gICAgbmFtZTogXCJDb21pYyBSZWFkZXJcIixcclxuICAgIGRlc2M6IFwiSVxcJ20gYSBodWdlIERDIGNvbWljcyBmYW4uIEkgY2FuIGFwcHJlY2lhdGUgdGhlIGFtb3VudCBvZiB3b3JrIHRoYXQgZ29lc1wiICsgXHJcbiAgICAgICAgICBcIiBpbnRvIGJ1aWxkaW5nIG5vdCBvbmx5IGEgdW5pdmVyc2UsIGJ1dCBhIG11bHRpdmVyc2UuIFRoZXJlIGFyZSBzbyBtYW55IG1vdmluZyBwYXJ0cyB0byBmYWN0b3IgaW5cIiArXHJcbiAgICAgICAgICBcIiBhbmQgaXRzIGFtYXppbmcgdG8gc2VlIGhvdyBhdXRob3JzIGNhbiBzdGljayB0byBjYW5vbiwgYnV0IGFsc28gY29udGludWUgdG8gaW5ub3ZhdGUgXCIgK1xyXG4gICAgICAgICAgXCJ0aGUgc3RvcnkgYW5kIHByZXNlbnQgdGhlaXIgZmFucyB3aXRoIG5ldyBpZGVhcyBldmVyeSBpc3N1ZS5cIixcclxuICAgIGxpbms6IFwiI2NvbWljc1wiXHJcbiAgfSx7XHJcbiAgICBuYW1lOiBcIkRldmVsb3BlclwiLFxyXG4gICAgZGVzYzogXCJJXFwnbSBhIGZ1bGwtc3RhY2sgd2ViIGRldmVsb3Blci4gSmF2YXNjcmlwdCBpcyBteSB3ZWFwb24gb2YgY2hvaWNlLiBcIiArXHJcbiAgICAgICAgICBcIkkgc3RhcnRlZCBvZmYgYnVpbGRpbmcgYXBwcyB3aXRoIFJ1Ynkgb24gUmFpbHMgYW5kIGhhdmUgbW92ZWQgb24gdG9cIiArXHJcbiAgICAgICAgICBcInJlYWxseSBlbmpveWluZyBOb2RlIGFuZCBFeHByZXNzLiBXaGF0IHlvdVxcJ3JlIGxvb2tpbmcgYXQgcmlnaHQgbm93IHdhcyBhY3R1YWxseSBidWlsdCB3aXRoIFwiICtcclxuICAgICAgICAgIFwiTm9kZSBhbmQgRXhwcmVzcywgYW5kIGEgZ2VuZXJvdXMgYW1vdW50IG9mIEFuZ3VsYXIuIENoZWNrIG91dCBteSBvdGhlciB3b3JrIGhlcmVcIixcclxuICAgIGxpbms6IFwiXCJcclxuICB9XTtcclxuXHJcbiAgJHNjb3BlLmNvbnRhY3RJbmZvcyA9IFt7XHJcbiAgICBpZDogJ2J0bi10d2l0dGVyJyxcclxuICAgIGxhYmVsOiAnVFdJVFRFUicsXHJcbiAgICB1cmw6ICdodHRwczovL3R3aXR0ZXIuY29tL2FsZnJlZGFiYWJfaW8nXHJcbiAgfSwge1xyXG4gICAgaWQ6ICdidG4tZ2l0aHViJyxcclxuICAgIGxhYmVsOiAnR0lUSFVCJyxcclxuICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQnXHJcbiAgfSwge1xyXG4gICAgaWQ6ICdidG4tbGlua2VkaW4nLFxyXG4gICAgbGFiZWw6ICdMSU5LRURJTicsXHJcbiAgICB1cmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYWxmcmVkYWJhYmlvL2VuJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAnYnRuLWVtYWlsJyxcclxuICAgIGxhYmVsOiAnRU1BSUwnLFxyXG4gICAgdXJsOiAnJ1xyXG4gIH1dO1xyXG5cclxuICAkc2NvcGUubmF2TGlua3MgPSBbe1xyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgdXJsOiAnLycsXHJcbiAgICBpY29uOiAnaG9tZSdcclxuICB9LHtcclxuICAgIG5hbWU6ICdDb2RlJyxcclxuICAgIHVybDogJy9jb2RlJyxcclxuICAgIGljb246ICdjb2RlJ1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdDb21pY3MnLFxyXG4gICAgdXJsOiAnL2NvbWljcycsXHJcbiAgICBpY29uOiAnY29taWMnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ1Jlc3VtZScsXHJcbiAgICB1cmw6ICcvcmVzdW1lJyxcclxuICAgIGljb246ICdyZXN1bWUnXHJcbiAgfV07XHJcblxyXG4gICRzY29wZS5hYm91dFRleHQgPSB7ICAgICAgICAgIFxyXG4gICAgaW50cm86IFwiSGksIElcXCdtIEFsZnJlZC5cIiwgICAgIFxyXG4gICAgYm9keTogXCJJXFwnbSBhIENvbXB1dGVyIFNjaWVuY2Ugc3R1ZGVudCBhdCBOb3J0aGVhc3Rlcm4sIGFuIGFtYXRldXIgcG9vbCAocG9ja2V0IGJpbGxpYXJkcykgcGxheWVyLCBcIiArIFxyXG4gICAgICAgICAgXCJhbmQgYSBmaXJtIGJlbGlldmVyIHRoYXQgYW55b25lIGNhbiBsZWFybiB0byBkbyBhbnl0aGluZyBieSB2aXNpdGluZyB0aGVcIiArXHJcbiAgICAgICAgICBcImFwcHJvcHJpYXRlIHN1YnJlZGRpdC4gXFxuIE15IGZyaWVuZHMgdGhpbmsgSVxcJ20gYSBwcmV0dHkgY29vbCBndXksIHRob3VnaCB0aGV5XFwnbGwgZGVueSBpdCBhZnRlciByZWFkaW5nIHRoaXMuXCJcclxuICB9OyAgXHJcblxyXG4gICRzY29wZS50b2dnbGVTaWRlTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJG1kU2lkZW5hdignc2lkZU5hdicpLnRvZ2dsZSgpXHJcbiAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJG1kU2lkZW5hdignc2lkZU5hdicpLmlzT3BlbigpKSB7XHJcbiAgICAgICAgdmFyIGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21kLXNpZGVuYXYtYmFja2Ryb3AnKTtcclxuICAgICAgICBpZihiYWNrZHJvcEVsZW1lbnQpIHtcclxuICAgICAgICAgIGJhY2tkcm9wRWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbmltYXRlVG9NZW51KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAkbG9jYXRpb24ucGF0aCh1cmwpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignUHJvamVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZykge1xuXG4gICRzY29wZS5hbGxQcm9qZWN0cyA9IHtcbiAgICAnbWRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQWxmcmVkIE1hdGVyaWFsXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21hdGVyaWFsLXdlYnNpdGUnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnaHR0cDovL2FsZnJlZGFiYWIuaW8nLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnZWYnOiB7XG4gICAgICBcIm5hbWVcIjogXCJUdXJib1RheCBFeGVtcHRpb24gQ2hlY2tcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwczovL3R1cmJvdGF4LmludHVpdC5jb20vaGVhbHRoLWNhcmUvZXhlbXB0aW9ucycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdtZWFuJzoge1xuICAgICAgXCJuYW1lXCI6IFwiTUVBTiBTa2VsZXRvblwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9tZWFuLXNrZWxldG9uJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdvbGRTaXRlJzoge1xuICAgICAgXCJuYW1lXCI6IFwiT2xkIFdlYnNpdGVcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImRlbW9MaW5rXCI6ICcnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL1dlYnNpdGUnXG4gICAgfSxcbiAgICAnbW9kZXJhdG9yJzoge1xuICAgICAgXCJuYW1lXCI6IFwiQ2VuZ2FnZSBNb2RlcmF0b3JcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJycsXG4gICAgICBcImRlbW9MaW5rXCI6ICcnLFxuICAgICAgXCJ0ZWNoXCI6IFtdLFxuICAgICAgXCJsZWFybmVkXCI6ICcnXG4gICAgfSxcbiAgICAnY3NzTG9nb3MnOiB7XG4gICAgICBcIm5hbWVcIjogXCJDU1MgTG9nb3NcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvY3NzLWxvZ29zJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbJ21lYW4nXTtcblxuXG4gICRzY29wZS5zZXRBc0FjdGl2ZVByZXZpZXcgPSBmdW5jdGlvbihuZXdBY3RpdmVJZCkge1xuICAgICRzY29wZS5hY3RpdmVQcmV2aWV3ID0gJHNjb3BlLmFsbFByb2plY3RzW25ld0FjdGl2ZUlkXTtcbiAgfTtcblxuICBcbn0pOyIsIihmdW5jdGlvbiAobmcpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuIFxuICB2YXIgYXBwID0gbmcubW9kdWxlKCduZ0xvYWRTY3JpcHQnLCBbXSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgnc2NyaXB0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikgXG4gICAgICB7XG4gICAgICAgIGlmIChhdHRyLnR5cGU9PT0ndGV4dC9qYXZhc2NyaXB0LWxhenknKSBcbiAgICAgICAge1xuICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICB2YXIgc3JjID0gZWxlbS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICBpZihzcmMhPT11bmRlZmluZWQpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlbGVtLnRleHQoKTtcbiAgICAgICAgICAgICAgcy50ZXh0ID0gY29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gXG59KGFuZ3VsYXIpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=