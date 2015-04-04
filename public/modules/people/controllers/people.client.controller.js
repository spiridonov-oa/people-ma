'use strict';

// People controller
angular.module('people').controller('PeopleController', ['$scope', '$stateParams', '$state', '$location', 'Authentication',
	function($scope, $stateParams, $state, $location, Authentication) {
		$scope.authentication = Authentication;

        $scope.people = [
            {firstName: "Alla", secondName: "Micheeva", img: "img/1.jpg", order: 1},
            {firstName: "Nina", secondName: "Micheeva", img: "img/1.jpg", order: 2},
            {firstName: "Zoya", secondName: "Micheeva", img: "img/1.jpg", order: 4},
            {firstName: "Liza", secondName: "Micheeva", img: "img/1.jpg", order: 3}
        ];

	}
]);
