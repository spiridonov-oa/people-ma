'use strict';

angular.module('admin').controller('AdminPeopleController', ['$scope', '$state', 'Authentication', '$location', 'AdminPersonFactory',
    function($scope, $state, Authentication, $location, AdminPersonFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.person = AdminPersonFactory.getPerson();

    }
]);
