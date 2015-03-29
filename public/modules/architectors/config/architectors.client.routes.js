'use strict';

//Setting up route
angular.module('architectors').config(['$stateProvider',
	function($stateProvider) {
		// Architectors state routing
		$stateProvider.
		state('persons', {
			url: '/persons',
			templateUrl: 'modules/architectors/views/persons.client.view.html'
		}).
		state('listArchitectors', {
			url: '/architectors',
			templateUrl: 'modules/architectors/views/list-architectors.client.view.html'
		}).
		state('createArchitector', {
			url: '/architectors/create',
			templateUrl: 'modules/architectors/views/create-architector.client.view.html'
		}).
		state('viewArchitector', {
			url: '/architectors/:architectorId',
			templateUrl: 'modules/architectors/views/view-architector.client.view.html'
		}).
		state('editArchitector', {
			url: '/architectors/:architectorId/edit',
			templateUrl: 'modules/architectors/views/edit-architector.client.view.html'
		});
	}
]);