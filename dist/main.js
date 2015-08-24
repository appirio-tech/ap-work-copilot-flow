(function () {
  'use strict';

  angular.module('ap-copilot-flow', [
    'app.constants',
    'ap-copilot-flow.projects',
    'ap-copilot-flow.project-details',
    'appirio-tech-ng-auth'
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
// (function () {
//   'use strict';

//   angular
//     .module('ap-copilot-flow.projects')
//     .factory('ProjectsService', ProjectsService);

//   ProjectsService.$inject = ['$resource', 'UserV3Service', 'API_URL'];

//   function ProjectsService($resource, UserV3Service, API_URL) {
//     var url = API_URL + '/v3/work/:workId'

//      function transformResponse (response) {
//       var parsed = JSON.parse(response)
//       return parsed.result.content? parsed.result.content : {}
//     }

//     var params  = {
//       workId      : '@workId'
//     }

//     var actions = {
//       query: {
//         method           : 'GET',
//         isArray          : true,
//         transformResponse: transformResponse
//       },
//       get: {
//         method           : 'GET',
//         isArray          : false,
//         transformResponse: transformResponse
//       }
//     }

//     return $resource(url, params, actions)

//   }
// })();

// (function () {
//   'use strict';

//   angular
//     .module('ap-copilot-flow.project-details')
//     .factory('ProjectDetailsService', ProjectDetailsService);

//   ProjectDetailsService.$inject = ['$resource', 'API_URL', 'UserV3Service'];

//   function ProjectDetailsService($resource, API_URL, UserV3Service) {

//     var url = API_URL + '/v3/copilots/:userId/projects/:projectId'

//      function transformResponse (response) {
//       var parsed = JSON.parse(response)
//       return parsed.result.content ? parsed.result.content : {}
//     }

//     var params  = {
//       userId      : '@userId',
//       projectId  : '@projectId'
//     }

//     var actions = {
//       query: {
//         method           : 'GET',
//         isArray          : true,
//         transformResponse: transformResponse
//       },
//       post: {
//         method           : 'POST',
//         isArray          : false,
//         transformResponse: transformResponse
//       },
//       put: {
//         method           : 'PUT',
//         isArray          : false,
//         transformResponse: transformResponse
//       }
//     }

//     return $resource(url, params, actions);

//   }
// })();

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

  ChallengesController.$inject = ['$state', '$scope', '$rootScope', 'CopilotProjectDetailsService', 'UserV3Service', 'CopilotProjectsService'];

  function ChallengesController($state, $scope, $rootScope, CopilotProjectDetailsService, UserV3Service, CopilotProjectsService) {
    var vm   = this;
    vm.work = null;
    vm.title = 'Challenge Estimates';
    vm.userId = null;
    vm.showAddedChallenges = false;

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

      var body = {id: vm.work.id, estimate: challengesEstimate, status: "estimated"};

      var params = {projectId: vm.work.id, userId: vm.userId};

      if (vm.userId) {
        var resource = CopilotProjectDetailsService.put(params, body);
        resource.$promise.then(function(data) {
          vm.showAddedChallenges = true;
          vm.work = data;
          $rootScope.$broadcast('projectEstimated')
        })
        resource.$promise.catch(function(data) {
          console.log('error on estimates', data);
        })
      }
    };

    function activate() {
      var params = {workId: $state.params.id}
        var resource = CopilotProjectsService.get(params)
        resource.$promise.then(function(data) {
          vm.work = data;
        })
        resource.$promise.catch(function(data) {
          console.log('error retrieving project', data)
        })
        resource.$promise.finally(function() {
          vm.loading = false;
        })

    }

    $scope.$watch(UserV3Service.getCurrentUser, function(user) {
      if (user) {
        vm.userId = user.id;
      }
    })

    activate();

    }
  })();

(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$scope', '$resource', '$state', 'UserV3Service', 'CopilotProjectsService'];
  function ProjectsController($scope, $resource, $state, UserV3Service, CopilotProjectsService) {
   var vm = this;
   vm.loading = true;
   vm.workRequests = null;
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

  function activate() {
    var params;
    //check if user is logged in, load assigned or open
    $scope.$watch(UserV3Service.getCurrentUser, function(user) {
      if (user) {
        if ($state.current.name === 'view-projects.open') {
          params = {filter: 'copilotId=unassigned'}
        } else if ($state.current.name === 'view-projects.assigned') {
          params = {filter:'copilotId='+user.id}
        }
      }
      var resource = CopilotProjectsService.query(params)
      resource.$promise.then(function(data) {
        vm.workRequests = data;
      })
      resource.$promise.catch(function(data) {
        console.log('error retrieving projects', data)
      })
      resource.$promise.finally(function() {
        vm.loading = false;
      })
      });

      }
   activate()

  }
})();
(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$rootScope', '$scope', '$window', 'CopilotProjectDetailsService', '$state', 'UserV3Service', 'CopilotProjectsService'];

function ProjectDetailsController ($rootScope, $scope, $window, CopilotProjectDetailsService, $state, UserV3Service, CopilotProjectsService) {
  var vm = this;
  vm.loading = true;
  vm.userId = null;
  vm.work  =  null;
  vm.threadId = null;

  //Action buttons based on project status
  vm.showMessageButton = false;
  vm.showClaimedModal = false;
  vm.showClaimButton = false;
  vm.showEstimatedModal = false;
  vm.showLaunchButton = false;
  vm.showCreateChallengesModal = false;
  vm.showCreateEstimatesButton = false;
  vm.showEstimateButton = false;


  vm.submitClaim = function() {
    if (vm.userId) {
    var body = {id: vm.work.id};
    var params = {userId: vm.userId};
      var resource = CopilotProjectDetailsService.post(params, body);

      resource.$promise.then(function(data) {
        vm.showClaimButton = false;
        vm.showClaimedModal = true;
        vm.showCreateEstimatesButton = true;
        vm.showMessageButton = true;
      })
    }
  }

  vm.projectAvailable = function() {
    var claimedProjectStatuses = [
      'Assigned',
      'Estimate',
      'Approved',
      'awaiting_launch',
      'Launched'
    ]
    if (vm.work) {
      return claimedProjectStatuses.indexOf(vm.work.status) === -1;
    }
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    vm.showLaunchButton = true;
  }

  vm.launchProject = function() {
    var body = {
      id: vm.work.id,
      estimate: vm.work.estimate,
      status: "launched"
    }

      var params = {workId: vm.work.id, userId: vm.userId}

      if (vm.userId) {
        var resource = CopilotProjectDetailsService.put(params, body);
        resource.$promise.then(function(data) {
          console.log('project launched', data)
          vm.work = data;
          vm.showLaunchButton = true;
        })
        resource.$promise.catch(function(data) {
          console.log('error on launch project', data)
        })
      }
  }

  vm.navigateMessaging = function() {
    $state.go('copilot-messaging', {id: $state.params.id})
  }

  function activate() {
    var params = {workId: $state.params.id}
      var resource = CopilotProjectsService.get(params)
      resource.$promise.then(function(data) {
        vm.work = data;

        //Show buttons & banners according to project status
        vm.showMessageButton = true;
        if (vm.work.status === 'Submitted' || vm.projectAvailable()) {
          vm.showClaimButton = true;
          //copilot cannot message if project is unclaimed
          vm.showMessageButton = false;
        } else if (vm.work.status === 'Assigned') {
          vm.showCreateEstimatesButton = true;
        } else if (vm.work.status === 'Estimate') {
          vm.showEstimatedModal = true;
        } else if (vm.work.status === 'Approved') {
          vm.showCreateChallengesButton = true;
        } else if (vm.work.status === 'Launched') {
          vm.showLaunchedModal = true
        }
      })
      resource.$promise.catch(function(data) {
        console.log('error retrieving projects', data)
      })
      resource.$promise.finally(function() {
        vm.loading = false;
      })

  }

  $scope.$watch(UserV3Service.getCurrentUser, function(user) {
    if (user) {
      vm.userId = user.id;
    }
  })

  //event listener for displaying modal
  $rootScope.$on('projectEstimated', function() {
   vm.showEstimatedModal = true;
   vm.showCreateEstimatesButton = false;
  });

  activate()

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
    vm.highlightAssignedButton = null;
    vm.highlightOpenButton = null;

    function activate() {
      if ($state.current.name == 'view-projects.open') {
        vm.highlightAssignedButton = false;
        vm.highlightOpenButton = true;
      } else if ($state.current.name == 'view-projects.assigned') {
        vm.highlightAssignedButton = true;
        vm.highlightOpenButton = false;
      }
    }

    vm.assignedButtonSelected = function() {
      vm.highlightOpenButton = false;
      vm.highlightAssignedButton = true;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    }

    activate();

  }
})();
'use strict';
angular.module('ap-copilot-flow.project-details')
.controller('CopilotMessagingController', CopilotMessagingController);

