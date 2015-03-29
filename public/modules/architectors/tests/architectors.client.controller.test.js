'use strict';

(function() {
	// Architectors Controller Spec
	describe('Architectors Controller Tests', function() {
		// Initialize global variables
		var ArchitectorsController,
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

			// Initialize the Architectors controller.
			ArchitectorsController = $controller('ArchitectorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Architector object fetched from XHR', inject(function(Architectors) {
			// Create sample Architector using the Architectors service
			var sampleArchitector = new Architectors({
				name: 'New Architector'
			});

			// Create a sample Architectors array that includes the new Architector
			var sampleArchitectors = [sampleArchitector];

			// Set GET response
			$httpBackend.expectGET('architectors').respond(sampleArchitectors);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.architectors).toEqualData(sampleArchitectors);
		}));

		it('$scope.findOne() should create an array with one Architector object fetched from XHR using a architectorId URL parameter', inject(function(Architectors) {
			// Define a sample Architector object
			var sampleArchitector = new Architectors({
				name: 'New Architector'
			});

			// Set the URL parameter
			$stateParams.architectorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/architectors\/([0-9a-fA-F]{24})$/).respond(sampleArchitector);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.architector).toEqualData(sampleArchitector);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Architectors) {
			// Create a sample Architector object
			var sampleArchitectorPostData = new Architectors({
				name: 'New Architector'
			});

			// Create a sample Architector response
			var sampleArchitectorResponse = new Architectors({
				_id: '525cf20451979dea2c000001',
				name: 'New Architector'
			});

			// Fixture mock form input values
			scope.name = 'New Architector';

			// Set POST response
			$httpBackend.expectPOST('architectors', sampleArchitectorPostData).respond(sampleArchitectorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Architector was created
			expect($location.path()).toBe('/architectors/' + sampleArchitectorResponse._id);
		}));

		it('$scope.update() should update a valid Architector', inject(function(Architectors) {
			// Define a sample Architector put data
			var sampleArchitectorPutData = new Architectors({
				_id: '525cf20451979dea2c000001',
				name: 'New Architector'
			});

			// Mock Architector in scope
			scope.architector = sampleArchitectorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/architectors\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/architectors/' + sampleArchitectorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid architectorId and remove the Architector from the scope', inject(function(Architectors) {
			// Create new Architector object
			var sampleArchitector = new Architectors({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Architectors array and include the Architector
			scope.architectors = [sampleArchitector];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/architectors\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleArchitector);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.architectors.length).toBe(0);
		}));
	});
}());