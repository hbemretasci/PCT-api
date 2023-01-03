const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToolSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        minlength: [8, "Please provide a name with min length 8."],
    },
    description: {
        type: String,
        required: [true, "Please provide a description."]
    },
    mainCategory: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    addedUser: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    project: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Project"
    }
});

module.exports = mongoose.model("Tool", ToolSchema)