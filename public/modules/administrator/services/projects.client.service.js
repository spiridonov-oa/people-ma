'use strict';

angular.module('admin').factory('AdminProjects', ['$resource',
    function ($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
