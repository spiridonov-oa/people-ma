'use strict';

angular.module('projects').directive('projects',
    function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: '=',
            templateUrl: 'modules/projects/directives/template/projects.view.html',
            link: function (scope, element, attrs) {
                scope.projects = [
                    {
                        name: 'Project 1',
                        image: '/img/projects/no-image.jpg',
                        position: 1
                    },
                    {
                        name: 'Project 2',
                        image: '/img/projects/no-image.jpg',
                        position: 2
                    },
                    {
                        name: 'Project 3',
                        image: '/img/projects/no-image.jpg',
                        position: 3
                    },
                    {
                        name: 'Project 4',
                        image: '/img/projects/no-image.jpg',
                        position: 4
                    },
                    {
                        name: 'Project 5',
                        image: '/img/projects/no-image.jpg',
                        position: 5
                    }
                ];
            }
        };
    }
);