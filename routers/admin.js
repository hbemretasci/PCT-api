const express = require('express');
const { createUser, changeAbleUser, changeUserRole, getAllUsers, getUsersByRole, getSingleUserById } = require('../controllers/admin');
const { getAccessToRoute, getAdminAccess } = require('../middlewares/authorization/auth');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const userQueryMiddleware = require('../middlewares/query/userQueryMiddleware');
const User = require('../models/User');

const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.post("/register", createUser);
router.put("/able/:id", checkUserExist, changeAbleUser);
router.put("/role/:id", checkUserExist, changeUserRole);
router.get("/users", userQueryMiddleware(User), getAllUsers);
router.get("/users/:name", getUsersByRole);
router.get("/user/:id", checkUserExist, getSingleUserById);

module.exports = router