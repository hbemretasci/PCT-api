const User = require('../../models/User');
const Project = require('../../models/Project');
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
    const project_id = req.params.id || req.params.project_id;

    const project = await Project.findById(project_id);

    if(!project) {
        return next(new CustomError("There is no such project with that id.", 400));
    }

    req.projectData = project;
    next();
});

module.exports = {
    checkUserExist,
    checkProjectExist
}