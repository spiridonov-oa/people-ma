'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'peopleMa';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('about');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admin');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('arches');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('people');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('projects', ['slick']);

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('about').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('mainmenu', 'About Us', 'about', 'left-margin', '/about-us', true, null, 3);
    }
]);

'use strict';

//Setting up route
angular.module('about').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('about', {
			url: '/about',
			templateUrl: 'modules/about/views/about.client.view.html'
		});
	}
]);

'use strict';

// Projects controller
angular.module('about').controller('AboutUsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication',
	function($scope, $stateParams, $state, $location, Authentication) {
		$scope.authentication = Authentication;

	}
]);

'use strict';

// Configuring the Articles module
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin-menu', 'Home', 'admin', 'dropdown', '/admin');
        Menus.addMenuItem('admin-menu', 'Projects', 'adminProjects', 'dropdown', '/admin/projects');
        Menus.addMenuItem('admin-menu', 'Concepts', 'adminConcepts', 'dropdown', '/admin/concepts');
        Menus.addMenuItem('admin-menu', 'People', 'adminPeople', 'dropdown', '/admin/people');
	}
]);

'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
    function ($stateProvider) {
        // Concepts state routing
        $stateProvider.
            state('admin', {
                url: '/admin',
                templateUrl: 'modules/administrator/views/admin.client.view.html'
            }).
            state('adminProjects', {
                url: '/admin/projects',
                controller: 'AdminProjectsController',
                templateUrl: 'modules/administrator/views/admin-projects.client.view.html'
            }).
            state('adminCurrentProject', {
                url: '/admin/projects/:projectId',
                controller: 'AdminProjectsController',
                templateUrl: 'modules/administrator/views/admin-projects.client.view.html'
            }).
            state('adminConcepts', {
                url: '/admin/concepts',
                controller: 'AdminConceptsController',
                templateUrl: 'modules/administrator/views/admin-projects.client.view.html'
            }).
            state('adminCurrentConcept', {
                url: '/admin/concepts/:projectId',
                controller: 'AdminConceptsController',
                templateUrl: 'modules/administrator/views/admin-projects.client.view.html'
            }).
            state('adminPeoples', {
                url: '/admin/people',
                controller: 'AdminPeopleController',
                templateUrl: 'modules/administrator/views/admin-people.client.view.html'
            }).
            state('adminCurrentPerson', {
                url: '/admin/people/:personId',
                controller: 'AdminPeopleController',
                templateUrl: 'modules/administrator/views/admin-people.client.view.html'
            });
    }
]);

'use strict';

angular.module('admin').controller('AdminConceptsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminConcepts',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminConcepts) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = AdminProjectFactory.getProject('concept', AdminConcepts);

    }
]);

'use strict';

angular.module('admin').controller('AdminPeopleController', ['$scope', '$state', 'Authentication', '$location', 'AdminPersonFactory',
    function($scope, $state, Authentication, $location, AdminPersonFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.person = AdminPersonFactory.getPerson();

    }
]);

'use strict';

angular.module('admin').controller('AdminProjectsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminProjects',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminProjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = AdminProjectFactory.getProject('project', AdminProjects);

    }
]);

'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', '$location',
    function ($scope, $state, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


    }
]);

'use strict';

angular.module('admin').directive('adminMenu', ['Menus', '$state',
    function (Menus, $state) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/administrator/directives/admin-menu.view.html',
            link: function (scope) {
                scope.adminMenu = {};
                scope.adminMenu = Menus.getMenu('admin-menu');
                scope.adminMenu.active = $state.current.name;
            }
    };
}]);

'use strict';

