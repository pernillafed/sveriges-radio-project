const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


// User

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.put("/edit/:userId", userController.edit);


// Favorites

router.get("/favorites/:userId", userController.getUserFavoritesById);
router.post("/favorites", userController.addFavoriteToDB);
router.post("/favorites/:userId", userController.addFavoriteToId);
router.delete("/favorites/:userId", userController.removeFavoriteFromId);

module.exports = router;
