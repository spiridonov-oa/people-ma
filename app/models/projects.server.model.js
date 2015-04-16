'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Project name',
		trim: true
	},
    times: {
        type: String,
        default: '',
        required: 'Please fill time period',
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: 'Please fill Project description',
        trim: true
    },
    tags: {
        type: Array,
        default: [],
        required: 'Please fill Project tags',
        trim: true
    },
    photoset: {
        type: String,
        default: '',
        required: 'Please choose Project photoset',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    order: {
        type: Number,
        default: 0
    }
});

mongoose.model('Project', ProjectSchema);
