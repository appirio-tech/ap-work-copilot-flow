(function () {
  'use strict';

  angular.module('ap-copilot-flow', [
    'app.constants',
    'ap-copilot-flow.projects',
    'ap-copilot-flow.project-details'
  ])

})();
(function () {
  'use strict';

  angular.module('ap-copilot-flow.project-details', [
  ])

})();

(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects', [
    ])

})();

(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('capitalize', CapitalizeFilter);

  CapitalizeFilter.$inject = [];

  function CapitalizeFilter() {
    return function(input) {
     return input.charAt(0).toUpperCase() +  input.slice(1)
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$rootScope', '$q', '$http', 'UserV3Service', 'apiUrl'];
  /* @ngInject */
  function ProjectsService($rootScope, $q, $http, UserV3Service, apiUrl) {

    var service = {

      projects: [],
      // functions
      getWorkRequests: null,
      getAssignedProjects: null

    };

    service.getWorkRequests = function() {
      var deferred = $q.defer();
      $http.get(apiUrl + 'work?filter=copilotId%3Dunassigned')
      .success(function(data, status, headers, config) {
        service.projects = data.result.content;
         deferred.resolve(data.result.content)
        }).
          error(function(data, status, headers, config) {
            console.log('error getting projects', data);
        });
        return deferred.promise
     };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
         $rootScope.$watch(UserV3Service.getCurrentUser, function(user) {
            if (user) {
            $http.get(apiUrl + 'work?filter=copilotId%3D'+user.id)
            .success(function(data, status, headers, config) {
               service.projects = data.result.content;
               deferred.resolve(data.result.content)
              })
            .error(function(data, status, headers, config) {
              console.log('error getting projects', data);
            });
            }
          })
        return deferred.promise
      }

    return service;

  }
})();

(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .factory('ProjectDetailsService', ProjectDetailsService);

  ProjectDetailsService.$inject = ['$rootScope', '$http', '$q', 'apiUrl', 'UserV3Service'];

  function ProjectDetailsService($rootScope, $http, $q, apiUrl, UserV3Service) {
    var service = {

      // variables
      work           : null,
      claimedProjectId: null,
      currentUserId: null,
      workDetails: {},

      // functions
      initializeCopilotWork : null,
      submitClaim: null,
      submitChallenges: null,
      projectAvailable: null,
      showStatusComponent: null,
      openCreateChallenges: null
    };

   service.initializeCopilotWork = function(id) {
    service.workDetails[id] = {};
    var deferred = $q.defer();
    $http.get(apiUrl+'work/'+id)
      .success(function(data, status, headers, config) {
       service.work = data.result.content;
       console.log('work request details', service.work)
        service.workDetails[id].status = service.work.status;
       deferred.resolve(service.work);
     }).
     error(function(data, status, headers, config) {
       console.log('error on work details', data)
     });

       // .then(function(data) {
       //   service.work = data.result.content;
       //   console.log('work request details', service.work);
       //   deferred.resolve(service.work);
       // }).catch(function(e) {
       //   console.log('error on initialize work', e);
       // });
       return deferred.promise;
    };

    service.submitClaim= function(projectId) {
      var user = UserV3Service.getCurrentUser();
      $http.post(apiUrl+'copilots/'+user.id+'/projects/',
        {"id": projectId}
        ).success(function(data, status, headers, config) {
         console.log('Updated project status', data);
         $rootScope.$emit('projectClaimed');
         if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
          }
            service.workDetails[projectId].status = 'Assigned';
        }).
          error(function(data, status, headers, config) {
            console.log('error on project claim', data);
        });
     };

   service.submitChallenges = function(projectId, challengesEstimate) {
    var user = UserV3Service.getCurrentUser();
    $http.put(apiUrl+'copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": challengesEstimate, "status": "estimated"}
      ). success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Estimate';
        service.workDetails[projectId].estimate = challengesEstimate;
      }).
      error(function(data, status, headers, config) {
        console.log('error on submit estimates', data);
      });
    };

   service.launchProject = function(projectId) {
    var user = UserV3Service.getCurrentUser();
    $http.put(apiUrl+'/copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": service.workDetails[projectId].estimate, "status": "launched"}
      ).success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Launched';
      }).
      error(function(data, status, headers, config) {
        console.log('error on project launch', data);
      });
    }

   service.projectAvailable = function(project, projectId) {
      var claimedProjectStatuses =
      ['Assigned',
      'Estimate',
      'Approved',
      'awaiting_launch',
      'Launched']
      if (service.workDetails[projectId]) {
        return claimedProjectStatuses.indexOf(service.workDetails[projectId].status) < 0
      } else {
      return project.status === 'Incomplete' || project.status === 'Submitted';
      }
   }

   service.showStatusComponent = function(projectId, status) {
      if (service.workDetails[projectId]) {
        return service.workDetails[projectId].status === status;
      }
   }

   service.openCreateChallenges = function(projectId) {
    if (service.workDetails[projectId]) {
      service.workDetails[projectId].status = 'awaiting_launch';
    }
   }

    return service;

  }
})();

