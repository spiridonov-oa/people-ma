'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Architector Schema
 */
var ArchitectorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Architector name',
		trim: true
	},
    position: {
        type: String,
        default: '',
        required: 'Please fill Architector position',
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

mongoose.model('Architector', ArchitectorSchema);