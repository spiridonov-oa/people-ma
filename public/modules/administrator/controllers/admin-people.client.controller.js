'use strict';

angular.module('admin').controller('AdminPeopleController', ['$scope', '$state', 'Authentication', '$location', 'AdminPersonFactory',
    function($scope, $state, Authentication, $location, AdminPersonFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        if (!$scope.authentication.user || !$scope.authentication.user._id) {
            $location.path('/signin');
        }


        $scope.person = AdminPersonFactory.getPerson();

    }
]);
