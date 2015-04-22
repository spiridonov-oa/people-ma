'use strict';

// People controller
angular.module('people').controller('PeopleController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'People',
	function($scope, $stateParams, $state, $location, Authentication, People) {
		$scope.authentication = Authentication;

        $scope.people = {};
        $scope.person = {};

        $scope.people.find = function() {
            People.query(function(data) {
                $scope.people.data = data;
            });
        };

        $scope.selectPerson = function (key) {
            $scope.person.selected = key;
        }

	}
]);
