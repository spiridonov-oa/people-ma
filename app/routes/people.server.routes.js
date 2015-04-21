'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var people = require('../../app/controllers/people.server.controller');

	// People Routes
	app.route('/people')
		.get(people.list)
		.post(users.requiresLogin, people.create);

	app.route('/people/:personId')
		.get(people.read)
		.put(users.requiresLogin, people.hasAuthorization, people.update)
		.delete(users.requiresLogin, people.hasAuthorization, people.delete);

	// Finish by binding the Architector middleware
	app.param('personId', people.personByID);
};
