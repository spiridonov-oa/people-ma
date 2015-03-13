'use strict';

// Projects controller
angular.module('about-us').controller('AboutUsController', ['$scope', '$rootScope', '$stateParams', '$state', '$location', 'Authentication',
	function($scope, $rootScope, $stateParams, $state, $location, Authentication) {
		$scope.authentication = Authentication;

        $rootScope.stateName = function () {
            return $state.current.name;
        };

	}
]);