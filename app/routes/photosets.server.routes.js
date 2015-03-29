'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var photosets = require('../../app/controllers/photosets.server.controller');

	// Photosets Routes
	app.route('/photosets')
		.get(photosets.list)
		.post(users.requiresLogin, photosets.create);

	app.route('/photosets/:photosetId')
		.get(photosets.read)
		.put(users.requiresLogin, photosets.hasAuthorization, photosets.update)
		.delete(users.requiresLogin, photosets.hasAuthorization, photosets.delete);

	// Finish by binding the Photoset middleware
	app.param('photosetId', photosets.photosetByID);
};
