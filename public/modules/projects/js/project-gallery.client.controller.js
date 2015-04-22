'use strict';

// Projects controller
angular.module('projects').controller('ProjectGalleryController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
    function ($scope, $stateParams, $state, $location, Authentication, Projects) {
        $scope.authentication = Authentication;

        var Service = Projects;

        $scope.goBack = function () {
            $state.go($state.previous.name);
        };


        $scope.project = {};
        $scope.project.photos = ['/img/projects/pr/pr1.png', '/img/projects/pr/pr2.png'];

/*
        $scope.findById = function (objId) {
            return Service.get({
                projectId: objId
            }, function (data) {
                //$scope.project = data;
            });
        };*/

        //$scope.findById($stateParams.projectId);

    }
]);
