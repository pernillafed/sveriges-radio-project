const express = require('express');
const router = express.Router();

const programController = require('../controllers/programController');

router.get("", programController.getAllPrograms);
router.get("/:programId", programController.getProgramById);
router.get("/schedule/:programId", programController.getProgramSchedule);

module.exports = router;