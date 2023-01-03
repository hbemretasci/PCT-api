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
    const user = req.userData;

    user.role = req.body.role;

    await user.save();

    return res.status(200).json({
        success: true,
        message: `Role changed to ${user.role}.`
    });
});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
    const users = await User.find();
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
    getSingleUserById
}