const express = require('express');
const { createUser, changeAbleUser, removeUser, changeUserRole, getAllUsers, getSingleUserById } = require('../controllers/admin');
const { getAccessToRoute, getAdminAccess } = require('../middlewares/authorization/auth');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.post("/register", createUser);
router.put("/able/:id", checkUserExist, changeAbleUser);
router.delete("/remove/:id", checkUserExist, removeUser);
router.put("/role/:id", checkUserExist, changeUserRole);
router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingleUserById);

module.exports = router