/**
 * ap-work-item - Appirio Work Item Platform
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
(function() {
    "use strict";
    angular.module("app", [ "app.core", "app.layout", "app.getting-started", "app.auth", "app.project-details", "app.projects", "appirio-tech-ng-auth", "appirio-tech-messaging" ]).config([ "$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode(false);
    } ]);
})();

angular.module("app.constants", []).constant("apiUrl", "/v3/").constant("auth0ClientId", "Auth0_Client_Id").constant("auth0Domain", "topcoder-domain.auth0.com").constant("auth0TokenName", "userJWTToken").constant("API_URL", "https://api.topcoder-dev.com/v3").constant("AUTH0_CLIENT_ID", "Auth0_Client_Id").constant("AUTH0_DOMAIN", "topcoder-domain.auth0.com").constant("AUTH0_TOKEN_NAME", "userJWTToken").constant("API_URL_V2", "https://api.topcoder-dev.com/v2").constant("AVATAR_URL", "http://www.topcoder.com").constant("SUBMISSION_URL", "https://studio.topcoder.com");

(function() {
    "use strict";
    angular.module("blocks.exception", [ "blocks.logger" ]);
})();

(function() {
    "use strict";
    angular.module("blocks.logger", []);
})();

(function() {
    "use strict";
    angular.module("blocks.router", [ "ui.router", "blocks.logger" ]);
})();

(function() {
    "use strict";
    angular.module("app.resource", [ "ngResource" ]);
})();

(function() {
    "use strict";
    angular.module("app.resource").factory("ApiResource", ApiResource);
    ApiResource.$inject = [ "$resource", "apiUrl" ];
    function ApiResource($resource, apiUrl) {
        var api = {
            defaultConfig: {
                id: "@id"
            },
            extraMethods: {
                update: {
                    method: "PUT"
                }
            },
            add: function(config) {
                var params, url;
                if (angular.isString(config)) {
                    var configObj = {
                        resource: config,
                        url: "/" + config
                    };
                    config = configObj;
                }
                var endpoint = config.apiUrl || apiUrl;
                config.url = endpoint + config.url;
                if (!config.unnatural) {
                    var orig = angular.copy(api.defaultConfig);
                    params = angular.extend(orig, config.params);
                    url = config.url;
                } else {
                    params = config.params;
                    url = config.url;
                }
                var methods = config.methods || api.extraMethods;
                api[config.resource] = $resource(url, params, methods);
            }
        };
        return api;
    }
})();

(function() {
    "use strict";
    angular.module("app.resource").provider("data", dataProvider);
    dataProvider.$inject = [];
    function dataProvider() {
        this.list = function(resource, query) {
            return [ "data", function(data) {
                return data.list(resource, query);
            } ];
        };
        this.get = function(resource, query) {
            return [ "data", function(data) {
                return data.get(resource, query);
            } ];
        };
        this.$get = Data;
        Data.$inject = [ "ApiResource" ];
        function Data(ApiResource) {
            var data = {
                list: function(resource, query) {
                    return ApiResource[resource].query(query).$promise;
                },
                get: function(resource, query) {
                    return ApiResource[resource].get(query).$promise;
                },
                create: function(resource, model) {
                    return ApiResource[resource].save(model).$promise;
                },
                update: function(resource, model) {
                    return ApiResource[resource].update(model).$promise;
                },
                remove: function(resource, model) {
                    return ApiResource[resource].remove(model).$promise;
                },
                "delete": function(resource, model) {
                    return ApiResource[resource].delete(model).$promise;
                }
            };
            return data;
        }
    }
})();

(function() {
    "use strict";
    angular.module("app.core", [ "ngAnimate", "ngSanitize", "blocks.exception", "blocks.logger", "blocks.router", "ui.router" ]);
})();

(function() {
    "use strict";
    var init;
    init = function($rootScope, $location) {
        var setPageClass;
        setPageClass = function(e, data) {
            if ($location.$$url === "/") {
                return $rootScope.pageClass = "getting-started";
            } else {
                return $rootScope.pageClass = $location.$$path.replace(/\//g, " ");
            }
        };
        return $rootScope.$on("$locationChangeStart", setPageClass);
    };
    init.$inject = [ "$rootScope", "$location" ];
    angular.module("app.layout", [ "appirio-tech-ng-auth", "app.projects" ]).run(init);
}).call(this);

(function() {
    "use strict";
    angular.module("blocks.exception").provider("exceptionHandler", exceptionHandlerProvider).config(config);
    function exceptionHandlerProvider() {
        this.config = {
            appErrorPrefix: undefined
        };
        this.configure = function(appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };
        this.$get = function() {
            return {
                config: this.config
            };
        };
    }
    config.$inject = [ "$provide" ];
    function config($provide) {
        $provide.decorator("$exceptionHandler", extendExceptionHandler);
    }
    extendExceptionHandler.$inject = [ "$delegate", "exceptionHandler", "logger" ];
    function extendExceptionHandler($delegate, exceptionHandler, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || "";
            var errorData = {
                exception: exception,
                cause: cause
            };
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            logger.error(exception.message, errorData);
        };
    }
})();

(function() {
    "use strict";
    angular.module("blocks.exception").factory("exception", exception);
    exception.$inject = [ "logger" ];
    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;
        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();

(function() {
    "use strict";
    angular.module("blocks.logger").factory("logger", logger);
    logger.$inject = [ "$log", "toastr" ];
    function logger($log, toastr) {
        var service = {
            showToasts: false,
            error: error,
            info: info,
            success: success,
            warning: warning,
            log: $log.log
        };
        return service;
        function error(message, data, title) {
            $log.error("Error: " + message, data);
        }
        function info(message, data, title) {
            $log.info("Info: " + message, data);
        }
        function success(message, data, title) {
            $log.info("Success: " + message, data);
        }
        function warning(message, data, title) {
            $log.warn("Warning: " + message, data);
        }
    }
})();

(function() {
    "use strict";
    angular.module("blocks.router").provider("routerHelper", routerHelperProvider);
    routerHelperProvider.$inject = [ "$locationProvider", "$stateProvider", "$urlRouterProvider" ];
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };
        $locationProvider.html5Mode(true);
        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };
        this.$get = RouterHelper;
        RouterHelper.$inject = [ "$location", "$rootScope", "$state", "logger" ];
        function RouterHelper($location, $rootScope, $state, logger) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };
            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };
            init();
            return service;
            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }
            function handleRoutingErrors() {
                $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    var destination = toState && (toState.title || toState.name || toState.loadedTemplateUrl) || "unknown target";
                    var msg = "Error routing to " + destination + ". " + (error.data || "") + ". <br/>" + (error.statusText || "") + ": " + (error.status || "");
                    logger.warning(msg, [ toState ]);
                    $location.path("/");
                });
            }
            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }
            function getStates() {
                return $state.get();
            }
            function updateDocTitle() {
                $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
                    stateCounts.changes++;
                    handlingStateChangeError = false;
                    var title = config.docTitle + " " + (toState.title || "");
                    $rootScope.title = title;
                });
            }
        }
    }
})();

(function() {
    "use strict";
    var core = angular.module("app.core");
    core.config(toastrConfig);
    toastrConfig.$inject = [ "toastr" ];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4e3;
        toastr.options.positionClass = "toast-bottom-right";
    }
    var config = {
        appErrorPrefix: "[Appiro Work Platform Error] ",
        appTitle: "Appiro Work Platform"
    };
    core.value("config", config);
    core.config(configure);
    configure.$inject = [ "$logProvider", "routerHelperProvider", "exceptionHandlerProvider" ];
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ": "
        });
    }
})();

(function() {
    "use strict";
    angular.module("app.core").constant("toastr", toastr).constant("moment", moment);
})();

(function() {
    "use strict";
    function appRun(routerHelper) {
        var otherwise = "/404";
        routerHelper.configureStates(getStates(), otherwise);
    }
    appRun.$inject = [ "routerHelper" ];
    function getStates() {
        return [ {
            state: "404",
            config: {
                url: "/404",
                templateUrl: "core/404.html",
                title: "404",
                data: {
                    noAuthRequired: true
                }
            }
        } ];
    }
    angular.module("app.core").run(appRun);
})();

(function() {
    "use strict";
    var directive = function() {
        var link = function(scope, element, attrs) {
            var overlay = angular.element("#modal-overlay");
            var closeButton = angular.element('<button type="button" class="clean close"></button>');
            var toggleShow = function(show) {
                if (show) {
                    element.show();
                    overlay.show();
                } else {
                    element.hide();
                    overlay.hide();
                }
            };
            var close = function() {
                scope.show = false;
                scope.$apply();
            };
            closeButton.prependTo(element).bind("click", close);
            if (!overlay.length) {
                overlay = angular.element('<div id="modal-overlay"></div>');
                overlay.appendTo("body");
            }
            overlay.bind("click", close);
            scope.$watch("show", toggleShow);
        };
        return {
            restrict: "A",
            link: link,
            scope: {
                show: "=ngModal"
            }
        };
    };
    directive.$inject = [];
    angular.module("app.layout").directive("ngModal", directive);
})();

(function() {
    "use strict";
    angular.module("app.getting-started", [ "app.core" ]);
})();

(function() {
    "use strict";
    angular.module("app.getting-started").run(appRun);
    appRun.$inject = [ "routerHelper" ];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    function getStates() {
        return [ {
            state: "home",
            config: {
                url: "/",
                templateUrl: "getting-started/views/getting-started.html",
                controller: "GettingStartedController",
                controllerAs: "vm",
                title: "Getting Started",
                data: {
                    noAuthRequired: true
                }
            }
        } ];
    }
})();

(function() {
    "use strict";
    angular.module("app.getting-started").controller("GettingStartedController", GettingStartedController);
    GettingStartedController.$inject = [ "logger" ];
    function GettingStartedController(logger) {
        var vm = this;
        vm.title = "Getting Started";
        function activate() {
            logger.log("Activated Getting Started View");
        }
    }
})();

(function() {
    "use strict";
    var dependencies;
    dependencies = [ "appirio-tech-ng-auth" ];
    angular.module("app.auth", dependencies);
}).call(this);

(function() {
    "use strict";
    angular.module("app.auth").config(appStates);
    appStates.$inject = [ "$stateProvider" ];
    function appStates($stateProvider) {
        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "auth/views/login.html",
            controller: "LoginController",
            controllerAs: "vm",
            data: {
                noAuthRequired: true
            }
        }).state("register", {
            url: "/register",
            templateUrl: "auth/views/register.html",
            controller: "RegisterController",
            controllerAs: "vm",
            data: {
                noAuthRequired: true
            }
        });
    }
})();

(function() {
    "use strict";
    angular.module("app.auth").controller("LoginController", LoginController);
    LoginController.$inject = [ "$rootScope", "$location", "$state", "AuthService", "logger" ];
    function LoginController($rootScope, $location, $state, AuthService, logger) {
        var vm = this;
        vm.title = "Login";
        vm.username = "";
        vm.password = "";
        vm.error = false;
        vm.submit = null;
        activate();
        vm.submit = function() {
            vm.error = false;
            var loginOptions = {
                username: vm.username,
                password: vm.password,
                error: loginFailure,
                success: loginSuccess
            };
            AuthService.login(loginOptions);
        };
        function activate() {
            logger.log("Activated Login View");
        }
        function loginFailure(error) {
            vm.error = true;
            logger.error(error);
        }
        function loginSuccess() {
            vm.error = false;
            var urlToken = $location.search();
            if (urlToken.retUrl) {
                $location.path(urlToken.retUrl).replace();
            } else if (urlToken.retState) {
                $state.go(urlToken.retState);
            } else if ($rootScope.preAuthState) {
                $state.go($rootScope.preAuthState);
            } else {
                $state.go("view-projects.assigned");
            }
        }
    }
})();

(function() {
    "use strict";
    angular.module("app.auth").directive("login", loginDirective);
    loginDirective.$inject = [];
    function loginDirective() {
        var directive = {
            restrict: "EA",
            templateUrl: "auth/views/login-directive.html",
            controller: LoginDirectiveController,
            controllerAs: "vm",
            bindToController: true,
            scope: true
        };
        return directive;
    }
    LoginDirectiveController.$inject = [ "$scope", "$rootScope", "$state", "UserV3Service", "AuthService", "logger" ];
    function LoginDirectiveController($scope, $rootScope, $state, UserV3Service, AuthService, logger) {
        var vm = this;
        vm.handle = null;
        vm.isLoggedIn = AuthService.isAuthenticated();
        vm.signout = null;
        vm.signin = null;
        activate();
        function activate() {
            if (!AuthService.isLoggedIn()) {
                vm.handle = null;
            }
            updateDisplay();
        }
        function updateDisplay() {
            $scope.$watch(UserV3Service.getCurrentUser, function() {
                var user = UserV3Service.getCurrentUser();
                if (user) {
                    vm.handle = user.handle;
                    vm.isLoggedIn = true;
                } else {
                    vm.isLoggedIn = false;
                    vm.handle = null;
                }
            });
        }
        vm.signin = function() {
            $state.go("login");
        };
        vm.signout = function() {
            AuthService.logout().then(function() {
                $state.go("home");
            });
        };
    }
})();

(function() {
    "use strict";
    angular.module("app.auth").controller("RegisterController", RegisterController);
    RegisterController.$inject = [ "$state", "AuthService", "UserV3Service", "logger" ];
    function RegisterController($state, AuthService, UserV3Service, logger) {
        var vm = this;
        vm.title = "Register";
        vm.username = "";
        vm.password = "";
        vm.error = false;
        vm.errorMessage = "Error Creating User";
        vm.submit = null;
        activate();
        vm.submit = function() {
            vm.error = false;
            var registerOptions = {
                handle: vm.username,
                password: vm.password,
                email: vm.email
            };
            UserV3Service.createUser(registerOptions, registerSuccess, registerError);
        };
        function activate() {
            logger.log("Activated Registration View");
        }
        function registerError(error) {
            vm.error = true;
            vm.errorMessage = error;
        }
        function registerSuccess() {
            vm.error = false;
            var loginOptions = {
                username: vm.username,
                password: vm.password,
                success: success
            };
            AuthService.login(loginOptions);
            function success() {
                $state.go("view-projects.assigned");
            }
        }
    }
})();

(function() {
    "use strict";
    angular.module("app.workRequest", [ "blocks.exception", "blocks.logger", "app.resource", "app.constants" ]).run(WorkRequest);
    WorkRequest.$inject = [ "ApiResource" ];
    function WorkRequest(ApiResource) {
        var config = {
            url: "app-work-requests",
            resource: "work-request"
        };
        var configCopilot = {
            url: "app-work-requests/:id",
            resource: "copilot-work-request"
        };
        ApiResource.add(config);
        ApiResource.add(configCopilot);
    }
})();