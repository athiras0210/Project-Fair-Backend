//Schema map to a mongodb collection

//1 import mongoose
const mongoose = require('mongoose');

//2 Schema creation
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    livelink: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    projectImage: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
});

//create model
const projects = mongoose.model('Projects', projectSchema);

module.exports = projects;
