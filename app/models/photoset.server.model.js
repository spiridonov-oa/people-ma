'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Photoset Schema
 */
var PhotosetSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Photo name',
		trim: true
	},
    description: {
        type: String,
        default: '',
        required: 'Please fill Photo description',
        trim: true
    },
    photopath: {
        type: String,
        default: '',
        trim: true
    },
    trumbpath: {
        type: String,
        default: '',
        required: 'Please browse photo preview',
        trim: true
    },
    setname: {
        type: String,
        default: '',
        required: 'Please fill photoset name',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Photoset', PhotosetSchema);