(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('cutOff', CutOffFilter);

  CutOffFilter.$inject = [];

  function CutOffFilter() {
    return function(input) {
     input = input || '';
     if (input.length >= 20) {
      return input.substr(0, 20)
     } else {
      return input;
     }
    }
  }
})();
(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('requestType', RequestTypeFilter);

  RequestTypeFilter.$inject = [];

  function RequestTypeFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'design': 'Design',
       'code'  : 'Development',
       'both': 'Design & Development'
     };

     return typeDisplays[input]
    };
  }
})();
(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('statusButton', StatusButtonFilter);

  StatusButtonFilter.$inject = [];

  function StatusButtonFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'Assigned': 'Estimates Required',
       'Estimate'  : 'View Details',
       'Approved': 'Create Challenges',
       'Launched': 'View Details'
     };

     return typeDisplays[input] || 'View Details'
    };
  }
})();
(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('status', StatusFilter);

  StatusFilter.$inject = [];

  function StatusFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'Assigned': 'Claimed',
       'Estimate'  : 'Estimated'
     };

     return typeDisplays[input] || input;
    };
  }
})();
(function () {
  'use strict';

  var directive = function ($state) {
    var link = function (scope, element, attrs) {
      scope.hideModal = function() {
        element.hide();
      }
      if (attrs.nextStep) {
        scope.nextStep = attrs.nextStep;
      }
      scope.nextState = function() {
        scope.hideModal();
        if (attrs.nextState) {
          $state.go(attrs.nextState);
        }
      }
    };

    return {
      restrict: 'E',
      link    : link,
      transclude: true,
      scope: {
      },
      templateUrl: function(elem, attr){
      return 'views/'+attr.type+'.html';
    }
    };
  };

  directive.$inject = ['$state'];

  angular.module('ap-copilot-flow.project-details').directive('statusModal', directive);
})();

(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .controller('ChallengesController', ChallengesController);

  ChallengesController.$inject = [ '$rootScope', 'ProjectDetailsService'];

  function ChallengesController($rootScope, ProjectDetailsService) {
    var vm   = this;
    vm.work = ProjectDetailsService.work;
    vm.title = 'Challenge Estimates';
    //initialize challenges and estimates menus
    vm.challengeTypes = ['Design', 'Code'];
    vm.challengeCounts = [1, 2, 3, 4];
    vm.challengeDifficulties = ['low', 'medium', 'high']
    vm.showTypeMenu = false;
    vm.showCountMenu = false;
    vm.showCountMenu = false;
    vm.estimatesSubmitted = false;
    vm.challenges = [];
    vm.overallDifficulty = null;
    vm.difficultyExplanation = null;
    vm.index = 0;
    vm.challenge = {id: vm.index, challengeType: null, count: null};

    vm.toggleMenu = function(menu) {
      vm[menu] = !vm[menu];
    }

    vm.selectType = function(item) {
      vm.challenge.challengeType = item;
      vm.toggleMenu('showTypeMenu');
    }

    vm.selectCount= function(item) {
      vm.challenge.count = item;
      vm.toggleMenu('showCountMenu');
    }

    vm.selectDifficulty= function(item) {
      vm.overallDifficulty = item;
      vm.toggleMenu('showDifficultyMenu');
    }

    vm.addChallenge = function(challenge) {
      if (vm.challenge.challengeType && vm.challenge.count) {
        var challengeId = vm.index++;
        vm.challenges.push(vm.challenge);
        vm.challenge = {id: vm.index, challengeType: null, count: null}
      }
    }

    vm.removeChallenge = function(index) {
        vm.challenges.splice(index, 1);
    }

    vm.submit = function() {
      var challengesEstimate = {
        complexity: vm.overallDifficulty,
        difficultyExplanation: vm.difficultyExplanation,
        challengeEstimates: vm.challenges
      }
      ProjectDetailsService.submitChallenges(vm.work.id, challengesEstimate);
    };

    vm.showAddedChallenges = function() {
      return ProjectDetailsService.showStatusComponent(vm.work.id, 'Estimate');
    }

    }
  })();

