'use strict';

angular.module('admin').controller('AdminConceptsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminConcepts',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminConcepts) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        if (!$scope.authentication.user || !$scope.authentication.user._id) {
            $location.path('/signin');
        }

        $scope.project = AdminProjectFactory.getProject('concept', AdminConcepts);

    }
]);
