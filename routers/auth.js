const express = require('express');
const { login, logout, getUserProfile, editUser, forgotPassword, resetPassword } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');

const router = express.Router();

router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, getUserProfile);
router.put("/edit", getAccessToRoute, editUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);

module.exports = router