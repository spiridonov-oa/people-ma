'use strict';

//Setting up route
angular.module('photosets').config(['$stateProvider',
	function($stateProvider) {
		// Photosets state routing
		$stateProvider.
		state('listPhotosets', {
			url: '/photosets',
			templateUrl: 'modules/photosets/views/list-photosets.client.view.html'
		}).
		state('createPhotoset', {
			url: '/photosets/create',
			templateUrl: 'modules/photosets/views/create-photoset.client.view.html'
		}).
		state('viewPhotoset', {
			url: '/photosets/:photosetId',
			templateUrl: 'modules/photosets/views/view-photoset.client.view.html'
		}).
		state('editPhotoset', {
			url: '/photosets/:photosetId/edit',
			templateUrl: 'modules/photosets/views/edit-photoset.client.view.html'
		});
	}
]);