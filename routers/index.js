const express = require('express');
const project = require('./project');
const auth = require('./auth');
const admin = require('./admin');

const router = express.Router();

router.use("/projects", project);
router.use("/auth", auth);
router.use("/admin", admin);

module.exports = router