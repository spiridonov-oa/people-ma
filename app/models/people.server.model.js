'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Person Schema
 */
var PersonSchema = new Schema({
    fName: {
        type: String,
        default: '',
        required: 'Please fill Person first name',
        trim: true
    },
    lName: {
        type: String,
        default: '',
        trim: true
    },
    ava: {
        type: String,
        default: '',
        trim: true
    },
    photo: {
        type: String,
        default: '',
        trim: true
    },
    position: {
        type: String,
        default: '',
        trim: true
    },
    order: {
        type: Number,
        default: 0
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

mongoose.model('Person', PersonSchema);
