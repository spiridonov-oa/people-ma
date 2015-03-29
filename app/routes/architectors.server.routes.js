'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var architectors = require('../../app/controllers/architectors.server.controller');

	// Architectors Routes
	app.route('/architectors')
		.get(architectors.list)
		.post(users.requiresLogin, architectors.create);

	app.route('/architectors/:architectorId')
		.get(architectors.read)
		.put(users.requiresLogin, architectors.hasAuthorization, architectors.update)
		.delete(users.requiresLogin, architectors.hasAuthorization, architectors.delete);

	// Finish by binding the Architector middleware
	app.param('architectorId', architectors.architectorByID);
};
