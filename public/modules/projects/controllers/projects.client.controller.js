'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$rootScope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
	function($scope, $rootScope, $stateParams, $state, $location, Authentication, Projects) {
		$scope.authentication = Authentication;

        $rootScope.stateName = function () {
            return $state.current.name;
        };

        var projects = {};
        projects.commerce = [
            {
                name: 'Project 1',
                image: 'img/projects/icons_project/projects_commerce/3icons.jpg',
                position: 1
            },
            {
                name: 'Project 2',
                image: 'img/projects/icons_project/projects_commerce/4icons.jpg',
                position: 2
            },
            {
                name: 'Project 3',
                image: 'img/projects/icons_project/projects_commerce/5icons.jpg',
                position: 3
            },
            {
                name: 'Project 4',
                image: 'img/projects/icons_project/projects_commerce/6icons.jpg',
                position: 4
            },
            {
                name: 'Project 5',
                image: 'img/projects/icons_project/projects_commerce/7icons.jpg',
                position: 5
            }
        ];
        projects.live = [
            {
                name: 'Project live 1',
                image: 'img/projects/icons_project/projects_live/icons.jpg',
                position: 1
            },
            {
                name: 'Project live 2',
                image: 'img/projects/icons_project/projects_live/1icons.jpg',
                position: 2
            },
            {
                name: 'Project live 3',
                image: 'img/projects/icons_project/projects_live/2icons.jpg',
                position: 3
            }
        ];

        $scope.projectsList = projects;



		// Create new Project
		$scope.create = function() {
			// Create new Project object
			var project = new Projects ({
				name: this.name
			});

			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Project
		$scope.remove = function(project) {
			if ( project ) {
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;

			project.$update(function() {
				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};
	}
]);