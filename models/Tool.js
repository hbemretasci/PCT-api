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
        require: true,
        ref: "Project"
    }
});

ToolSchema.pre("save", async function(next) {
    if(!this.isModified("user")) {
        next();

        // edit tool kısmında burada hata oluşuyor, bağlantı çoklanıyor.
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