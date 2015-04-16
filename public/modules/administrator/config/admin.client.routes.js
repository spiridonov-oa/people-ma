'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Concepts state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/administrator/views/admin.client.view.html'
		}).
		state('adminProjects', {
			url: '/admin/projects',
			templateUrl: 'modules/administrator/views/admin-projects.client.view.html'
		}).
		state('adminConcepts', {
			url: '/admin/concepts',
			templateUrl: 'modules/administrator/views/admin-concepts.client.view.html'
		}).
		state('adminPeoples', {
			url: '/admin/peoples',
			templateUrl: 'modules/administrator/views/admin-peoples.client.view.html'
		});
	}
]);
