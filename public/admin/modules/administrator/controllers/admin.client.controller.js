'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication',
	function($scope, $state, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

	}
]);
