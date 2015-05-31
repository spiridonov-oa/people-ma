'use strict';

angular.module('admin').controller('AdminProjectsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminProjects',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminProjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.isAuthorised = $scope.authentication.user && $scope.authentication.user._id;

        if (!$scope.isAuthorised) {
            $location.path('/signin');
            return;
        }

        $scope.project = AdminProjectFactory.getProject('project', AdminProjects);

    }
]);
