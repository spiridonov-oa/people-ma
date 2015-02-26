'use strict';

angular.module('projects').directive('projects', ['ProjectsFactory',
    function (ProjectsFactory) {
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/template/projects.view.html',
            link: function (scope) {
                scope.projects = ProjectsFactory.getProjects();
            }
    };
}]);