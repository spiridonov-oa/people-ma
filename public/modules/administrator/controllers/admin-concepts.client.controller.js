'use strict';

angular.module('admin').controller('AdminConceptsController', ['$scope', '$state', 'Authentication', '$location', 'ProjectFactory', 'Concepts',
    function($scope, $state, Authentication, $location, ProjectFactory, Concepts) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.project = ProjectFactory.getProject('concept', Concepts);

    }
]);
