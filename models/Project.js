const mongoose = require('mongoose');
const Tool = require('./Tool');

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
        required: true,
        ref: "User"
    },
    sponsor: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        default: "not started",
        enum: ["not started", "in progress", "suspended","canceled","completed"]
    },
    classified: {
        type: Boolean,
        default: false
    },
    team: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    tools: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Tool"
        }
    ]
});

ProjectSchema.pre("remove", async function() {
    try {
        await Tool.deleteMany({
            project: this._id
        });
        next();
    }
    catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model("Project", ProjectSchema)