'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('projects', {
			url: '/projects',
			templateUrl: 'modules/projects/views/list-projects.client.view.html'
		}).
		state('cProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/project-gallery.client.view.html'
		}).
        state('concepts', {
            url: '/concepts',
            templateUrl: 'modules/projects/views/list-projects.client.view.html'
        }).
		state('cConcept', {
			url: '/concepts/:projectId/',
			templateUrl: 'modules/projects/views/project-gallery.client.view.html'
		});
	}
]);
