'use strict';

//Setting up route
angular.module('people').config(['$stateProvider',
	function($stateProvider) {
		// People state routing
		$stateProvider.
		state('people', {
			url: '/people',
			templateUrl: 'modules/people/views/people.client.view.html'
		}).
		state('createPeople', {
			url: '/people/create',
			templateUrl: 'modules/people/views/create-people.client.view.html'
		}).
		state('viewPeople', {
			url: '/people/:peopleId',
			templateUrl: 'modules/people/views/view-people.client.view.html'
		}).
		state('editPeople', {
			url: '/people/:peopleId/edit',
			templateUrl: 'modules/people/views/edit-people.client.view.html'
		});
	}
]);