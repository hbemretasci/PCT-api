const mongoose = require('mongoose');
const Project = require('./Project');

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
        default: "general",
        enum: ["general", "specific"]
    },
    subCategory: {
        type: String,
        default: "general",
        enum: ["general", "specific"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User"
    },
    project: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Project"
    }
});

ToolSchema.pre("save", async function(next) {
    if(!this.isModified("user")) {
        next();
    }

    try {
        const project = await Project.findById(this.project);
    
        project.tools.push(this._id);
        await project.save();
        next();
    }
    catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model("Tool", ToolSchema)