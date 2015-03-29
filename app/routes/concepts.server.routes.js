'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var concepts = require('../../app/controllers/concepts.server.controller');

	// Concepts Routes
	app.route('/concepts')
		.get(concepts.list)
		.post(users.requiresLogin, concepts.create);

	app.route('/concepts/:conceptId')
		.get(concepts.read)
		.put(users.requiresLogin, concepts.hasAuthorization, concepts.update)
		.delete(users.requiresLogin, concepts.hasAuthorization, concepts.delete);

	// Finish by binding the Concept middleware
	app.param('conceptId', concepts.conceptByID);
};
