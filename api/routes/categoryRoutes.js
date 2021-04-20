const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get("", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.get("/programs/:categoryId", categoryController.getProgramsByCategory);

module.exports = router;