'use strict';

// Architectors controller
angular.module('architectors').controller('ArchitectorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Architectors',
	function($scope, $stateParams, $location, Authentication, Architectors) {
		$scope.authentication = Authentication;

		// Create new Architector
		$scope.create = function() {
			// Create new Architector object
			var architector = new Architectors ({
				name: this.name,
                position :this.position
			});

			// Redirect after save
			architector.$save(function(response) {
				$location.path('architectors/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.position = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Architector
		$scope.remove = function(architector) {
			if ( architector ) { 
				architector.$remove();

				for (var i in $scope.architectors) {
					if ($scope.architectors [i] === architector) {
						$scope.architectors.splice(i, 1);
					}
				}
			} else {
				$scope.architector.$remove(function() {
					$location.path('architectors');
				});
			}
		};

		// Update existing Architector
		$scope.update = function() {
			var architector = $scope.architector;

			architector.$update(function() {
				$location.path('architectors/' + architector._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Architectors
		$scope.find = function() {
			$scope.architectors = Architectors.query();
		};

		// Find existing Architector
		$scope.findOne = function() {
			$scope.architector = Architectors.get({ 
				architectorId: $stateParams.architectorId
			});
		};
	}
]);