const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkProjectAndToolExist} = require('../middlewares/database/databaseErrorHelpers');
const { addNewToolToProject, getAllToolByProject, getSingleTool, editTool, deleteTool } = require('../controllers/tool');
const { getToolOwnerAccess } = require('../middlewares/authorization/auth');

const router = express.Router({ mergeParams:true });

router.get("/", getAllToolByProject);
router.post("/", getAccessToRoute, addNewToolToProject);
router.get("/:tool_id", checkProjectAndToolExist, getSingleTool);
router.put("/:tool_id/edit", [getAccessToRoute, checkProjectAndToolExist, getToolOwnerAccess], editTool);
router.delete("/:tool_id/delete", [getAccessToRoute, checkProjectAndToolExist, getToolOwnerAccess], deleteTool);

module.exports = router