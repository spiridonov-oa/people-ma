'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Concept = mongoose.model('Concept'),
	_ = require('lodash');

/**
 * Create a Concept
 */
exports.create = function(req, res) {
	var concept = new Concept(req.body);
	concept.user = req.user;

	concept.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concept);
		}
	});
};

/**
 * Show the current Concept
 */
exports.read = function(req, res) {
	res.jsonp(req.concept);
};

/**
 * Update a Concept
 */
exports.update = function(req, res) {
	var concept = req.concept ;

	concept = _.extend(concept , req.body);

	concept.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concept);
		}
	});
};

/**
 * Delete an Concept
 */
exports.delete = function(req, res) {
	var concept = req.concept ;

	concept.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concept);
		}
	});
};

/**
 * List of Concepts
 */
exports.list = function(req, res) { 
	Concept.find().sort('-created').populate('user', 'displayName').exec(function(err, concepts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concepts);
		}
	});
};

/**
 * Concept middleware
 */
exports.conceptByID = function(req, res, next, id) { 
	Concept.findById(id).populate('user', 'displayName').exec(function(err, concept) {
		if (err) return next(err);
		if (! concept) return next(new Error('Failed to load Concept ' + id));
		req.concept = concept ;
		next();
	});
};

/**
 * Concept authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.concept.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
