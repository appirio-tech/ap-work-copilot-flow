angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['home'] = {
      url: '/',
      templateUrl: 'index.html',
      controller: 'ExampleController',
      controllerAs: 'vm'
    };
    states['view-projects'] = {
      url: '/projects',
      templateUrl: 'views/projectTabs.html',
      controller: 'ProjectsTabController',
      controllerAs: 'vm',
      title: 'View Projects',
      abstract: true
    };
    states['view-projects.assigned'] = {
      url: '/assigned',
      templateUrl: 'views/projects.html',
      controller: 'ProjectsController',
      controllerAs: 'vm'
    };
    states['view-projects.open'] = {
      url: '/open',
      templateUrl: 'views/projects.html',
      controller: 'ProjectsController',
      controllerAs: 'vm'
    };
    states['project-details'] = {
      url: '/project-details/:id?/:status?',
      title: 'Claim Project',
      templateUrl: 'views/project-details.html',
      controller: 'ProjectDetailsController',
      controllerAs: 'vm'
    };
    states['project-details.challenges'] = {
      url: '/challenges',
      templateUrl: 'views/challenges.html',
      controller: 'ChallengesController',
      controllerAs: 'vm'
    };
    results = [];
    for (key in states) {
      state = states[key];
      results.push($stateProvider.state(key, state));
    }
    return results;
  };

  config.$inject = ['$stateProvider'];

  angular.module('example').config(config).run();

}).call(this);

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/challenges.html","<div ng-hide=\"vm.showAddedChallenges\" class=\"challengesContainer\"><h6 ng-hide=\"vm.showAddedChallenges\">Create Project Estimate</h6><dropdown class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleMenu(\'showTypeMenu\')\" ng-bind=\"vm.challenge.challengeType.charAt(0).toUpperCase() +  vm.challenge.challengeType.slice(1) || \'Type of Challenge\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"type in vm.challengeTypes\" ng-click=\"vm.selectType(type)\">{{type}}</li></ul></p><p ng-click=\"vm.toggleMenu(\'showCountMenu\')\" ng-bind=\"vm.challenge.count || \'How Many\'\" class=\"dropdown-button count\"></p><ul ng-class=\"{\'show-menu\': vm.showCountMenu}\" class=\"dropdown-menu dropdown-select count\"><li ng-repeat=\"number in vm.challengeCounts\" ng-click=\"vm.selectCount(number)\">{{number}}</li></ul><button type=\"button\" ng-click=\"vm.addChallenge(challenge)\" class=\"addButton\">+</button></div></dropdown><br/><br/><h1></h1><div ng-show=\"vm.challenges.length &gt; 0\" class=\"addedChallenges\"><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges<a ng-click=\"vm.removeChallenge($index)\">remove</a></li></ul></div><br/><div class=\"projectDifficulty\"></div><h6>Overall Project Difficulty</h6><div class=\"dropdown\"><div class=\"dropdown-container difficulty\"><p ng-click=\"vm.toggleMenu(\'showDifficultyMenu\')\" ng-bind=\"vm.overallDifficulty.charAt(0).toUpperCase() +  vm.overallDifficulty.slice(1) || \'Difficulty Level\'\" class=\"dropdown-button difficulty\"><ul ng-class=\"{\'show-menu\': vm.showDifficultyMenu}\" class=\"dropdown-menu dropdown-select difficulty\"><li ng-repeat=\"difficulty in vm.challengeDifficulties\" ng-click=\"vm.selectDifficulty(difficulty)\">{{difficulty | capitalize}}</li></ul></p></div></div><br/><br/><h6>Explain Complexity</h6><br/><textarea name=\"difficultyExplanation\" ng-model=\"vm.difficultyExplanation\"></textarea><br/><button ng-click=\"vm.submit()\" class=\"submitEstimates\">Create Estimates</button></div><div ng-show=\"vm.showAddedChallenges\" class=\"projectEstimate\"><h2>Project Estimate</h2><br/><ul><li ng-repeat=\"challenge in vm.challenges track by challenge.id\">{{challenge.count}} {{challenge.challengeType | capitalize}} Challenges</li></ul></div>");
$templateCache.put("views/copilot-messaging.html","<a ng-click=\"vm.back()\">Back</a><h1 class=\"messaging-page-header\">Messaging Customer</h1><messaging thread-id=\"{{ vm.threadId }}\" subscriber-id=\"{{ vm.subscriberId }}\"></messaging>");
$templateCache.put("views/project-details.html","<main class=\"layout-main project-details\"><status-modal ng-if=\"vm.showClaimedModal\" type=\"statusModal\" next-state=\"project-details.challenges\" next-step=\"Create Estimates\"><span>Congratulations! You have claimed this project.</span></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showEstimatedModal\" class=\"success\"><h3>Project estimate complete. Awaiting client approval.</h3></status-modal><status-modal type=\"successModal\" ng-if=\"vm.showLaunchedModal\" class=\"success\"><h3>Your project has been launched!</h3></status-modal><div class=\"detailsContainer\"><h3>{{ vm.work.name | cutOff}}</h3><h3>{{vm.work.requestType | requestType}} Project</h3><br/><button ng-if=\"vm.showClaimButton\" ng-click=\"vm.submitClaim()\" class=\"details-container\">Claim Project</button><button ng-if=\"vm.showCreateEstimatesButton\" ui-sref=\"project-details.challenges\" class=\"details-container\">Create Estimates</button><button ng-if=\"vm.showCreateChallengesButton\" ng-click=\"vm.openCreateChallenges()\" class=\"details-container\">Create Challenges</button><button ng-if=\"vm.showLaunchButton\" ng-click=\"vm.launchProject()\" class=\"details-container\">Launch Project</button><button ng-if=\"vm.showMessageButton\" ng-click=\"vm.navigateMessaging()\" class=\"details-container\">Message Client</button><br/><br/><br/><hr/><div class=\"summary\"><h3>Project Description</h3><p>{{vm.work.summary}}</p></div><div class=\"similarApps\"><h3>Similar Apps</h3><ul></ul><p ng-repeat=\"competitor in vm.work.competitorApps\">{{competitor}}</p></div><div class=\"usersDescription\"><h3>Description of Users</h3><p>{{vm.work.usageDescription}}</p></div><div class=\"features\"><h3>Features</h3><ul></ul><p ng-repeat=\"feature in vm.work.features\">{{feature.name}}: {{feature.description}}</p></div><div class=\"visualElements\"><h3>Visual Elements</h3></div></div><aside ui-view=\"\"></aside></main>");
$templateCache.put("views/projectTabs.html","<div class=\"projectsHeading\"><h1>Copilot Projects</h1><div><button ui-sref=\"view-projects.assigned\" ng-click=\"vm.assignedButtonSelected()\" ng-class=\"{\'selected\': vm.highlightAssignedButton}\" class=\"projectsHeading\">My Projects</button><button ui-sref=\"view-projects.open\" ng-click=\"vm.openButtonSelected()\" ng-class=\"{\'selected\': vm.highlightOpenButton}\" class=\"projectsHeading\">Open Projects</button></div><main ui-view=\"\" class=\"layout-main projects\"></main></div>");
$templateCache.put("views/projects.html","<loader ng-show=\"vm.loading\"></loader><dropdown ng-hide=\"!vm.workRequests.length\" class=\"dropdown\"><div class=\"dropdown-container\"><p ng-click=\"vm.toggleTypeFilterMenu()\" ng-bind=\"vm.typeFilterValue || \'All Project Types\'\" class=\"dropdown-button type\"><ul ng-class=\"{\'show-menu\': vm.showTypeFilterMenu}\" class=\"dropdown-menu dropdown-select type\"><li ng-repeat=\"typeFilter in vm.typeFilters\" ng-click=\"vm.selectType(typeFilter)\">{{typeFilter}}</li></ul></p></div></dropdown><ul><li ng-repeat=\"project in filteredWorkRequests=(vm.workRequests | orderBy:\'createdAt\':true | filter: vm.typeFilter)\" class=\"projectLi\"><div ng-class=\"{\'grey\': project.requestType === \'code\'}\"><p>{{project.name | cutOff}}</p><br/><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/dev-project-icon.png\"/><br/><span class=\"type\">{{project.requestType | requestType | uppercase}}</span><span ng-show=\"vm.showDetailSpan(\'view-projects.open\')\" class=\"created\">Project Created - {{project.createdAt | date:\'MM/dd/yyyy\'}}</span><span ng-show=\"vm.showDetailSpan(\'view-projects.assigned\')\" class=\"created\">{{project.status | status}}</span><br/><button ui-sref=\"project-details({id: project.id})\" class=\"projectsLi\">{{project.status | statusButton}}</button></div></li></ul><div ng-if=\"!vm.loading &amp;&amp; !filteredWorkRequests.length\" class=\"noProjectsMessage\"><h1>Sorry, there are no available {{vm.selectedType}} projects at this time.</h1></div>");
$templateCache.put("views/statusModal.html","<div class=\"statusModal\"><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div><br/><button ng-click=\"nextState()\" class=\"modalButton\">{{nextStep}}</button><br/><a ng-click=\"hideModal()\">I\'ll do it later</a></div>");
$templateCache.put("views/successModal.html","<div class=\"statusModal success\"><div class=\"exit\"><a ng-click=\"hideModal()\">&times;</a></div><div class=\"imageContainer\"><img src=\"https://s3-us-west-1.amazonaws.com/static-images-for-demo/check-solid-green.svg\" class=\"checkmark-green\"/></div><div ng-transclude=\"ng-transclude\" class=\"messageContainer\"></div></div>");}]);