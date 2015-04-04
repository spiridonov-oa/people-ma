'use strict';

//Setting up route
angular.module('about-us').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('about-us', {
			url: '/about-us',
			templateUrl: 'modules/about-us/views/about-us.client.view.html'
		});
	}
]);
