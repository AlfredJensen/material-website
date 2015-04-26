app.controller('ProjectsCtrl', function($scope, $timeout, $mdSidenav, $log) {

  $scope.allProjects = {
    'mdSite': {
      "name": "Alfred Material",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    },
    'ef': {
      "name": "TurboTax Exemption Check",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    },
    'mean': {
      "name": "MEAN Skeleton",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    },
    'oldSite': {
      "name": "Old Website",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    },
    'moderator': {
      "name": "Cengage Moderator",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    },
    'cssLogos': {
      "name": "CSS Logos",
      "screenshot": '',
      "description": '',
      "repository": '',
      "tech": []
    }
  };

  $scope.activePreview = $scope.allProjects['mean'];


  $scope.setAsActivePreview = function(newActiveId) {
    $scope.activePreview = $scope.allProjects[newActiveId];
  };

  
});