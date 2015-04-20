'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', '$location', 'ProjectFactory',
    function ($scope, $state, Authentication, $location, ProjectFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


    }
]);
