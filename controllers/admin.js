const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
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
    const { id } = req.params;
    const user = await User.findById(id);

    user.disabled = !user.disabled;

    var result = "Enabled";
    if(user.disabled) result = "Disabled";

    await user.save();

    return res.status(200).json({
        success: true,
        message: `User ${result}.`
    });
});

const removeUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    await user.remove();

    return res.status(200).json({
        success: true,
        message: "Delete operation successfull."
    });
});

const changeUserRole = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const newRole = req.body.role;

    const user = await User.findById(id);

    user.role = newRole;

    await user.save();

    return res.status(200).json({
        success: true,
        message: `Role changed to ${newRole}.`
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
    return res.status(200).json({
        success: true,
        data: req.userData
    });
});

module.exports = {
    createUser,
    changeAbleUser,
    removeUser,
    changeUserRole,
    getAllUsers,
    getSingleUserById
}