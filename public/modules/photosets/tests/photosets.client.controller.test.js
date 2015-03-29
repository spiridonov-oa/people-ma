'use strict';

(function() {
	// Photosets Controller Spec
	describe('Photosets Controller Tests', function() {
		// Initialize global variables
		var PhotosetsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Photosets controller.
			PhotosetsController = $controller('PhotosetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Photoset object fetched from XHR', inject(function(Photosets) {
			// Create sample Photoset using the Photosets service
			var samplePhotoset = new Photosets({
				name: 'New Photoset'
			});

			// Create a sample Photosets array that includes the new Photoset
			var samplePhotosets = [samplePhotoset];

			// Set GET response
			$httpBackend.expectGET('photosets').respond(samplePhotosets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.photosets).toEqualData(samplePhotosets);
		}));

		it('$scope.findOne() should create an array with one Photoset object fetched from XHR using a photosetId URL parameter', inject(function(Photosets) {
			// Define a sample Photoset object
			var samplePhotoset = new Photosets({
				name: 'New Photoset'
			});

			// Set the URL parameter
			$stateParams.photosetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/photosets\/([0-9a-fA-F]{24})$/).respond(samplePhotoset);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.photoset).toEqualData(samplePhotoset);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Photosets) {
			// Create a sample Photoset object
			var samplePhotosetPostData = new Photosets({
				name: 'New Photoset'
			});

			// Create a sample Photoset response
			var samplePhotosetResponse = new Photosets({
				_id: '525cf20451979dea2c000001',
				name: 'New Photoset'
			});

			// Fixture mock form input values
			scope.name = 'New Photoset';

			// Set POST response
			$httpBackend.expectPOST('photosets', samplePhotosetPostData).respond(samplePhotosetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Photoset was created
			expect($location.path()).toBe('/photosets/' + samplePhotosetResponse._id);
		}));

		it('$scope.update() should update a valid Photoset', inject(function(Photosets) {
			// Define a sample Photoset put data
			var samplePhotosetPutData = new Photosets({
				_id: '525cf20451979dea2c000001',
				name: 'New Photoset'
			});

			// Mock Photoset in scope
			scope.photoset = samplePhotosetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/photosets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/photosets/' + samplePhotosetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid photosetId and remove the Photoset from the scope', inject(function(Photosets) {
			// Create new Photoset object
			var samplePhotoset = new Photosets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Photosets array and include the Photoset
			scope.photosets = [samplePhotoset];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/photosets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePhotoset);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.photosets.length).toBe(0);
		}));
	});
}());