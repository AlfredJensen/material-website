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

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {

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
    url: 'code',
    icon: ''
  }, {
    name: 'Comics',
    url: 'comics',
    icon: ''
  }, {
    name: 'Resume',
    url: 'resume',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLmpzIiwibGF6eS1qYXZhc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hbGZyZWQtbWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYWxmcmVkTWF0ZXJpYWwnLCBbJ25nTWF0ZXJpYWwnLCAnbmdSb3V0ZScsICduZ0xvYWRTY3JpcHQnXSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgIHRpdGxlOiAnSG9tZSdcclxuICAgIH0pXHJcbiAgICAud2hlbignL2NvZGUnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3Byb2plY3RzL3Byb2plY3RzLmh0bWwnLFxyXG4gICAgICB0aXRsZTogJ0NvZGUnXHJcbiAgICB9KVxyXG4gICAgLndoZW4oJy9jb21pY3MnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2xpYnJhcnkvbGlicmFyeS5odG1sJyxcclxuICAgICAgdGl0bGU6ICdDb21pY3MnXHJcbiAgICB9KVxyXG4gICAgLm90aGVyd2lzZSh7XHJcbiAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nKSB7XHJcblxyXG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICRzY29wZS5wYWdlVGl0bGUgPSBkYXRhLnRpdGxlO1xyXG4gIH0pO1xyXG4gXHJcbiAgJHNjb3BlLmhvYmJpZXMgPSBbe1xyXG4gICAgbmFtZTogXCJMb25nYm9hcmRlclwiLFxyXG4gICAgZGVzYzogXCJJIGxlYXJuZWQgdG8gcmlkZSBhYm91dCBhIHllYXIgYWdvLCBhbmQgaXQgbWlnaHQgaGF2ZSBiZWVuIG9uZSBvZiB0aGVcIiArXHJcbiAgICAgICAgICBcIiAgYmVzdCB0aGluZ3MgSVxcJ3ZlIGRvbmUgaW4gYXdoaWxlLiBJdHMgYSByZWFsbHkgZnVuIHdheSB0byBnZXRcIiArXHJcbiAgICAgICAgICBcIiBhcm91bmQgYW5kIGFuIGV2ZW4gYmV0dGVyIHdheSB0byBzdGF5IGFjdGl2ZS4gSSBhbHNvIG1hbmFnZWQgdG9cIiArXHJcbiAgICAgICAgICBcIiBkZXNpZ24gYW5kIHBhaW50IG15IG93biBkZWNhbCBvbnRvIG15IGJvYXJkIVwiXHJcbiAgfSx7XHJcbiAgICBuYW1lOiBcIkNvbWljIFJlYWRlclwiLFxyXG4gICAgZGVzYzogXCJJXFwnbSBhIGh1Z2UgREMgY29taWNzIGZhbi4gSSBjYW4gYXBwcmVjaWF0ZSB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBnb2VzXCIgKyBcclxuICAgICAgICAgIFwiIGludG8gYnVpbGRpbmcgbm90IG9ubHkgYSB1bml2ZXJzZSwgYnV0IGEgbXVsdGl2ZXJzZS4gVGhlcmUgYXJlIHNvIG1hbnkgbW92aW5nIHBhcnRzIHRvIGZhY3RvciBpblwiICtcclxuICAgICAgICAgIFwiIGFuZCBpdHMgYW1hemluZyB0byBzZWUgaG93IGF1dGhvcnMgY2FuIHN0aWNrIHRvIGNhbm9uLCBidXQgYWxzbyBjb250aW51ZSB0byBpbm5vdmF0ZSBcIiArXHJcbiAgICAgICAgICBcInRoZSBzdG9yeSBhbmQgcHJlc2VudCB0aGVpciBmYW5zIHdpdGggbmV3IGlkZWFzIGV2ZXJ5IGlzc3VlLlwiLFxyXG4gICAgbGluazogXCIjY29taWNzXCJcclxuICB9LHtcclxuICAgIG5hbWU6IFwiRGV2ZWxvcGVyXCIsXHJcbiAgICBkZXNjOiBcIklcXCdtIGEgZnVsbC1zdGFjayB3ZWIgZGV2ZWxvcGVyLiBKYXZhc2NyaXB0IGlzIG15IHdlYXBvbiBvZiBjaG9pY2UuIFwiICtcclxuICAgICAgICAgIFwiSSBzdGFydGVkIG9mZiBidWlsZGluZyBhcHBzIHdpdGggUnVieSBvbiBSYWlscyBhbmQgaGF2ZSBtb3ZlZCBvbiB0b1wiICtcclxuICAgICAgICAgIFwicmVhbGx5IGVuam95aW5nIE5vZGUgYW5kIEV4cHJlc3MuIFdoYXQgeW91XFwncmUgbG9va2luZyBhdCByaWdodCBub3cgd2FzIGFjdHVhbGx5IGJ1aWx0IHdpdGggXCIgK1xyXG4gICAgICAgICAgXCJOb2RlIGFuZCBFeHByZXNzLCBhbmQgYSBnZW5lcm91cyBhbW91bnQgb2YgQW5ndWxhci4gQ2hlY2sgb3V0IG15IG90aGVyIHdvcmsgaGVyZVwiLFxyXG4gICAgbGluazogXCJcIlxyXG4gIH1dO1xyXG5cclxuICAkc2NvcGUuY29udGFjdEluZm9zID0gW3tcclxuICAgIGlkOiAnYnRuLXR3aXR0ZXInLFxyXG4gICAgbGFiZWw6ICdUV0lUVEVSJyxcclxuICAgIHVybDogJ2h0dHBzOi8vdHdpdHRlci5jb20vYWxmcmVkYWJhYl9pbydcclxuICB9LCB7XHJcbiAgICBpZDogJ2J0bi1naXRodWInLFxyXG4gICAgbGFiZWw6ICdHSVRIVUInLFxyXG4gICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZCdcclxuICB9LCB7XHJcbiAgICBpZDogJ2J0bi1saW5rZWRpbicsXHJcbiAgICBsYWJlbDogJ0xJTktFRElOJyxcclxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbGZyZWRhYmFiaW8vZW4nXHJcbiAgfSwge1xyXG4gICAgaWQ6ICdidG4tZW1haWwnLFxyXG4gICAgbGFiZWw6ICdFTUFJTCcsXHJcbiAgICB1cmw6ICcnXHJcbiAgfV07XHJcblxyXG4gICRzY29wZS5uYXZMaW5rcyA9IFt7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICB1cmw6ICcvJyxcclxuICAgIGljb246ICcnXHJcbiAgfSx7XHJcbiAgICBuYW1lOiAnQ29kZScsXHJcbiAgICB1cmw6ICdjb2RlJyxcclxuICAgIGljb246ICcnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ0NvbWljcycsXHJcbiAgICB1cmw6ICdjb21pY3MnLFxyXG4gICAgaWNvbjogJydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUmVzdW1lJyxcclxuICAgIHVybDogJ3Jlc3VtZScsXHJcbiAgICBpY29uOiAnJ1xyXG4gIH1dO1xyXG5cclxuICAkc2NvcGUuYWJvdXRUZXh0ID0geyAgICAgICAgICBcclxuICAgIGludHJvOiBcIkhpLCBJXFwnbSBBbGZyZWQuXCIsICAgICBcclxuICAgIGJvZHk6IFwiSVxcJ20gYSBDb21wdXRlciBTY2llbmNlIHN0dWRlbnQgYXQgTm9ydGhlYXN0ZXJuLCBhbiBhbWF0ZXVyIHBvb2wgKHBvY2tldCBiaWxsaWFyZHMpIHBsYXllciwgXCIgKyBcclxuICAgICAgICAgIFwiYW5kIGEgZmlybSBiZWxpZXZlciB0aGF0IGFueW9uZSBjYW4gbGVhcm4gdG8gZG8gYW55dGhpbmcgYnkgdmlzaXRpbmcgdGhlXCIgK1xyXG4gICAgICAgICAgXCJhcHByb3ByaWF0ZSBzdWJyZWRkaXQuIFxcbiBNeSBmcmllbmRzIHRoaW5rIElcXCdtIGEgcHJldHR5IGNvb2wgZ3V5LCB0aG91Z2ggdGhleVxcJ2xsIGRlbnkgaXQgYWZ0ZXIgcmVhZGluZyB0aGlzLlwiXHJcbiAgfTsgIFxyXG5cclxuICAkc2NvcGUudG9nZ2xlU2lkZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICRtZFNpZGVuYXYoJ3NpZGVOYXYnKS50b2dnbGUoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCRtZFNpZGVuYXYoJ3NpZGVOYXYnKS5pc09wZW4oKSkge1xyXG4gICAgICAgIHZhciBiYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZC1zaWRlbmF2LWJhY2tkcm9wJyk7XHJcbiAgICAgICAgaWYoYmFja2Ryb3BFbGVtZW50KSB7XHJcbiAgICAgICAgICBiYWNrZHJvcEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZVRvTWVudSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxufSk7XHJcbiIsImFwcC5jb250cm9sbGVyKCdQcm9qZWN0c0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nKSB7XG5cbiAgJHNjb3BlLmFsbFByb2plY3RzID0ge1xuICAgICdtZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJBbGZyZWQgTWF0ZXJpYWxcIixcbiAgICAgIFwic2NyZWVuc2hvdFwiOiAnJyxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogJycsXG4gICAgICBcInJlcG9zaXRvcnlcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvbWF0ZXJpYWwtd2Vic2l0ZScsXG4gICAgICBcImRlbW9MaW5rXCI6ICdodHRwOi8vYWxmcmVkYWJhYi5pbycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdlZic6IHtcbiAgICAgIFwibmFtZVwiOiBcIlR1cmJvVGF4IEV4ZW1wdGlvbiBDaGVja1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJ2h0dHBzOi8vdHVyYm90YXguaW50dWl0LmNvbS9oZWFsdGgtY2FyZS9leGVtcHRpb25zJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ21lYW4nOiB7XG4gICAgICBcIm5hbWVcIjogXCJNRUFOIFNrZWxldG9uXCIsXG4gICAgICBcInNjcmVlbnNob3RcIjogJycsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6ICcnLFxuICAgICAgXCJyZXBvc2l0b3J5XCI6ICdodHRwczovL2dpdGh1Yi5jb20vYWxmcmVkL21lYW4tc2tlbGV0b24nLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH0sXG4gICAgJ29sZFNpdGUnOiB7XG4gICAgICBcIm5hbWVcIjogXCJPbGQgV2Vic2l0ZVwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbGZyZWQvV2Vic2l0ZSdcbiAgICB9LFxuICAgICdtb2RlcmF0b3InOiB7XG4gICAgICBcIm5hbWVcIjogXCJDZW5nYWdlIE1vZGVyYXRvclwiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnJyxcbiAgICAgIFwiZGVtb0xpbmtcIjogJycsXG4gICAgICBcInRlY2hcIjogW10sXG4gICAgICBcImxlYXJuZWRcIjogJydcbiAgICB9LFxuICAgICdjc3NMb2dvcyc6IHtcbiAgICAgIFwibmFtZVwiOiBcIkNTUyBMb2dvc1wiLFxuICAgICAgXCJzY3JlZW5zaG90XCI6ICcnLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiAnJyxcbiAgICAgIFwicmVwb3NpdG9yeVwiOiAnaHR0cHM6Ly9naXRodWIuY29tL2FsZnJlZC9jc3MtbG9nb3MnLFxuICAgICAgXCJkZW1vTGlua1wiOiAnJyxcbiAgICAgIFwidGVjaFwiOiBbXSxcbiAgICAgIFwibGVhcm5lZFwiOiAnJ1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUuYWN0aXZlUHJldmlldyA9ICRzY29wZS5hbGxQcm9qZWN0c1snbWVhbiddO1xuXG5cbiAgJHNjb3BlLnNldEFzQWN0aXZlUHJldmlldyA9IGZ1bmN0aW9uKG5ld0FjdGl2ZUlkKSB7XG4gICAgJHNjb3BlLmFjdGl2ZVByZXZpZXcgPSAkc2NvcGUuYWxsUHJvamVjdHNbbmV3QWN0aXZlSWRdO1xuICB9O1xuXG4gIFxufSk7IiwiKGZ1bmN0aW9uIChuZykge1xuICAndXNlIHN0cmljdCc7XG4gXG4gIHZhciBhcHAgPSBuZy5tb2R1bGUoJ25nTG9hZFNjcmlwdCcsIFtdKTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JpcHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSBcbiAgICAgIHtcbiAgICAgICAgaWYgKGF0dHIudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQtbGF6eScpIFxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgIHMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHZhciBzcmMgPSBlbGVtLmF0dHIoJ3NyYycpO1xuICAgICAgICAgIGlmKHNyYyE9PXVuZGVmaW5lZClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY29kZSA9IGVsZW0udGV4dCgpO1xuICAgICAgICAgICAgICBzLnRleHQgPSBjb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiBcbn0oYW5ndWxhcikpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==