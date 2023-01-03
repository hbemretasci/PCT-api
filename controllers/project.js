const Project = require('../models/Project');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const createProject = asyncErrorWrapper(async (req, res, next) => {
    const information = req.body;

    const project = await Project.create({
        ...information,
        leader: req.user.id
    });

    res.status(201).json({
        success: true,
        data: project
    });
});

const editProject = asyncErrorWrapper(async (req, res, next) => {
    let project = req.projectData;

    const { title, subject, objectives, status, classified, team  } = req.body;

    project.title = title;
    project.subject = subject;
    project.objectives = objectives;
    project.status = status;
    project.classified = classified;
    project.team = team;

    project = await project.save();

    return res.status(200).json({
        success: true,
        data: project
    });
});

const getAllProjects = asyncErrorWrapper(async (req, res, next) => {
    const projects = await Project.find();

    return res.status(200).json({
        success: true,
        data: projects
    });
});

const getSingleProjectById = asyncErrorWrapper(async (req, res, next) => {
    const project = req.projectData;

    return res.status(200).json({
        success: true,
        data: project
    });
});

const addTeamMemberToProject = asyncErrorWrapper(async (req, res, next) => {
    let project = req.projectData;
    
    const { memberId } = req.body;

    if(project.team.includes(memberId)) {
        return next(new CustomError("This user is already a team member.", 400));
    }

    project.team.push(memberId);

    await project.save();

    return res.status(200).json({
        success: true,
        data: project.team
    });
});

const removeTeamMemberFromProject = asyncErrorWrapper(async (req, res, next) => {
    let project = req.projectData;

    const { memberId } = req.body;

    if(!project.team.includes(memberId)) {
        return next(new CustomError("This user is not a member of the team.", 400));
    }

    const index = project.team.indexOf(memberId);

    project.team.splice(index,1);

    await project.save();

    return res.status(200).json({
        success: true,
        data: project.team
    });
});

const removeProject = asyncErrorWrapper(async (req, res, next) => {
    let project = req.projectData;

    await project.remove();

    return res.status(200).json({
        success: true,
        message: "Project delete operation successfull."
    });
});

module.exports = {
    createProject,
    editProject,
    getAllProjects,
    getSingleProjectById,
    addTeamMemberToProject,
    removeTeamMemberFromProject,
    removeProject
}