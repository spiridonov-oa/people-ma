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
    icon: {
        type: String,
        default: '',
        trim: true
    },
    times: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    tags: {
        type: Array,
        default: [],
        required: 'Please fill Project tags'
    },
    photos: {
        type: [{
            title: {
                type: String,
                default: '',
                required: 'Please fill Photo name',
                trim: true
            },
            description: {
                type: String,
                default: '',
                trim: true
            },
            url: {
                type: String,
                default: '',
                required: 'Please browse photo path',
                trim: true
            },
            thumb: {
                type: String,
                default: '',
                trim: true
            },
            order: {
                type: Number,
                default: 0
            }
        }],
        default: []
    },
    type: {
        type: String,
        default: '',
        required: 'Please browse project type',
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
