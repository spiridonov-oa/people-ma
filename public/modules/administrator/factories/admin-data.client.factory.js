'use strict';

angular.module('admin').factory('AdminDataFactory', ['$state', '$location',
    function ($state, $location) {

        function Service(options) {
            this.unitUrl = options.unitUrl; //  '/admin/people'
            this.unitPath = options.unitPath; //  '#!/admin/people'
            this.service = options.service;
        }

        Service.prototype.create = function(obj, data) {

            var instance = new this.service(data);

            var that = this;

            instance.$save(function (response) {
                $location.path(that.unitUrl);
                that.find();
                obj.data = {};
            }, function (errorResponse) {
                if (errorResponse.data && errorResponse.data.message) {
                    obj.error = errorResponse.data.message;
                } else {
                    console.error("Can't save data.");
                    console.log(errorResponse);
                }
            });
        };

        Service.prototype.update = function (obj) {
            var that = this;
            var data = obj.data;

            data.$update(function () {
                $location.path(that.unitUrl + '/' + data._id);
                that.find(obj);
            }, function (errorResponse) {
                if (errorResponse.data && errorResponse.data.message) {
                    obj.error = errorResponse.data.message;
                } else {
                    console.error("Can't find data.");
                    console.log(errorResponse);
                }
            });
        };

        Service.prototype.remove = function(obj, data) {
            var that = this;
            if (data) {
                data.$remove();

                for (var i in obj.list) {
                    if (obj.list[i] === data) {
                        obj.list.splice(i, 1);
                    }
                }
            } else {
                obj.data.$remove(function () {
                    $location.path(that.unitUrl);
                    this.find(obj);
                });
            }
        };
        Service.prototype.find = function(obj) {
            this.service.query(function (data) {
                obj.list = data;
            },function (errorResponse) {
                if (errorResponse.data && errorResponse.data.message) {
                    obj.error = errorResponse.data.message;
                } else {
                    console.error("Can't find data.");
                    console.log(errorResponse);
                }
            });
        };
        Service.prototype.findOne = function(obj, getRequestParams) {
            this.service.get(getRequestParams, function (data) {
                obj.data = data;
            },function (errorResponse) {
                if (errorResponse.data && errorResponse.data.message) {
                    obj.error = errorResponse.data.message;
                } else {
                    console.error("Can't find data.");
                    console.log(errorResponse);
                }
            });
        };

        return Service;





         /*
        var person = {};
        var init = function () {
            var personId = $state.params['personId'];
            var personUrl = '/admin/people';

            person.path = '#!/admin/people';
            person.currentPersonId = personId;
            person.isCreateNewPerson = !personId;

            person.create = function () {
                var instance = new AdminPeople({
                    fName: person.data.fName || '',
                    lName: person.data.lName || '',
                    position: person.data.position || '',
                    photo: person.data.photo || '',
                    ava: person.data.ava || '',
                    order: person.data.order || 0
                });
                instance.$save(function (response) {
                    $location.path(personUrl);
                    person.find();
                    person.data = {};
                }, function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.remove = function (data) {
                if (data) {
                    data.$remove();

                    for (var i in person.peopleArray) {
                        if (person.peopleArray[i] === data) {
                            person.peopleArray.splice(i, 1);
                        }
                    }
                } else {
                    person.data.$remove(function () {
                        $location.path(personUrl);
                        person.find();
                    });
                }
            };

            person.update = function () {
                var data = person.data;

                data.$update(function () {
                    $location.path(personUrl + '/' + data._id);
                    person.find();
                }, function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.find = function () {
                AdminPeople.query(function (data) {
                    person.peopleArray = data;
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.submit = function () {
                if (person.isCreateNewPerson) {
                    person.create();
                } else {
                    person.update();
                }
            };

            person.findById = function (objId) {
                return AdminPeople.get({
                    personId: objId
                },function (data) {
                    person.data = data;
                    person.find();
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.findOne = function () {
                AdminPeople.get({
                    personId: personId
                }, function (data) {
                    person.data = data;
                    person.find();
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            if (person.currentPersonId) {
                person.findOne();
            } else {
                person.data = {};
                person.find();
            }

            return person;
        };

        return {
            getPerson: function () {
                return init();
            }
        }
        */
    }
]);

