'use strict';

angular.module('admin').factory('AdminProjectFactory', ['$state', '$location',
    function ($state, $location) {
        var project = {};

        var init = function (projectType, Service) {

            var projectId = $state.params['projectId'];
            var projectUrl = '/admin/' + projectType + 's';

            project.path = '#!/admin/' + projectType + 's';
            project.currentProjectId = projectId;
            project.isCreateNewProject = !projectId;

            project.create = function () {
                var instance = new Service({
                    name: project.data.name || '',
                    times: project.data.times || '',
                    description: project.data.description || '',
                    tags: project.data.tags,
                    icon: project.data.icon,
                    photos: [],
                    section: project.data.section || 'commerce',
                    type: projectType,
                    order: project.data.order || 0
                });
                instance.$save(function (response) {
                    $location.path(projectUrl);
                    project.find();
                    project.data = {};
                }, function (errorResponse) {
                    if (errorResponse.data) {
                        project.error = errorResponse.data.message;
                    }
                });
            };

            project.remove = function (data) {
                if (data) {
                    data.$remove();

                    for (var i in project.objArray) {
                        if (project.objArray[i] === data) {
                            project.objArray.splice(i, 1);
                        }
                    }
                } else {
                    project.data.$remove(function () {
                        $location.path(projectUrl);
                        project.find();
                    });
                }
            };

            project.update = function () {
                var data = project.data;

                data.$update(function () {
                    $location.path(projectUrl + '/' + data._id);
                    project.find();
                }, function (errorResponse) {
                    if (errorResponse.data) {
                        project.error = errorResponse.data.message;
                    }
                });
            };

            project.find = function (props) {
                var date = new Date();
                console.log('find ' + projectType);
                Service.query(function (data) {
                    project.objArray = data;
                    var newDate = new Date();
                    console.log((newDate.getTime() - date.getTime())/1000);
                    console.log('------------------------------');
                });
            };

            project.submit = function () {
                if (project.isCreateNewProject) {
                    project.create();
                } else {
                    project.update();
                }
            };

            project.findById = function (objId) {
                var date = new Date();
                console.log('findById ' + projectType);
                return Service.get({
                    projectId: objId
                }, function () {
                    var newDate = new Date();
                    console.log((newDate.getTime() - date.getTime())/1000);
                    console.log('------------------------------');
                });
            };

            project.findOne = function () {
                var date = new Date();
                console.log('findOne ' + projectType);
                Service.get({
                    projectId: projectId
                }, function (data) {
                    project.data = data;
                    project.find();
                    var newDate = new Date();
                    console.log((newDate.getTime() - date.getTime())/1000);
                    console.log('------------------------------');
                });
            };

            if (project.currentProjectId) {
                project.findOne();
            } else {
                project.data = {};
                project.find();
            }

            return project;
        };

        return {
            getProject: function (type, Service) {
                return init(type, Service);
            }
        }
    }
]);

