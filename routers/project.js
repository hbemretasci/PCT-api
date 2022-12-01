const express = require('express');
const { newProject, getAllProjects, getSingleProject, editProject, deleteProject } = require('../controllers/project');
const { getAccessToRoute, getProjectLeaderAccess } = require('../middlewares/authorization/auth');
const { checkProjectExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", checkProjectExist, getSingleProject);
router.post("/new", getAccessToRoute, newProject);
router.put("/:id/edit", [getAccessToRoute, checkProjectExist, getProjectLeaderAccess], editProject);
router.delete("/:id/delete", [getAccessToRoute, checkProjectExist, getProjectLeaderAccess], deleteProject);

module.exports = router