'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Architector = mongoose.model('Architector'),
	_ = require('lodash');

/**
 * Create a Architector
 */
exports.create = function(req, res) {
	var architector = new Architector(req.body);
	architector.user = req.user;

	architector.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(architector);
		}
	});
};

/**
 * Show the current Architector
 */
exports.read = function(req, res) {
	res.jsonp(req.architector);
};

/**
 * Update a Architector
 */
exports.update = function(req, res) {
	var architector = req.architector ;

	architector = _.extend(architector , req.body);

	architector.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(architector);
		}
	});
};

/**
 * Delete an Architector
 */
exports.delete = function(req, res) {
	var architector = req.architector ;

	architector.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(architector);
		}
	});
};

/**
 * List of Architectors
 */
exports.list = function(req, res) { 
	Architector.find().sort('-created').populate('user', 'displayName').exec(function(err, architectors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(architectors);
		}
	});
};

/**
 * Architector middleware
 */
exports.architectorByID = function(req, res, next, id) { 
	Architector.findById(id).populate('user', 'displayName').exec(function(err, architector) {
		if (err) return next(err);
		if (! architector) return next(new Error('Failed to load Architector ' + id));
		req.architector = architector ;
		next();
	});
};

/**
 * Architector authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.architector.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
