const CustomError = require('../helpers/error/CustomError');
const User = require('../models/User');
const asyncErrorWrapper = require('express-async-handler');

const createUser = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, role, password, organization, organizationName, title, department, disabled } = req.body;
    
    const user = await User.create({
        name,
        email,
        role,
        password,
        organization,
        organizationName,
        title,
        department,
        disabled
    });

    res.status(201).json({
        success: true,
        data: user
    });
});

const changeAbleUser = asyncErrorWrapper(async (req, res, next) => {
    const user = req.userData;

    user.disabled = !user.disabled;

    var result = "Enabled";
    if(user.disabled) result = "Disabled";

    await user.save();

    return res.status(200).json({
        success: true,
        message: `User ${result}.`
    });
});

const changeUserRole = asyncErrorWrapper(async (req, res, next) => {
    const { ADMIN, USER, SUPERVISOR } = process.env;

    const newRole = req.body.role; 

    if(newRole != ADMIN && newRole != USER && newRole != SUPERVISOR ) {
        return next(new CustomError("Invalid role definition.", 401));
    }

    const user = req.userData;
    user.role = newRole;

    await user.save();

    return res.status(200).json({
        success: true,
        message: `Role changed to ${user.role}.`
    });
});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
    const users = await User.find().select({ __v: false });
    
    return res.status(200).json({
        success: true,
        data: users
    });
});

const getUsersByRole = asyncErrorWrapper(async (req, res, next) => {
    const { name } = req.params;
    
    const users = await User.find({ role: name }).select({ __v: false });
    return res.status(200).json({
        success: true,
        data: users
    });
});

const getSingleUserById = asyncErrorWrapper(async (req, res, next) => {
    const user = req.userData;

    return res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = {
    createUser,
    changeAbleUser,
    changeUserRole,
    getAllUsers,
    getUsersByRole,
    getSingleUserById
}