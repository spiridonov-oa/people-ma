'use strict';

angular.module('admin').factory('AdminConcepts', ['$resource',
    function ($resource) {
        return $resource('concepts/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
