'use strict';

//Architectors service used to communicate Architectors REST endpoints
angular.module('architectors').factory('Architectors', ['$resource',
	function($resource) {
		return $resource('architectors/:architectorId', { architectorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);