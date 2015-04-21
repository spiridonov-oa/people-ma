'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', '$location',
    function ($scope, $state, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        if (!$scope.authentication.user || !$scope.authentication.user._id) {
            $location.path('/signin');
        }


    }
]);
