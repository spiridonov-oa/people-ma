'use strict';

angular.module('admin').factory('People', ['$resource',
    function ($resource) {
        return $resource('people/:personId', {
            personId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
