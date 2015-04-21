'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', '$location',
    function ($scope, $state, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


    }
]);
