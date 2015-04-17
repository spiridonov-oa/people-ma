'use strict';

//Setting up route
angular.module('about').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('about', {
			url: '/about',
			templateUrl: 'modules/about/views/about.client.view.html'
		});
	}
]);
