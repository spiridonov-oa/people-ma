'use strict';

// Projects controller
angular.module('about-us').controller('AboutUsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication',
	function($scope, $stateParams, $state, $location, Authentication) {
		$scope.authentication = Authentication;

	}
]);
