'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Concept Schema
 */
var ConceptSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Concept name',
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
        required: 'Please fill Concept description',
        trim: true
    },
    tags: {
        type: Array,
        default: [],
        required: 'Please fill Concept tags',
        trim: true
    },
    photoset: {
        type: String,
        default: '',
        required: 'Please choose Concept photoset',
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

mongoose.model('Concept', ConceptSchema);