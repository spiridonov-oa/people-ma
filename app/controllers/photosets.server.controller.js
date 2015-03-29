'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Photoset = mongoose.model('Photoset'),
	_ = require('lodash');

/**
 * Create a Photoset
 */
exports.create = function(req, res) {
	var photoset = new Photoset(req.body);
	photoset.user = req.user;

	photoset.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photoset);
		}
	});
};

/**
 * Show the current Photoset
 */
exports.read = function(req, res) {
	res.jsonp(req.photoset);
};

/**
 * Update a Photoset
 */
exports.update = function(req, res) {
	var photoset = req.photoset ;

	photoset = _.extend(photoset , req.body);

	photoset.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photoset);
		}
	});
};

/**
 * Delete an Photoset
 */
exports.delete = function(req, res) {
	var photoset = req.photoset ;

	photoset.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photoset);
		}
	});
};

/**
 * List of Photosets
 */
exports.list = function(req, res) { 
	Photoset.find().sort('-created').populate('user', 'displayName').exec(function(err, photosets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photosets);
		}
	});
};

/**
 * Photoset middleware
 */
exports.photosetByID = function(req, res, next, id) { 
	Photoset.findById(id).populate('user', 'displayName').exec(function(err, photoset) {
		if (err) return next(err);
		if (! photoset) return next(new Error('Failed to load Photoset ' + id));
		req.photoset = photoset ;
		next();
	});
};

/**
 * Photoset authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.photoset.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
