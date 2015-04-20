'use strict';

angular.module('admin').factory('Concepts', ['$resource',
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
