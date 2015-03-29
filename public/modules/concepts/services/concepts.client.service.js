'use strict';

//Concepts service used to communicate Concepts REST endpoints
angular.module('concepts').factory('Concepts', ['$resource',
	function($resource) {
		return $resource('concepts/:conceptId', { conceptId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);