(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectsService', '$state'];
  function ProjectsController(ProjectsService, $state) {
   var vm = this;
   vm.workRequests = ProjectsService.projects;
   vm.title = 'View Projects';
   vm.active = null;
   vm.showTypeFilterMenu = false;
   vm.typeFilterValue = null;
   vm.selectedType = 'All Project Types';
   vm.typeFilters = ["All Project Types", "Design", "Development", "Design & Development"];
   vm.filteredRequests = {"code": "Development", "design": "Design", "both": "Design & Development" };

    vm.hoverSelect = function(index) {
      vm.active = index;
    }

    vm.hoverDeselect = function(index) {
      vm.active = null;
    }

    vm.toggleTypeFilterMenu = function() {
      vm.showTypeFilterMenu = !vm.showTypeFilterMenu;
    }

    vm.selectType = function(item) {
      vm.selectedType = item;
      if (item === 'Design & Development') {
        vm.typeFilterValue = 'Design & Dev';
      } else {
        vm.typeFilterValue = item;
      }
    }

    vm.typeFilter = function(data) {
      if (vm.filteredRequests[data.requestType] ===  vm.selectedType || vm.selectedType === 'All Project Types') {
      return true;
      } else {
        return false;
     }
    }

    vm.showDetailSpan = function(state) {
      return $state.current.name === state
    }

    vm.viewProjectDetails = function(project) {
      if ($state.current.name === 'view-projects.assigned') {
        $state.go('project-details', {id: project.id, status: project.status})
      } else if ($state.current.name === 'view-projects.open') {
        $state.go('project-details', {id: project.id})
      }
    }

    // function activate() {
    //   if ($state.current.name === 'view-projects.open') {
    //     ProjectsService.getWorkRequests().then(function(data) {
    //       vm.workRequests = data
    //     })
    //    } else if ($state.current.name === 'view-projects.assigned') {
    //     ProjectsService.getAssignedProjects().then(function(data) {
    //       vm.workRequests = data
    //     })
    //   }
    // }

    // activate()
  }
})();

(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$rootScope', '$window', 'ProjectDetailsService', '$state', 'UserV3Service'];

function ProjectDetailsController ($rootScope, $window, ProjectDetailsService, $state, UserV3Service) {
  var vm = this;
  vm.work  =  ProjectDetailsService.work;
  vm.showClaimedModal = false;
  vm.showCreateChallengesModal = false;
  vm.showEstimatesButton = false;
  vm.threadId = null;

  //event listener for displaying modal
  $rootScope.$on('projectClaimed', function() {
   vm.showClaimedModal = true;
   vm.showEstimatesButton = true;
  });

  vm.submitClaim = function() {
    var projectId = vm.work.id;
    ProjectDetailsService.submitClaim(projectId);
  }

  vm.projectAvailable = function() {
    //TODO: Eliminate incomplete once only submitted return
    return ProjectDetailsService.projectAvailable(vm.work, vm.work.id);
  }

  vm.hideClaimedModal = function() {
    vm.showClaimedModal  = false;
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    ProjectDetailsService.openCreateChallenges(vm.work.id);
  }

  vm.hideCreateChallengesModal = function() {
    vm.showCreateChallengesModal = false;
  }

  vm.launchProject = function() {
    return ProjectDetailsService.launchProject(vm.work.id);
  }

  vm.showStatusComponent = function(status) {
    return ProjectDetailsService.showStatusComponent(vm.work.id, status);
  }

  vm.navigateMessaging = function() {
    $state.go('copilot-messaging', {id: $state.params.id})
  }
  vm.activate = function() {
  //instantiate userId for messaging's subscriberId
  // vm.userId = UserV3Service.getCurrentUser().id;
    if ($state.params.status) {
      ProjectDetailsService.initializeCopilotWork($state.params.id, $state.params.status).then(function(data) {
        vm.work = data;
      })
    } else {
      ProjectDetailsService.initializeCopilotWork($state.params.id).then(function(data) {
        vm.work = data;
      })
    }
  }

  vm.activate()

}
})();
(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsTabController', ProjectsTabController);

  ProjectsTabController.$inject = ['$state'];
  function ProjectsTabController($state) {
    var vm = this;
    if ($state.current.name == 'view-projects.open') {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    } else if ($state.current.name == 'view-projects.assigned') {
      vm.highlightAssignedButton = true;
      vm.highlightOpenButton = false;
    }

    vm.assignedButtonSelected = function() {
      vm.highlightOpenButton = false;
      vm.highlightAssignedButton = true;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    }

  }
})();
'use strict';
angular.module('ap-copilot-flow.project-details')
.controller('CopilotMessagingController', CopilotMessagingController);

