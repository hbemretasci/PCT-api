const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkProjectAndToolExist} = require('../middlewares/database/databaseErrorHelpers');
const { addNewToolToProject, getAllToolByProject, getSingleTool } = require('../controllers/tool');

const router = express.Router({ mergeParams:true });

router.post("/", getAccessToRoute, addNewToolToProject);
router.get("/", getAllToolByProject);
router.get("/:tool_id", checkProjectAndToolExist, getSingleTool);

module.exports = router