'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
        state('about-us', {
            url: '/about-us',
            templateUrl: 'modules/core/views/about-us.client.view.html'
        }).
        state('people', {
            url: '/people',
            templateUrl: 'modules/core/views/people.client.view.html'
        }).
        state('news', {
            url: '/news',
            templateUrl: 'modules/core/views/people.client.view.html'
        });
	}
]);