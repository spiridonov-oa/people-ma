'use strict';

// Projects controller
angular.module('projects').controller('ProjectGalleryController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects',
    function ($scope, $stateParams, $state, $location, Authentication, Projects, Con) {
        $scope.authentication = Authentication;

        var Service = Projects;

        $scope.page = {};
        $scope.projects = {};
        $scope.projects.commerce = [];
        $scope.projects.live = [];

        $scope._organizeProducts = function (data) {
            data.forEach(function (project) {
                if (project.section === 'commerce') {
                    $scope.projects.commerce.push(project);
                } else {
                    $scope.projects.live.push(project);
                }
            })
        };

        $scope.page.find = function () {
            Service.query(function (data) {
                $scope._organizeProducts(data);
            });
        };

        var projects = {};
        projects.commerce = $scope.projects;
        projects.live = [
            {
                name: 'Project live 1',
                image: 'img/projects/icons_project/projects_live/icons.png',
                position: 1
            },
            {
                name: 'Project live 2',
                image: 'img/projects/icons_project/projects_live/icons1.png',
                position: 2
            },
            {
                name: 'Project live 3',
                image: 'img/projects/icons_project/projects_live/icons2.png',
                position: 3
            }
        ];

        $scope.projectsList = projects;

    }
]);
