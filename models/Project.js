const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title."],
        minlength: [8, "Please provide a title with min length 8."],
    },
    subject: {
        type: String,
        required: [true, "Please provide a subject."]
    },
    objectives: {
        type: String,
        required: [true, "Please provide a objective."]
    },
    category: {
        type: String,
        default: "general",
        enum: ["general", "specific"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startingDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date,
        default: Date.now
    },
    leader: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User"
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Project", ProjectSchema)