angular.module('admin').factory('AdminProjectFactory', ['$state', '$location',
    function ($state, $location) {
        var project = {};

        var init = function (projectType, Service) {

            var projectId = $state.params['projectId'];
            var projectUrl = '/admin/' + projectType + 's';

            project.path = '#!/admin/' + projectType + 's';
            project.currentProjectId = projectId;
            project.isCreateNewProject = !projectId;

            project.create = function () {
                var instance = new Service({
                    name: project.data.name || '',
                    times: project.data.times || '',
                    description: project.data.description || '',
                    tags: project.data.tags,
                    icon: project.data.icon,
                    photos: [],
                    section: project.data.section || 'commerce',
                    type: projectType,
                    order: project.data.order || 0
                });
                instance.$save(function (response) {
                    $location.path(projectUrl);
                    project.find();
                    project.data = {};
                }, function (errorResponse) {
                    project.error = errorResponse.data.message;
                });
            };

            project.remove = function (data) {
                if (data) {
                    data.$remove();

                    for (var i in project.objArray) {
                        if (project.objArray[i] === data) {
                            project.objArray.splice(i, 1);
                        }
                    }
                } else {
                    project.data.$remove(function () {
                        $location.path(projectUrl);
                        project.find();
                    });
                }
            };

            project.update = function () {
                var data = project.data;

                data.$update(function () {
                    $location.path(projectUrl + '/' + data._id);
                    project.find();
                }, function (errorResponse) {
                    project.error = errorResponse.data.message;
                });
            };

            project.find = function (props) {
                Service.query(function (data) {
                    project.objArray = data;
                });
            };

            project.submit = function () {
                if (project.isCreateNewProject) {
                    project.create();
                } else {
                    project.update();
                }
            };

            project.findById = function (objId) {
                return Service.get({
                    projectId: objId
                });
            };

            project.findOne = function () {
                Service.get({
                    projectId: projectId
                }, function (data) {
                    project.data = data;
                    project.find();
                });
            };

            if (project.currentProjectId) {
                project.findOne();
            } else {
                project.data = {};
                project.find();
            }

            return project;
        };

        return {
            getProject: function (type, Service) {
                return init(type, Service);
            }
        }
    }
]);


'use strict';

