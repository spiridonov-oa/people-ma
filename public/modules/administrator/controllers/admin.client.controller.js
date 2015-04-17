'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$state', 'Authentication', 'Projects', '$location',
	function($scope, $state, Authentication, ServiceObject, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        var page = 'project';

        init(page);

        function init (obj) {

            var objId = obj + 'Id';
            var objUrl = 'admin/' + obj + 's/';

            $scope[obj] = {};

            $scope[obj].currentProjectId =  $state.params[objId];

            $scope[obj].isCreateNewProject = !$state.params[objId];

            $scope[obj].create = function() {
                var instance = new ServiceObject({
                    name: this.data.name || '',
                    times: this.data.times || '',
                    description: this.data.description || '',
                    tags: obj,
                    photos: [],
                    type: this.data.type || 'commerce',
                    order: this.data.order || 0
                });
                instance.$save(function(response) {
                    $location.path(objUrl);
                    $scope[obj].find();
                    obj.data = {};
                }, function(errorResponse) {
                    $scope[obj].error = errorResponse.data.message;
                });
            };

            $scope[obj].remove = function(data) {
                if (data) {
                    data.$remove();

                    for (var i in $scope.objArray) {
                        if ($scope.objArray[i] === data) {
                            $scope.objArray.splice(i, 1);
                        }
                    }
                } else {
                    $scope[obj].data.$remove(function() {
                        $location.path(objUrl);
                        $scope[obj].find();
                    });
                }
            };

            $scope[obj].update = function() {
                var data = $scope[obj].data;

                data.$update(function() {
                    $location.path(objUrl + data._id);
                    $scope[obj].find();
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            $scope[obj].find = function() {
                ServiceObject.query(function(data) {
                    $scope.objArray = data;
                });
            };

            $scope[obj].submit = function () {
                if($scope[obj].isCreateNewProject) {
                    $scope[obj].create();
                } else {
                    $scope[obj].update();
                }
            };

            $scope[obj].find();

            $scope[obj].findById = function(objId) {
                return ServiceObject.get({
                    projectId: objId
                });
            };

            $scope[obj].findOne = function() {
                ServiceObject.get({
                    projectId: $state.params[objId]
                }, function(data) {
                    $scope[obj].data = data;
                });
            };

            if ($state.params[objId]) {
                $scope[obj].findOne();
            }
        }
	}
]);
