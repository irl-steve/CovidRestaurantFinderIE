const express = require('express');
const router = express.Router();
//const checkAuth = require('./middleware/check-auth');

const UserController = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/controllers/user_controllers.js');

router.post("/sign-up", UserController.new_user);

// router.post("/log-in", UserController.login_user);
//
// router.delete("/:UserId", checkAuth, UserController.delete_user);

module.exports = router;
