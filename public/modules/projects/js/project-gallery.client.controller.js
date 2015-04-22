'use strict';

// Projects controller
angular.module('projects').controller('ProjectGalleryController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
    function ($scope, $stateParams, $state, $location, Authentication, Projects) {
        $scope.authentication = Authentication;

        var Service = Projects;

        $scope.goBack = function () {
            $state.go($state.previous.name);
        };

        $scope.carousel = {};
        $scope.carousel.index = 0;

        $scope.project = {};
        $scope.project.photos = [];
        for(var i = 1; i <= 32; i++) {
            $scope.project.photos.push('/img/projects/pr/pr_' + i + '.jpg');
        }

        $scope.carousel.nextSlide = function () {
             if ($scope.carousel.index < $scope.project.photos.length) {
                 $scope.carousel.index += 1;
             } else {
                // $scope.carousel.index = 0;
             }
        };

        $scope.carousel.prevSlide = function () {
            if ($scope.carousel.index > 0) {
                $scope.carousel.index -= 1;
            } else {
               // $scope.carousel.index = $scope.project.photos.length;
            }
        };

        $scope.carousel.getPrevImage = function (){

        };

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