CopilotMessagingController.$inject = ['$state', '$window', 'UserV3Service', '$scope'];
function CopilotMessagingController ($state, $window, UserV3Service, $scope) {
  var vm;
  vm = this;
  vm.threadId = $state.params.id;
  vm.subscriberId = null;
  vm.back = function() {
      $state.go('project-details', {id: $state.params.id});
  };
  $scope.$watch(UserV3Service.getCurrentUser, function() {
    var user = UserV3Service.getCurrentUser();
    if (user) {
     vm.subscriberId = user.id;
    }
  });
  return vm;
};
angular.module("ap-copilot-flow").run(["$templateCache", function($templateCache) {$templateCache.put("views/challenges.html","<div ng-hide=\"vm.showAddedChallenges\" class=\"challengesContainer\"><h5 ng-hide=\"vm.showAddedChallenges\">Create Project Estimate</h5><dropdown class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleMenu(\'showTypeMenu\')\" ng-bind=\"vm.challenge.challengeType.charAt(0).toUpperCase() +  vm.challenge.challengeType.slice(1) || \'Type of Challenge\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"type in vm.challengeTypes\" ng-click=\"vm.selectType(type)\">{{type}}</li></ul></p><p ng-click=\"vm.toggleMenu(\'showCountMenu\')\" ng-bind=\"vm.challenge.count || \'How Many\'\" class=\"dropdown-button count\"></p><ul ng-class=\"{\'show-menu\': vm.showCountMenu}\" class=\"dropdown-menu dropdown-select count\"><li ng-repeat=\"number in vm.challengeCounts\" ng-click=\"vm.selectCount(number)\">{{number}}</li></ul><button type=\"button\" ng-click=\"vm.addChallenge(challenge)\" class=\"addButton\">+</button></div></dropdown><br/><br/><h1></h1><hr/><div ng-show=\"vm.challenges.length &gt; 0\" class=\"addedChallenges\"><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges<a ng-click=\"vm.removeChallenge($index)\">remove</a></li></ul></div><br/><div class=\"projectDifficulty\"></div><h5>Overall Project Difficulty</h5><div class=\"dropdown\"><div class=\"dropdown-container difficulty\"><p ng-click=\"vm.toggleMenu(\'showDifficultyMenu\')\" ng-bind=\"vm.overallDifficulty.charAt(0).toUpperCase() +  vm.overallDifficulty.slice(1) || \'Difficulty Level\'\" class=\"dropdown-button difficulty\"><ul ng-class=\"{\'show-menu\': vm.showDifficultyMenu}\" class=\"dropdown-menu dropdown-select difficulty\"><li ng-repeat=\"difficulty in vm.challengeDifficulties\" ng-click=\"vm.selectDifficulty(difficulty)\">{{difficulty | capitalize}}</li></ul></p></div></div><br/><br/><h5>Explain Complexity</h5><br/><textarea name=\"difficultyExplanation\" ng-model=\"vm.difficultyExplanation\"></textarea><br/><button ng-click=\"vm.submit()\" class=\"submitEstimates\">Create Estimates</button></div><div ng-show=\"vm.showAddedChallenges\" class=\"projectEstimate\"><h5>Project Estimate</h5><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges</li></ul></div>");
$templateCache.put("views/copilot-messaging.html","<a ng-click=\"vm.back()\">Back</a><h1 class=\"messaging-page-header\">Messaging Customer</h1><messaging thread-id=\"{{ vm.threadId }}\" subscriber-id=\"{{ vm.subscriberId }}\"></messaging>");
$templateCache.put("views/project-details.html","<main class=\"layout-main project-details\"><status-modal ng-if=\"vm.showClaimedModal\" type=\"statusModal\" next-state=\"project-details.challenges\" next-step=\"Create Estimates\"><span>Congratulations! You have claimed this project.</span></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showEstimatedModal\" class=\"success\"><h3>Project estimate complete. Awaiting client approval.</h3></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showLaunchedModal\" class=\"success\"><h3>Your project has been launched!</h3></status-modal><div class=\"detailsContainer\"><h2>{{ vm.work.name | cutOff}}</h2><h3>{{vm.work.requestType | requestType}} Project</h3><br/><button ng-if=\"vm.showClaimButton\" ng-click=\"vm.submitClaim()\" class=\"details-container\">Claim Project</button><button ng-if=\"vm.showCreateEstimatesButton\" ui-sref=\"project-details.challenges\" class=\"details-container\">Create Estimates</button><button ng-if=\"vm.showCreateChallengesButton\" ng-click=\"vm.openCreateChallenges()\" class=\"details-container\">Create Challenges</button><button ng-if=\"vm.showLaunchButton\" ng-click=\"vm.launchProject()\" class=\"details-container\">Launch Project</button><button ng-if=\"vm.showMessageButton\" ng-click=\"vm.navigateMessaging()\" class=\"details-container\">Message Client</button><br/><br/><br/><hr/><div class=\"summary\"><h5>Project Description</h5><p>{{vm.work.summary}}</p></div><div class=\"similarApps\"><h5>Similar Apps</h5><ul></ul><p ng-repeat=\"competitor in vm.work.competitorApps\">{{competitor}}</p></div><div class=\"usersDescription\"><h5>Description of Users</h5><p>{{vm.work.usageDescription}}</p></div><div class=\"features\"><h5>Features</h5><ul></ul><p ng-repeat=\"feature in vm.work.features\">{{feature.name}}: {{feature.description}}</p></div><div class=\"visualElements\"><h5>Visual Elements</h5></div></div><aside ui-view=\"\"></aside></main>");
$templateCache.put("views/projectTabs.html","<div class=\"projectsHeading\"><h1>Copilot Projects</h1><div><button ui-sref=\"view-projects.assigned\" ng-click=\"vm.assignedButtonSelected()\" ng-class=\"{\'selected\': vm.highlightAssignedButton}\" class=\"projectsHeading\">My Projects</button><button ui-sref=\"view-projects.open\" ng-click=\"vm.openButtonSelected()\" ng-class=\"{\'selected\': vm.highlightOpenButton}\" class=\"projectsHeading\">Open Projects</button></div><main ui-view=\"\" class=\"layout-main projects\"></main></div>");
$templateCache.put("views/projects.html","<loader ng-show=\"vm.loading\"></loader><dropdown ng-hide=\"!vm.workRequests.length\" class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleTypeFilterMenu()\" ng-bind=\"vm.typeFilterValue || \'All Project Types\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeFilterMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"typeFilter in vm.typeFilters\" ng-click=\"vm.selectType(typeFilter)\">{{typeFilter}}</li></ul></p></div></dropdown><ul><li ng-repeat=\"project in filteredWorkRequests=(vm.workRequests | orderBy:\'createdAt\':true | filter: vm.typeFilter)\" ng-mouseenter=\"vm.hoverSelect($index)\" ng-mouseleave=\"vm.hoverDeselect($index)\" class=\"projectLi\"><div ng-class=\"{\'hovered\': $index === vm.active, \'grey\': project.requestType === \'code\'}\" class=\"tile\"><h5>{{project.name | cutOff}}</h5><br/><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/dev-project-icon.png\" ng-class=\"{\'faded\': $index === vm.active}\"/><br/><span class=\"type\">{{project.requestType | requestType | uppercase}}</span><br/><br/><span ng-show=\"vm.showDetailSpan(\'view-projects.open\')\" class=\"created\">Project Created - {{project.createdAt | date:\'MM/dd/yyyy\'}}</span><span ng-show=\"vm.showDetailSpan(\'view-projects.assigned\')\" class=\"created\">{{project.status | status}}</span><br/><button ng-show=\"$index === vm.active\" ui-sref=\"project-details({id: project.id})\" class=\"projectsLi\">{{project.status | statusButton}}</button></div></li></ul><div ng-if=\"!vm.loading &amp;&amp; !filteredWorkRequests.length\" class=\"noProjectsMessage\"><h1>Sorry, there are no available {{vm.selectedType}} projects at this time.</h1></div>");
$templateCache.put("views/statusModal.html","<div class=\"statusModal\"><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div><br/><button ng-click=\"nextState()\" class=\"modalButton\">{{nextStep}}</button><br/><a ng-click=\"hideModal()\">I\'ll do it later</a></div>");
$templateCache.put("views/successModal.html","<div class=\"statusModal success\"><div class=\"exit\"><a ng-click=\"hideModal()\">&times;</a></div><div class=\"imageContainer\"><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/check-solid-green.svg\" class=\"checkmark-green\"/></div><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div></div>");}]);