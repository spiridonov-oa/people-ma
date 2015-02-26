'use strict';

angular.module('core').controller('AboutUsController', ['$scope', '$state', '$rootScope','Authentication',
	function($scope, $state, $rootScope,  Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $rootScope.stateName = function () {
            return $state.current.name;
        };

    }]);