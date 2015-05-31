'use strict';

angular.module('admin').controller('AdminConceptsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminConcepts',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminConcepts) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.isAuthorised = $scope.authentication.user && $scope.authentication.user._id;

        if (!$scope.isAuthorised) {
            $location.path('/signin');
            return;
        }

        $scope.project = AdminProjectFactory.getProject('concept', AdminConcepts);

    }
]);
