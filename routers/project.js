const express = require('express');
const tool = require('./tool');
const { newProject, getAllProjects, getSingleProject, editProject, deleteProject } = require('../controllers/project');
const { getAccessToRoute, getProjectLeaderAccess } = require('../middlewares/authorization/auth');
const { checkProjectExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", checkProjectExist, getSingleProject);
router.post("/new", getAccessToRoute, newProject);
router.put("/:id/edit", [getAccessToRoute, checkProjectExist, getProjectLeaderAccess], editProject);
router.delete("/:id/delete", [getAccessToRoute, checkProjectExist, getProjectLeaderAccess], deleteProject);

router.use("/:project_id/tool", checkProjectExist, tool);

module.exports = router