CopilotMessagingController.$inject = ['$stateParams', '$state', '$window', 'UserV3Service', '$scope'];
function CopilotMessagingController ($stateParams, $state, $window, UserV3Service, $scope) {
  var vm;
  vm = this;
  vm.threadId = $stateParams.id;
  vm.subscriberId = null;
  vm.back = function() {
      $state.go('project-details', {id: $state.params.id});
  };
  $scope.$watch(UserV3Service.getCurrentUser, function() {
    var user;
    user = UserV3Service.getCurrentUser();
    if (user) {
      return vm.subscriberId = user.id;
    }
  });
  return vm;
};
angular.module("ap-copilot-flow").run(["$templateCache", function($templateCache) {$templateCache.put("views/challenges.html","<div ng-hide=\"vm.showAddedChallenges()\" class=\"challengesContainer\"><h5 ng-hide=\"vm.showAddedChallenges()\">Create Project Estimate</h5><dropdown class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleMenu(\'showTypeMenu\')\" ng-bind=\"vm.challenge.challengeType.charAt(0).toUpperCase() +  vm.challenge.challengeType.slice(1) || \'Type of Challenge\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"type in vm.challengeTypes\" ng-click=\"vm.selectType(type)\">{{type}}</li></ul></p><p ng-click=\"vm.toggleMenu(\'showCountMenu\')\" ng-bind=\"vm.challenge.count || \'How Many\'\" class=\"dropdown-button count\"></p><ul ng-class=\"{\'show-menu\': vm.showCountMenu}\" class=\"dropdown-menu dropdown-select count\"><li ng-repeat=\"number in vm.challengeCounts\" ng-click=\"vm.selectCount(number)\">{{number}}</li></ul><button type=\"button\" ng-click=\"vm.addChallenge(challenge)\" class=\"addButton\">+</button></div></dropdown><br/><br/><h1></h1><hr/><div ng-show=\"vm.challenges.length &gt; 0\" class=\"addedChallenges\"><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges<a ng-click=\"vm.removeChallenge($index)\">remove</a></li></ul></div><br/><div class=\"projectDifficulty\"></div><h5>Overall Project Difficulty</h5><div class=\"dropdown\"><div class=\"dropdown-container difficulty\"><p ng-click=\"vm.toggleMenu(\'showDifficultyMenu\')\" ng-bind=\"vm.overallDifficulty.charAt(0).toUpperCase() +  vm.overallDifficulty.slice(1) || \'Difficulty Level\'\" class=\"dropdown-button difficulty\"><ul ng-class=\"{\'show-menu\': vm.showDifficultyMenu}\" class=\"dropdown-menu dropdown-select difficulty\"><li ng-repeat=\"difficulty in vm.challengeDifficulties\" ng-click=\"vm.selectDifficulty(difficulty)\">{{difficulty | capitalize}}</li></ul></p></div></div><br/><br/><h5>Explain Complexity</h5><br/><textarea name=\"difficultyExplanation\" ng-model=\"vm.difficultyExplanation\"></textarea><br/><button ng-click=\"vm.submit()\" class=\"submitEstimates\">Create Estimates</button></div><div ng-show=\"vm.showAddedChallenges()\" class=\"projectEstimate\"><h5>Project Estimate</h5><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges</li></ul></div>");
$templateCache.put("views/copilot-messaging.html","<a ng-click=\"vm.back()\">Back</a><h1 class=\"messaging-page-header\">Messaging Customer</h1><messaging thread-id=\"{{ vm.threadId }}\" subscriber-id=\"{{ vm.subscriberId }}\"></messaging>");
$templateCache.put("views/project-details.html","<main class=\"layout-main project-details\"><status-modal ng-if=\"vm.showClaimedModal\" type=\"statusModal\" next-state=\"project-details.challenges\" next-step=\"Create Estimates\"><span>Congratulations! You have claimed this project.</span></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showStatusComponent(\'Estimate\')\" class=\"success\"><h3>Project estimate complete. Awaiting client approval.</h3></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showStatusComponent(\'Launched\')\" class=\"success\"><h3>Your project has been launched!</h3></status-modal><div class=\"detailsContainer\"><h2>{{ vm.work.name | cutOff}}</h2><h3>{{vm.work.requestType | requestType}} Project</h3><br/><button ng-if=\"vm.projectAvailable()\" ng-click=\"vm.submitClaim()\" class=\"details-container\">Claim Project</button><button ng-if=\"vm.showStatusComponent(\'Assigned\')\" ui-sref=\"project-details.challenges\" class=\"details-container\">Create Estimates</button><button ng-if=\"vm.showStatusComponent(\'Approved\')\" ng-click=\"vm.openCreateChallenges()\" class=\"details-container\">Create Challenges</button><button ng-if=\"vm.showStatusComponent(\'awaiting_launch\')\" ng-click=\"vm.launchProject()\" class=\"details-container\">Launch Project</button><button ng-if=\"!vm.projectAvailable()\" ng-click=\"vm.navigateMessaging()\" class=\"details-container\">Message Client</button><br/><br/><br/><hr/><div class=\"summary\"><h5>Project Description</h5><p>{{vm.work.summary}}</p></div><div class=\"similarApps\"><h5>Similar Apps</h5><ul></ul><p ng-repeat=\"competitor in vm.work.competitorApps\">{{competitor}}</p></div><div class=\"usersDescription\"><h5>Description of Users</h5><p>{{vm.work.usageDescription}}</p></div><div class=\"features\"><h5>Features</h5><ul></ul><p ng-repeat=\"feature in vm.work.features\">{{feature.name}}: {{feature.description}}</p></div><div class=\"visualElements\"><h5>Visual Elements</h5></div></div><aside ui-view=\"\"></aside></main>");
$templateCache.put("views/projectTabs.html","<div class=\"projectsHeading\"><h1>Copilot Projects</h1><div><button ui-sref=\"view-projects.assigned\" ng-click=\"vm.assignedButtonSelected()\" ng-class=\"{\'selected\': vm.highlightAssignedButton}\" class=\"projectsHeading\">My Projects</button><button ui-sref=\"view-projects.open\" ng-click=\"vm.openButtonSelected()\" ng-class=\"{\'selected\': vm.highlightOpenButton}\" class=\"projectsHeading\">Open Projects</button></div><main ui-view=\"\" class=\"layout-main projects\"></main></div>");
$templateCache.put("views/projects.html","<dropdown ng-hide=\"!vm.workRequests.length\" class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleTypeFilterMenu()\" ng-bind=\"vm.typeFilterValue || \'All Project Types\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeFilterMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"typeFilter in vm.typeFilters\" ng-click=\"vm.selectType(typeFilter)\">{{typeFilter}}</li></ul></p></div></dropdown><ul><li ng-repeat=\"project in filteredWorkRequests=(vm.workRequests | orderBy:\'createdAt\':true | filter: vm.typeFilter)\" ng-mouseenter=\"vm.hoverSelect($index)\" ng-mouseleave=\"vm.hoverDeselect($index)\" class=\"projectLi\"><div ng-class=\"{\'hovered\': $index === vm.active, \'grey\': project.requestType === \'code\'}\" class=\"tile\"><h5>{{project.name | cutOff}}</h5><br/><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/dev-project-icon.png\" ng-class=\"{\'faded\': $index === vm.active}\"/><br/><span class=\"type\">{{project.requestType | requestType | uppercase}}</span><br/><br/><span ng-show=\"vm.showDetailSpan(\'view-projects.open\')\" class=\"created\">Project Created - {{project.createdAt | date:\'MM/dd/yyyy\'}}</span><span ng-show=\"vm.showDetailSpan(\'view-projects.assigned\')\" class=\"created\">{{project.status | status}}</span><br/><button ng-show=\"$index === vm.active\" ng-click=\"vm.viewProjectDetails(project)\" class=\"projectsLi\">{{project.status | statusButton}}</button></div></li></ul><div ng-show=\"!filteredWorkRequests.length\" class=\"noProjectsMessage\"><h1>Sorry, there are no available {{vm.selectedType}} projects at this time.</h1></div>");
$templateCache.put("views/statusModal.html","<div class=\"statusModal\"><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div><br/><button ng-click=\"nextState()\" class=\"modalButton\">{{nextStep}}</button><br/><a ng-click=\"hideModal()\">I\'ll do it later</a></div>");
$templateCache.put("views/successModal.html","<div class=\"statusModal success\"><div class=\"exit\"><a ng-click=\"hideModal()\">&times;</a></div><div class=\"imageContainer\"><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/check-solid-green.svg\" class=\"checkmark-green\"/></div><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div></div>");}]);