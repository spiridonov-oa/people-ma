'use strict';

angular.module('admin').controller('AdminProjectsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminProjects',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminProjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = AdminProjectFactory.getProject('project', AdminProjects);

    }
]);
