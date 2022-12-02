const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { addNewToolToProject } = require('../controllers/tool');

const router = express.Router({ mergeParams:true });

router.post("/", getAccessToRoute, addNewToolToProject);

module.exports = router