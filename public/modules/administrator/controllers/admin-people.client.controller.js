'use strict';

angular.module('admin').controller('AdminPeopleController', ['$scope', '$state', 'Authentication', '$location', 'PersonFactory',
    function($scope, $state, Authentication, $location, PersonFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.person = PersonFactory.getPerson();

    }
]);
