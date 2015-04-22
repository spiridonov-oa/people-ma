'use strict';

// Projects controller
angular.module('projects').controller('ProjectGalleryController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
    function ($scope, $stateParams, $state, $location, Authentication, Projects, Con) {
        $scope.authentication = Authentication;

        var Service = Projects;

        $scope.project = {};
        $scope.project.photos = [];


        $scope.findById = function (objId) {
            return Service.get({
                projectId: objId
            }, function (data) {
                $scope.project = data;
            });
        };

        $scope.findById($stateParams.projectId);

    }
]);
