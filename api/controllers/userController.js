const sqlite3 = require('sqlite3');
const Encrypt = require('../Encrypt');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, "../../userDB.db"));


// User

const whoami = (req, res) => {
    res.json(req.session.user || null);
};

const login = (req, res) => {  
    let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
    let params = { $email: req.body.email };
    db.get(query, params, (err, userInDB) => {
        if (!userInDB) {
            res.status(401).json({ error: "Bad credentials" });
            return;
        }
        req.body.password = Encrypt.encrypt(req.body.password);
        if (userInDB.password === req.body.password) {
            delete userInDB.password;
            req.session.user = userInDB;
            res.json({ success: "Login successfull", loggedInUser: userInDB });
            return;
        } else {
            res.status(401).json({ error: "Bad credentials" });
            return;
        }
    });
};

const logout = (req, res) => {
    delete req.session.user;
    res.json({ success: "Logout successfull" });
};

const register = (req, res) => {
    let userToRegister = req.body;
    let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
    let params = { $email: userToRegister.email };
    db.get(query, params, (err, result) => {
        if (result) {
            res.json({ error: "User with that email already exists" });
        } else {
            userToRegister.password = Encrypt.encrypt(userToRegister.password);
            query = /*sql*/ `INSERT INTO users (firstName, lastName, email, password) VALUES ($firstName, $lastName, $email, $password)`;
            params = {
                $firstName: userToRegister.firstName,
                $lastName: userToRegister.lastName,
                $email: userToRegister.email,
                $password: userToRegister.password
            };
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                res.json({ success: "User register successfull", lastID: this.lastID });
            });
        }
    });
};

const edit = (req, res) => {
    let userToEdit = req.body;
    userToEdit.password = Encrypt.encrypt(userToEdit.password);
    let query = /*sql*/ `
        UPDATE users
        SET firstName = $firstName, lastName = $lastName, email = $email, password = $password
        WHERE userId = $userId`;
    let params = {
        $firstName: userToEdit.firstName,
        $lastName: userToEdit.lastName,
        $email: userToEdit.email,
        $password: userToEdit.password,
        $userId: req.params.userId,
    };
    db.run(query, params, function (err) {
        if (err) {
            res.status(400).json({ error: "Email is already in use"});
            return;
        }
        res.json({ success: "User update successfull", changes: this.changes });
    });
};


// Favorites

const getUserFavoritesById = (req, res) => {
    let query = /*sql*/ `
    SELECT favorites.*
    FROM users, favorites 
    JOIN usersXfavorites
    ON usersXfavorites.userId = users.userId
    AND usersXfavorites.favoriteId = favorites.favoriteId
    WHERE users.userId = $userId`;
    let params = { $userId: req.params.userId };
    db.all(query, params, (err, favorites) => {
        if (favorites.length > 0) {
            res.json(favorites);
        } else {
            res.status(404);
        }
    });
};

const addFavoriteToDB = (req, res) => {
    let query = /*sql*/ `SELECT * FROM favorites WHERE name = $name`;
    let params = { $name: req.body.name };
    db.get(query, params, (err, result) => {
        if (result) {
            res.json({ error: "Favorite already exist" });
        } else {
            query = /*sql*/ `INSERT INTO favorites (${Object.keys(req.body).join(", ")})
                VALUES (${Object.keys(req.body)
                    .map((k) => "$" + k)
                    .join(", ")})`;
            let params = {};
            for (let key in req.body) {
                params["$" + key] = req.body[key];
            };
            db.run(query, params, function (err) {
                res.json({ success: "Favorite added to DB", lastID: this.lastID });
            });
        }
    });
};

const addFavoriteToId = (req, res) => {
    let query = /*sql*/ `SELECT favoriteId FROM favorites WHERE name = $name`;
    let params = { $name: req.body.name };
    db.get(query, params, (err, result) => {
        if (result) {
            query = /*sql*/ `INSERT INTO usersXfavorites (userId, favoriteId) VALUES ($userId, $favoriteId)`;
            params = {
                $userId: req.params.userId,
                $favoriteId: result.favoriteId
            };
            db.run(query, params, function (err) {
                if (err) {
                    res.json({ error: "Could not add favorite" });
                } else {
                    res.json({ success: "Favorite added successfully", lastID: this.lastID });
                }
            });
        } else {
            res.json({ error: "Favorite does not exist" });
        }
    });
};

const removeFavoriteFromId = (req, res) => {
    let query = /*sql*/ `DELETE FROM usersXfavorites WHERE userId = $userId AND favoriteId = $favoriteId`;
    let params = {
            $userId: req.params.userId,
            $favoriteId: req.body.favoriteId
        };
    db.run(query, params, function (err) {
        res.json({ success: "Favorite has been removed", changes: this.changes });
    });
};

module.exports = {
    whoami,
    login,
    logout,
    register,
    edit,
    getUserFavoritesById,
    addFavoriteToDB,
    addFavoriteToId,
    removeFavoriteFromId
}