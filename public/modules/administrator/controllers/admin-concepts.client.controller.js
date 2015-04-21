'use strict';

angular.module('admin').controller('AdminConceptsController', ['$scope', '$state', 'Authentication', '$location', 'AdminProjectFactory', 'AdminConcepts',
    function($scope, $state, Authentication, $location, AdminProjectFactory, AdminConcepts) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = AdminProjectFactory.getProject('concept', AdminConcepts);

    }
]);
