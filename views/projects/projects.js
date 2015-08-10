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
      "demoLink": '/mean',
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
    var bodyElement = angular.element(document.body);
    var thisProject = $scope.allProjects[name];
    var dialogContent = $mdDialog.alert({
      parent: bodyElement,
      targetEvent: ev,
      template:
            '<md-dialog>' +
            '<md-toolbar>' + 
            '   <div class="md-toolbar-tools">' +
            '     <h2> {{project.name}}</h2>' +
            '   </div>' +
            '</md-toolbar>' +
            '  <md-dialog-content>'+
            '    <p> Ay P 1 </p>' +
            '  </md-dialog-content>' +
            '  <md-dialog-content>'+
            '    <p> Ay P 2 </p>' +
            '  </md-dialog-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeProjectInfo()" class="md-primary">' +
            '      Close Dialog' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
      clickOutsideToClose: true,
      escapeToClose: true,
      locals:  {
        project : thisProject
      },
      controller: function DialogController($scope, $mdDialog) {
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