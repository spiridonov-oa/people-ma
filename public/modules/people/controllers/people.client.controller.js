'use strict';

// People controller
angular.module('people').controller('PeopleController', ['$scope', '$rootScope', '$stateParams', '$state', '$location', 'Authentication',
	function($scope, $rootScope, $stateParams, $state, $location, Authentication) {
		$scope.authentication = Authentication;

        $rootScope.stateName = function () {
            return $state.current.name;
        };

        $scope.people = [
                {firstName: "Alla", secondName: "Micheeva", img: "img/1.jpg", order: 1},
                {firstName: "Nina", secondName: "Micheeva", img: "img/1.jpg", order: 2},
                {firstName: "Zoya", secondName: "Micheeva", img: "img/1.jpg", order: 4},
                {firstName: "Liza", secondName: "Micheeva", img: "img/1.jpg", order: 3}
            ];

	}
]);