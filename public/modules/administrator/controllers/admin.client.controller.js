'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', 'Projects', '$location',
	function($scope, $state, Authentication, Projects, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.project = {};

        $scope.project.currentProjectId =  $state.params.projectId;

        $scope.project.isCreateNewProject = !$state.params.projectId;

        $scope.project.create = function() {
            var project = new Projects({
                name: this.data.name || '',
                times: this.data.times || '',
                description: this.data.description || '',
                tags: "project",
                photos: [],
                type: this.data.type || 'commerce',
                order: this.data.order || 0
            });
            project.$save(function(response) {
                $location.path('admin/projects/');
                $scope.project.find();
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
                $scope.project.data.$remove(function() {
                    $location.path('admin/projects');
                    $scope.project.find();
                });
            }
        };

        $scope.project.update = function() {
            var project = $scope.project.data;

            project.$update(function() {
                $location.path('admin/projects/' + project._id);
                $scope.project.find();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.project.find = function() {
            Projects.query(function(data) {
                $scope.projects = data;
            });
        };

        $scope.project.submit = function () {
            if($scope.project.isCreateNewProject) {
                $scope.project.create();
            } else {
                $scope.project.update();
            }
        };

        $scope.project.find();

        $scope.project.findById = function(projectId) {
             return Projects.get({
                projectId: projectId
            });
        };

        $scope.project.findOne = function() {
            var project = Projects.get({
                projectId: $state.params.projectId
            }, function(project) {
                $scope.project.data = project;
            });
        };

        if ($state.params.projectId) {
            $scope.project.findOne();
        }

	}
]);
