'use strict';

//Photosets service used to communicate Photosets REST endpoints
angular.module('photosets').factory('Photosets', ['$resource',
	function($resource) {
		return $resource('photosets/:photosetId', { photosetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);