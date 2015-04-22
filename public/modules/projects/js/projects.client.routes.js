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
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/view-project.client.view.html'
		}).
        state('concepts', {
            url: '/concepts',
            templateUrl: 'modules/projects/views/list-projects.client.view.html'
        }).
		state('editProject', {
			url: '/concepts/:projectId/',
			templateUrl: 'modules/projects/views/project-gallery.client.view.html'
		});
	}
]);