angular.module('admin').factory('AdminPersonFactory', ['$state', '$location', 'AdminPeople',
    function ($state, $location, AdminPeople) {
        var person = {};

        var init = function () {
            var personId = $state.params['personId'];
            var personUrl = '/admin/people';

            person.path = '#!/admin/people';
            person.currentPersonId = personId;
            person.isCreateNewPerson = !personId;

            person.create = function () {
                var instance = new AdminPeople({
                    fName: person.data.fName || '',
                    lName: person.data.lName || '',
                    position: person.data.position || '',
                    photo: person.data.photo || '',
                    ava: person.data.ava || '',
                    order: person.data.order || 0
                });
                instance.$save(function (response) {
                    $location.path(personUrl);
                    person.find();
                    person.data = {};
                }, function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.remove = function (data) {
                if (data) {
                    data.$remove();

                    for (var i in person.peopleArray) {
                        if (person.peopleArray[i] === data) {
                            person.peopleArray.splice(i, 1);
                        }
                    }
                } else {
                    person.data.$remove(function () {
                        $location.path(personUrl);
                        person.find();
                    });
                }
            };

            person.update = function () {
                var data = person.data;

                data.$update(function () {
                    $location.path(personUrl + '/' + data._id);
                    person.find();
                }, function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.find = function () {
                AdminPeople.query(function (data) {
                    person.peopleArray = data;
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.submit = function () {
                if (person.isCreateNewPerson) {
                    person.create();
                } else {
                    person.update();
                }
            };

            person.findById = function (objId) {
                return AdminPeople.get({
                    personId: objId
                },function (data) {
                    person.data = data;
                    person.find();
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.findOne = function () {
                AdminPeople.get({
                    personId: personId
                }, function (data) {
                    person.data = data;
                    person.find();
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            if (person.currentPersonId) {
                person.findOne();
            } else {
                person.data = {};
                person.find();
            }

            return person;
        };

        return {
            getPerson: function () {
                return init();
            }
        }
    }
]);


'use strict';

angular.module('admin').factory('AdminConcepts', ['$resource',
    function ($resource) {
        return $resource('concepts/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

angular.module('admin').factory('AdminPeople', ['$resource',
    function ($resource) {
        return $resource('people/:personId', {
            personId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

angular.module('admin').factory('AdminProjects', ['$resource',
    function ($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

//Setting up route
angular.module('arches').config(['$stateProvider',
	function($stateProvider) {
		// Arches state routing
		$stateProvider.
		state('listArches', {
			url: '/arches',
			templateUrl: 'modules/arches/views/list-arches.client.view.html'
		}).
		state('createArch', {
			url: '/arches/create',
			templateUrl: 'modules/arches/views/create-arch.client.view.html'
		}).
		state('viewArch', {
			url: '/arches/:archId',
			templateUrl: 'modules/arches/views/view-arch.client.view.html'
		}).
		state('editArch', {
			url: '/arches/:archId/edit',
			templateUrl: 'modules/arches/views/edit-arch.client.view.html'
		});
	}
]);
'use strict';

// Arches controller
angular.module('arches').controller('ArchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Arches',
	function($scope, $stateParams, $location, Authentication, Arches) {
		$scope.authentication = Authentication;

		// Create new Arch
		$scope.create = function() {
			// Create new Arch object
			var arch = new Arches ({
				name: this.name
			});

			// Redirect after save
			arch.$save(function(response) {
				$location.path('arches/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Arch
		$scope.remove = function(arch) {
			if ( arch ) { 
				arch.$remove();

				for (var i in $scope.arches) {
					if ($scope.arches [i] === arch) {
						$scope.arches.splice(i, 1);
					}
				}
			} else {
				$scope.arch.$remove(function() {
					$location.path('arches');
				});
			}
		};

		// Update existing Arch
		$scope.update = function() {
			var arch = $scope.arch;

			arch.$update(function() {
				$location.path('arches/' + arch._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Arches
		$scope.find = function() {
			$scope.arches = Arches.query();
		};

		// Find existing Arch
		$scope.findOne = function() {
			$scope.arch = Arches.get({ 
				archId: $stateParams.archId
			});
		};
	}
]);
'use strict';

//Arches service used to communicate Arches REST endpoints
angular.module('arches').factory('Arches', ['$resource',
	function($resource) {
		return $resource('arches/:archId', { archId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('admin-menu', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('admin-menu', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('admin-menu', 'articles', 'New Article', 'articles/create');*/
	}
]);

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('mainmenu', 'Concept', 'concept', 'dropdown', '/concept', true, null, 2);

        Menus.addMenuItem('mainmenu', 'News', 'news', 'dropdown', '/news', true, null, 5);
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
        state('news', {
            url: '/news',
            templateUrl: 'modules/core/views/people.client.view.html'
        });
	}
]).run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        $state.previous = fromState;
    });
}]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('admin-menu');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
	function($scope, $state, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

	}
]);

'use strict';
/*
angular.module('core').directive('lens', ['$state', '$rootScope', function ($state, $rootScope) {

    var lens = (function () {
        var items, wrappedItem, jQelement;

        function init (element) {
            jQelement = $(element);
            items = jQelement.find('li a span');
            prepareItems(items);
        }

        function prepareItems (items) {
            items.each(function (element) {
                splitStringBySymbols(element.text())
            });
        }

        function splitStringBySymbols (str) {
            for (var i = 0, len = str.length; i < len; i++) {
                wrappedItem += wrapSymbolsInSpan(str[i]);
                console.log(wrappedItem);
            }
        }

        function wrapSymbolsInSpan (symbol) {
            return '<span>' + symbol + '</span>';
        }

        return {
            init: init
        }
    }());

    function link (scope, element, attrs) {
        $( document ).ready(lens.init(element));
    }

    return {
        restrict: 'AE',
        link: link
    };
}]);
      */

'use strict';

angular.module('core').directive('mainmenu', ['Menus',
    function (Menus) {
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/template/mainmenu.view.html',
            link: function (scope) {
                scope.menu = Menus.getMenu('mainmenu');
                scope.menuItemSize = Math.floor(12 / scope.menu.length);
        }
    };
}]);

'use strict';

angular.module('core').directive('stateClass', ['$state', '$rootScope', function ($state, $rootScope) {

    var pageAnimator = {
        animate: function (element, fromState, toState) {
            this.page = toState.name;
            this.prevPage = fromState.name || null;
            this.animationTime = 1000;
            this.$body = jQuery(element);
            this.$circle = this.$body.find('.circle');
            this.pages = {
                projects: 'projects',
                home: 'home',
                concept: 'concept',
                aboutAs: 'about',
                people: 'people'
            };

            this.vw = jQuery(window).width()/100;
            this.vh = jQuery(window).height()/100;

            //this[this.page + 'Animate']();
            this.animateCircle();
        },

        homeAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        projectsAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
            var $projectsPage = this.$body.find('.' + this.pages.projects + '-page');
            var vw = this.vw;

            $projectsPage.css('opacity', 0);

           /* $projectsPage.animate({
                opacity: 1
            }, {
                duration: animationTime * 3,
                done: animateBg
            });*/

            function animateBg () {
                var img1 = $projectsPage.find('.projects-bg-top-img');
                var img2 = $projectsPage.find('.projects-bg-bottom-img');
                img1.height(50*vw).width(50*vw).addClass('animateBg');
                img2.height(50*vw).width(50*vw).addClass('animateBg');
            }

            console.log('projectsAnimate');
        },

        conceptAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        aboutAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        peopleAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        animateCircle: function (callback) {
            var $circle = this.$circle;
            var animationTime = this.animationTime;
            var callback = typeof callback === 'function' ? callback : function(){};
            $circle.stop();

            var getOptions = function (time) {
                time = time || animationTime;
                return {
                    duration: time,
                    done: callback
                }
            };

            //from Home to Projects
            if (this.page === this.pages.projects) {
                if (this.prevPage === this.pages.home) {
                    $circle.animate({
                        bottom: '60%'
                    }, getOptions(animationTime/2))
                        .animate({
                        right: '10%'
                    }, getOptions(animationTime/2));
                } else {
                    $circle.animate({
                        bottom: '60%',
                        right: '10%',
                        height: '10em',
                        width: '10em'
                    }, getOptions());
                }
            }

            //from Projects to Home
            if (this.page === this.pages.home) {
                if (this.prevPage === this.pages.projects) {
                    $circle.animate({
                        right: '58%'
                    }, getOptions(animationTime/2)).animate({
                        bottom: '0'
                    }, getOptions(animationTime/2));
                } else {
                    $circle.animate({
                        right: '58%',
                        bottom: '0',
                        height: '10em',
                        width: '10em'
                    }, getOptions());
                }
            }
        },

        resizeWindow: function () {
            var screenWidth = window.outerWidth();
            var screenHeight = window.outerHeight();
            if (screenWidth / screenHeight > 2) {
                this.$body.width(screenWidth / 2);
            }
        }
    };

    function link (scope, element, attrs) {
        function stateChangeStartHandler (e, toState, toParams, fromState, fromParams) {
            scope.body = scope.body || {};
            scope.body.class = '';

            if(fromState.name) {
                scope.body.class = ' from-' + fromState.name + ' ';
            }

            scope.body.class += toState.name + ' ';
            //console.log('scope.body.class: ' + scope.body.class);
            pageAnimator.animate(element, fromState, toState);

        }

       /* $animate.leave(element).then(function() {
            scope.$apply(function() {
                console.log(' $animate.leave');
            });
        });*/

        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);

    }

    return {
        restrict: 'AE',
        link: link
    };
}])
    /*
    .animation('.view', function() {

        return {
            enter: function(element, done) {
                //run the animation here and call done when the animation is complete
                console.log('enter');

                element.addClass('long-animation');

                return function(cancelled) {
                    console.log('enter return');
                    //this (optional) function will be called when the animation
                    //completes or when the animation is cancelled (the cancelled
                    //flag will be set to true if cancelled).
                };
            },
            leave: function(element, done) {
                console.log('leave');

            },
            move: function(element, done) {
                console.log('move');
            }
        }
    });
*/

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the mainmenu menu
		this.addMenu('admin-menu');

        this.addMenu('mainmenu', true);
	}
]);

'use strict';

angular.module('admin').factory('Projects', ['$resource',
    function($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('people').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('mainmenu', 'People', 'people', 'item', '/people', true, null, 4);
	}
]);
'use strict';

//Setting up route
angular.module('people').config(['$stateProvider',
	function($stateProvider) {
		// People state routing
		$stateProvider.
		state('people', {
			url: '/people',
			templateUrl: 'modules/people/views/people.client.view.html'
		}).
		state('createPeople', {
			url: '/people/create',
			templateUrl: 'modules/people/views/create-people.client.view.html'
		}).
		state('viewPeople', {
			url: '/people/:peopleId',
			templateUrl: 'modules/people/views/view-people.client.view.html'
		}).
		state('editPeople', {
			url: '/people/:peopleId/edit',
			templateUrl: 'modules/people/views/edit-people.client.view.html'
		});
	}
]);
'use strict';

// People controller
angular.module('people').controller('PeopleController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'People',
	function($scope, $stateParams, $state, $location, Authentication, People) {
		$scope.authentication = Authentication;

        $scope.people = {};
        $scope.person = {};

        $scope.people.find = function() {
            People.query(function(data) {
                $scope.people.data = data;
            });
        };

        $scope.selectPerson = function (key) {
            $scope.person.selected = key;
        }

	}
]);

'use strict';

angular.module('people').directive('people',
    function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: '=',
            templateUrl: 'modules/people/directives/template/people.view.html',
            link: function (scope, element, attrs) {
                scope.people = [
                    {
                        name: 'Project 1',
                        image: '/img/people/no-image.jpg',
                        position: 1
                    },
                    {
                        name: 'Project 2',
                        image: '/img/people/no-image.jpg',
                        position: 2
                    },
                    {
                        name: 'Project 3',
                        image: '/img/people/no-image.jpg',
                        position: 3
                    },
                    {
                        name: 'Project 4',
                        image: '/img/people/no-image.jpg',
                        position: 4
                    },
                    {
                        name: 'Project 5',
                        image: '/img/people/no-image.jpg',
                        position: 5
                    }
                ];
            }
        };
    }
);
'use strict';

angular.module('admin').factory('People', ['$resource',
    function ($resource) {
        return $resource('people/:personId', {
            personId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('projects').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('mainmenu', 'Projects', 'projects', 'dropdown', '/projects', true, null, 1);
		/*Menus.addSubMenuItem('mainmenu', 'projects', 'List Projects', 'projects');
		Menus.addSubMenuItem('mainmenu', 'projects', 'New Project', 'projects/create');*/
	}
]);
'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('projects', {
			url: '/projects',
			templateUrl: 'modules/projects/views/list-projects.client.view.html'
		}).
		state('createProject', {
			url: '/projects/create',
			templateUrl: 'modules/projects/views/create-project.client.view.html'
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/view-project.client.view.html'
		}).
		state('editProject', {
			url: '/projects/:projectId/edit',
			templateUrl: 'modules/projects/views/edit-project.client.view.html'
		});
	}
]);
'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
    function ($scope, $stateParams, $state, $location, Authentication, Projects) {
        $scope.authentication = Authentication;

        var Service = Projects;

        $scope.page = {};
        $scope.projects = {};
        $scope.projects.commerce = [];
        $scope.projects.live = [];

        $scope._organizeProducts = function (data) {
            data.forEach(function (project) {
                if (project.section === 'commerce') {
                    $scope.projects.commerce.push(project);
                } else {
                    $scope.projects.live.push(project);
                }
            })
        };

        $scope.page.find = function () {
            Service.query(function (data) {
                $scope._organizeProducts(data);
            });
        };

        var projects = {};
        projects.commerce = $scope.projects;
        projects.live = [
            {
                name: 'Project live 1',
                image: 'img/projects/icons_project/projects_live/icons.png',
                position: 1
            },
            {
                name: 'Project live 2',
                image: 'img/projects/icons_project/projects_live/icons1.png',
                position: 2
            },
            {
                name: 'Project live 3',
                image: 'img/projects/icons_project/projects_live/icons2.png',
                position: 3
            }
        ];

        $scope.projectsList = projects;

    }
]);

'use strict';

angular.module('projects').directive('projects',
    function () {
        return {
            restrict: 'AE',
            replace: true,
            scope:  {set: '='},
            templateUrl: 'modules/projects/directives/template/projects.view.html',
            link: function (scope, element, attrs) {

            }
        };
    }
);

'use strict';

angular.module('admin').factory('Concepts', ['$resource',
    function ($resource) {
        return $resource('concepts/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

angular.module('admin').factory('Projects', ['$resource',
    function ($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);