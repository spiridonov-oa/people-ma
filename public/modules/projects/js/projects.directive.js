'use strict';

angular.module('projects').directive('projects',
    function () {
        return {
            restrict: 'AE',
            replace: true,
            scope:  {set: '='},
            templateUrl: 'modules/projects/js/template/projects.view.html',
            link: function (scope, element, attrs) {

            }
        };
    }
);
