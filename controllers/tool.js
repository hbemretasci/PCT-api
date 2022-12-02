const Project = require('../models/Project');
const Tool = require('../models/Tool');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addNewToolToProject = asyncErrorWrapper(async (req, res, next) => {
    const { project_id } = req.params;

    const user_id = req.user.id;

    const information = req.body;

    const tool = await Tool.create({
        ...information,
        project: project_id,
        user: user_id
    });

    return res.status(200)
    .json({
        success: true,
        data: tool
    });

});

const getAllToolByProject = asyncErrorWrapper(async (req, res, next) => {
    const { project_id } = req.params;

    const project = await Project.findById(project_id).populate("tools");

    const tools = project.tools;

    return res.status(200)
    .json({
        success: true,
        count: tools.length,
        data: tools
    });

});

const getSingleTool = asyncErrorWrapper(async (req, res, next) => {
    const { tool_id } = req.params;

    const tool = await Tool.findById(tool_id)
    .populate(
        {
            path: "project",
            select: "title subject"
        }
        );

    return res.status(200)
    .json({
        success: true,
        data: tool
    });

});

module.exports = {
    addNewToolToProject,
    getAllToolByProject,
    getSingleTool
}