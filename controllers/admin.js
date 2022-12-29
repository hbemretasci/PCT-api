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

const blockUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    user.blocked = !user.blocked;
    await user.save();

    return res.status(200)
    .json({
        success: true,
        message: "Block / Unblock successfull."
    });
});

const deleteUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    await user.remove();

    return res.status(200)
    .json({
        success: true,
        message: "Delete operation successfull."
    });
});

module.exports = {
    createUser,
    blockUser,
    deleteUser
}