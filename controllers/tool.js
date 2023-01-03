const Project = require('../models/Project');   
const Tool = require('../models/Tool');
const asyncErrorWrapper = require('express-async-handler');

const addToolToProject = asyncErrorWrapper(async (req, res, next) => {
    let project = req.projectData;

    const { project_id } = req.params;

    const userId = req.user.id;
    const information = req.body;

    const tool = await Tool.create({
        ...information,
        addedUser: userId,
        project: project_id
    });

    project.tools.push(tool._id);
    await project.save();

    return res.status(201).json({
        success: true,
        data: tool
    });
});

const editExistingTool = asyncErrorWrapper(async (req, res, next) => {
    let tool = req.toolData;

    const { name, description, mainCategory, subCategory } = req.body;

    tool.name = name;
    tool.description = description;
    tool.mainCategory = mainCategory;
    tool.subCategory = subCategory;

    await tool.save();

    return res.status(200).json({
        success: true,
        data: tool
    });
});

const getAllToolsByProject = asyncErrorWrapper(async (req, res, next) => {
    const { project_id } = req.params;

    //const project = await Project.findById(project_id).populate("tools");
    //const tools = project.tools;

    const tools = await Tool.find({ project: project_id });

    return res.status(200).json({
        success: true,
        count: tools.length,
        data: tools
    });
});

const getSingleToolById = asyncErrorWrapper(async (req, res, next) => {
    const { tool_id } = req.params;

    const tool = await Tool.findById(tool_id).populate({
        path: "project",
        select: "title subject leader sponsor"
    });

    return res.status(200).json({
        success: true,
        data: tool
    });
});

const removeToolFromProject = asyncErrorWrapper(async (req, res, next) => {
    let tool = req.toolData;

    const { tool_id } = req.params;
    const { project_id } = req.params;

    await tool.remove();

    const project = await Project.findById(project_id);

    project.tools.splice(project.tools.indexOf(tool_id), 1);
    await project.save();

    return res.status(200).json({
        success: true,
        message: "Tool delete operation successfull."
    });
});

module.exports = {
    addToolToProject,
    editExistingTool,
    getAllToolsByProject,
    getSingleToolById,
    removeToolFromProject
}