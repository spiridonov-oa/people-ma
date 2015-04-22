'use strict';

angular.module('admin').controller('AdminPeopleController', ['$scope', '$state', 'Authentication', '$location', 'AdminPersonFactory',
    function($scope, $state, Authentication, $location, AdminPersonFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        function isAuthorised () {
            return ($scope.authentication.user && $scope.authentication.user._id);
        }

        if (!isAuthorised()) {
            $location.path('/signin');
            return;
        }

        $scope.person = AdminPersonFactory.getPerson();

    }
]);
