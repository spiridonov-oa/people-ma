'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Projects', 'Concepts',
    function ($scope, $stateParams, $state, $location, Authentication, Projects, Concepts) {
        $scope.authentication = Authentication;

        var Service;
        if ($state.current.name === 'projects') {
            Service = Projects;
        } else if ($state.current.name === 'concepts') {
            Service = Concepts;
        }

        $scope.page = {};
        $scope.projects = {};
        $scope.projects.commerce = [];
        $scope.projects.live = [];

        var generateUrl = function (project) {
            return '#!/' + $state.current.name + '/' + project._id;
        };

        $scope._organizeProducts = function (data) {
            data.forEach(function (project) {
                project.url = generateUrl(project);
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

                  /*
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
                              */
    }
]);
