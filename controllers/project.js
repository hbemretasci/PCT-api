const Project = require('../models/Project');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const newProject = asyncErrorWrapper(async (req, res, next) => {
    const information = req.body;

    const project = await Project.create({
        ...information,
        leader: req.user.id
    });

    res.status(200)
    .json({
        success: true,
        data: project
    });
});

const getSingleProject = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200)
    .json({
        success: true,
        data: req.projectData
    });
});

const getAllProjects = asyncErrorWrapper(async (req, res, next) => {
    const projects = await Project.find();

    return res.status(200)
    .json({
        success: true,
        data: projects
    });
});

const editProject = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, subject, objectives } = req.body;

    let project = await Project.findById(id);

    project.title = title;
    project.subject = subject;
    project.objectives = objectives;

    project = await project.save();

    return res.status(200)
    .json({
        success: true,
        data: project
    });
});

const deleteProject = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.status(200)
    .json({
        success: true,
        message: "Project delete operation successfull."
    });
});

module.exports = {
    newProject,
    getAllProjects,
    getSingleProject,
    editProject,
    deleteProject
}