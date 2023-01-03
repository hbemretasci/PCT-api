const express = require('express');
const { getProjectLeaderOrTeamAccess, getProjectLeaderOrToolOwnerAccess } = require('../middlewares/authorization/auth');
const { checkProjectExist, checkToolExist} = require('../middlewares/database/databaseErrorHelpers');
const { addToolToProject, editExistingTool, getAllToolsByProject, getSingleToolById, removeToolFromProject } = require('../controllers/tool');

const router = express.Router({ mergeParams:true });

router.post("/", [checkProjectExist, getProjectLeaderOrTeamAccess], addToolToProject);
router.put("/:tool_id/edit", [checkToolExist, getProjectLeaderOrTeamAccess], editExistingTool);
router.get("/", checkProjectExist, getAllToolsByProject);
router.get("/:tool_id", checkToolExist, getSingleToolById);
router.delete("/:tool_id/delete", [checkToolExist, getProjectLeaderOrToolOwnerAccess], removeToolFromProject);

module.exports = router