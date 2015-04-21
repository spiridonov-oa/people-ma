'use strict';

angular.module('admin').factory('AdminPeople', ['$resource',
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
