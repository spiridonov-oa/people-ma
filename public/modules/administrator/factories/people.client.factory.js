'use strict';

angular.module('admin').factory('AdminPersonFactory', ['$state', '$location', 'AdminPeople',
    function ($state, $location, AdminPeople) {
        var person = {};

        var init = function () {
            var personId = $state.params['personId'];
            var personUrl = '/admin/people';

            person.path = '#!/admin/people';
            person.currentPersonId = personId;
            person.isCreateNewPerson = !personId;

            person.create = function () {
                var instance = new People({
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
                People.query(function (data) {
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
                return People.get({
                    personId: objId
                },function (data) {
                    person.data = data;
                    person.find();
                },function (errorResponse) {
                    person.error = errorResponse.data.message;
                });
            };

            person.findOne = function () {
                People.get({
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
    }
]);

