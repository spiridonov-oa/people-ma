'use strict';

angular.module('admin').factory('AdminArticles', ['$resource',
    function ($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
