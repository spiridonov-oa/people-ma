'use strict';

angular.module('admin').controller('AdminProjectsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminProjects',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminProjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        if (!$scope.authentication.user || !$scope.authentication.user._id) {
            $location.path('/signin');
        }

        $scope.project = AdminProjectFactory.getProject('project', AdminProjects);

    }
]);
