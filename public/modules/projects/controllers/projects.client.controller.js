'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $state, $location, Authentication, Projects) {
		$scope.authentication = Authentication;

        $scope.projects = {};

        $scope.project.find = function() {
            Projects.query(function(data) {
                $scope.projects = data;
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
