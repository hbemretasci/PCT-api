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

module.exports = {
    addNewToolToProject
}