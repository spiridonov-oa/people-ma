'use strict';

angular.module('admin').controller('AdminConceptController', ['$scope', '$state', 'Authentication', 'Projects', '$location',
	function($scope, $state, Authentication, Concepts, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.concept = {};

        $scope.concept.currentConceptId =  $state.params.conceptId;

        $scope.concept.isCreateNewConcept = !$state.params.conceptId;

        $scope.concept.create = function() {
            var concept = new Concepts({
                name: this.data.name || '',
                times: this.data.times || '',
                description: this.data.description || '',
                tags: "concept",
                photos: [],
                type: this.data.type || 'commerce',
                order: this.data.order || 0
            });
            concept.$save(function(response) {
                $location.path('admin/concepts/');
                $scope.concept.find();
                $scope.concept.data = {};
            }, function(errorResponse) {
                $scope.concept.error = errorResponse.data.message;
            });
        };

        $scope.concept.remove = function(concept) {
            if (concept) {
                concept.$remove();

                for (var i in $scope.concepts) {
                    if ($scope.concepts[i] === concept) {
                        $scope.concepts.splice(i, 1);
                    }
                }
            } else {
                $scope.concept.data.$remove(function() {
                    $location.path('admin/concepts');
                    $scope.concept.find();
                });
            }
        };

        $scope.concept.update = function() {
            var concept = $scope.concept.data;

            concept.$update(function() {
                $location.path('admin/concepts/' + concept._id);
                $scope.concept.find();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.concept.find = function() {
            /*Concepts.query(function(data) {
                $scope.concepts = data;
            });*/

            Concepts.get({
                tags: 'concept'
            }, function(data) {
                $scope.concepts = data;
            });
        };

        $scope.concept.submit = function () {
            if($scope.concept.isCreateNewConcept) {
                $scope.concept.create();
            } else {
                $scope.concept.update();
            }
        };

        $scope.concept.find();

        $scope.concept.findById = function(conceptId) {
             return Concepts.get({
                projectId: conceptId
            });
        };

        $scope.concept.findOne = function() {
            var concept = Concepts.get({
                projectId: $state.params.conceptId
            }, function(concept) {
                $scope.concept.data = concept;
            });
        };

        if ($state.params.conceptId) {
            $scope.concept.findOne();
        }

	}
]);
