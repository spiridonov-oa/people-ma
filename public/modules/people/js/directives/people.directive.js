'use strict';

angular.module('people').directive('people',
    function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: '=',
            templateUrl: 'modules/people/directives/template/people.view.html',
            link: function (scope, element, attrs) {
                scope.people = [
                    {
                        name: 'Project 1',
                        image: '/img/people/no-image.jpg',
                        position: 1
                    },
                    {
                        name: 'Project 2',
                        image: '/img/people/no-image.jpg',
                        position: 2
                    },
                    {
                        name: 'Project 3',
                        image: '/img/people/no-image.jpg',
                        position: 3
                    },
                    {
                        name: 'Project 4',
                        image: '/img/people/no-image.jpg',
                        position: 4
                    },
                    {
                        name: 'Project 5',
                        image: '/img/people/no-image.jpg',
                        position: 5
                    }
                ];
            }
        };
    }
);