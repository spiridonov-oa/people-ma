'use strict';

angular.module('admin').controller('AdminProjectsController', ['$scope', '$state', 'Authentication', '$location', 'ProjectFactory', 'Projects',
    function($scope, $state, Authentication, $location, ProjectFactory, Projects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = ProjectFactory.getProject('project', Projects);

    }
]);
