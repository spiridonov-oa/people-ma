'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', 'Projects',
	function($scope, $state, Authentication, Projects) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.project = {};

        $scope.project.create = function() {
            var project = new Projects({
                name: this.data.name,
                times: this.data.times,
                description: this.data.description,
                tags: this.data.tags,
                photos: [],
                order: this.data.order
            });
            project.$save(function(response) {
                $location.path('admin/projects/');

                $scope.project.data = {};
            }, function(errorResponse) {
                $scope.project.error = errorResponse.data.message;
            });
        };

        $scope.project.remove = function(project) {
            if (project) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects[i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function() {
                    $location.path('projects');
                });
            }
        };

        $scope.project.update = function() {
            var project = $scope.project;

            project.$update(function() {
                $location.path('projects/' + project._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.project.find = function() {
            Projects.query(function(data) {
                $scope.projects = data;
            });
        };

        $scope.project.find();

        $scope.project.findOne = function() {
            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            });
        };
	}
]);
