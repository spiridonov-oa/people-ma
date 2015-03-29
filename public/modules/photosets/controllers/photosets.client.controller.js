'use strict';

// Photosets controller
angular.module('photosets').controller('PhotosetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Photosets',
	function($scope, $stateParams, $location, Authentication, Photosets, FileUploader) {
		$scope.authentication = Authentication;
       // $scope.uploader = new FileUploader();

		// Create new Photoset
		$scope.create = function() {
			// Create new Photoset object
			var photoset = new Photosets ({
				name: this.name,
                description:this.description ,
                photopath:this.photopath,
                trumbpath:this.trumbpath,
                setname:this.setname
			});

			// Redirect after save
			photoset.$save(function(response) {
				$location.path('photosets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});


		};

		// Remove existing Photoset
		$scope.remove = function(photoset) {
			if ( photoset ) { 
				photoset.$remove();

				for (var i in $scope.photosets) {
					if ($scope.photosets [i] === photoset) {
						$scope.photosets.splice(i, 1);
					}
				}
			} else {
				$scope.photoset.$remove(function() {
					$location.path('photosets');
				});
			}
		};

		// Update existing Photoset
		$scope.update = function() {
			var photoset = $scope.photoset;

			photoset.$update(function() {
				$location.path('photosets/' + photoset._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Photosets
		$scope.find = function() {
			$scope.photosets = Photosets.query();
		};

		// Find existing Photoset
		$scope.findOne = function() {
			$scope.photoset = Photosets.get({ 
				photosetId: $stateParams.photosetId
			});
		};


	}
]);