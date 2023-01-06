const express = require('express');
const tool = require('./tool');
const {
    createProject,
    editProject,
    getAllProjects,
    getSingleProjectById,
    addTeamMemberToProject,
    removeTeamMemberFromProject,
    removeProject
 } = require('../controllers/project');
const { getAccessToRoute, getProjectLeaderAccess, getSupervisorOrAdminAccess } = require('../middlewares/authorization/auth');
const { checkUserExist, checkProjectExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.use(getAccessToRoute);

router.post("/new", createProject);
router.put("/:id/edit", [checkProjectExist, getProjectLeaderAccess], editProject);
router.get("/", getAllProjects);
router.get("/:id", checkProjectExist, getSingleProjectById);
router.put("/:id/addmember/:user_id", [checkProjectExist, getProjectLeaderAccess, checkUserExist], addTeamMemberToProject);
router.put("/:id/removemember/:user_id", [checkProjectExist, getProjectLeaderAccess, checkUserExist], removeTeamMemberFromProject);
router.delete("/:id/remove", [checkProjectExist, getSupervisorOrAdminAccess], removeProject);

router.use("/:project_id/tool", tool);

module.exports = router