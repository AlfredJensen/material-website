app.controller('ProjectsCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog) {

  $scope.allProjects = {
    'mdSite': {
      "name": "Alfred Material",
      "screenshot": '/imgs/projects/anotherrotated4.jpg', //_MG_2891.CR2 and anotherrotated
      "description": '',
      "repository": 'https://github.com/alfred/material-website',
      "demoLink": 'http://alfredabab.io',
      "tech": [],
      "learned": '',
      "darkOverlay": true
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
      "learned": '',
      "darkOverlay": true
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