const express = require('express');
const router = express.Router();
//const checkAuth = require('./middleware/check-auth');
const RestaurantController = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/controllers/restaurant_controllers.js');

router.get('/', RestaurantController.getAllRestaurants);

router.get('/:restaurantId', RestaurantController.getOneRestaurant);

router.post("/", RestaurantController.newRestaurant);

router.patch('/:restaurantId', RestaurantController.updateRestaurant);

router.delete('/:restaurantId', RestaurantController.removeRestaurant);


module.exports = router;
