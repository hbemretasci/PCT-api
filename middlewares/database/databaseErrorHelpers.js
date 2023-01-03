const User = require('../../models/User');
const Project = require('../../models/Project');
const Tool = require('../../models/Tool');
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if(!user) {
        return next(new CustomError("There is no such user with that id.", 400));
    }
    req.userData = user;
    next();
});

const checkProjectExist = asyncErrorWrapper(async (req, res, next) => {
    const projectId = req.params.id || req.params.project_id;

    const project = await Project.findById(projectId);

    if(!project) {
        return next(new CustomError("There is no such project with that id.", 400));
    }
    req.projectData = project;
    next();
});

const checkToolExist = asyncErrorWrapper(async (req, res, next) => {
    const projectId = req.params.project_id;
    const toolId = req.params.tool_id;

    const tool = await Tool.findOne({
        _id: toolId,
        project: projectId
    });

    if(!tool) {
        return next(new CustomError("There is no tool with that id associated with project.", 400));
    }
    req.toolData = tool;
    next();
});

module.exports = {
    checkUserExist,
    checkProjectExist,
    checkToolExist
}