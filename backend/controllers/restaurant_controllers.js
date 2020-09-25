const mongoose = require('mongoose');
const Restaurant = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/models/restaurants');

exports.getAllRestaurants = (req, res) => {
  Restaurant.find({})
    .select("_id name type extraDetails menuLink")
    .exec()
    .then(docs => {
      const response = {
        restaurants: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            type: doc.type,
            extraDetails: doc.extraDetails,
            menuLink: doc.menuLink
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.getOneRestaurant = (req, res) => {
  const id = req.params.restaurantId;
  Restaurant.findById(id)
  .select("_id name type extraDetails menuLink")
  .exec()
  .then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
};

exports.newRestaurant = (req, res) => {
  var new_rest = new Restaurant({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    extraDetails: req.body.extraDetails,
    menuLink: req.body.menuLink,
  });
  new_rest.save()
  .then(result =>{
      res.status(201).json({
        message: 'New restaurant added!',
        new_rest: {
          _id: result._id,
          name: result.name,
          type: result.type,
          extraDetails: result.extraDetails,
          menuLink: result.menuLink,
        }
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.updateRestaurant = (req, res, next) => {
  const id = req.params.restaurantId;
  Restaurant.update({ _id: id }, {$set: req.body})
  .exec()
    .then(result => {
      res.status(200).json({
        message: "Channel updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.removeRestaurant = (req, res) => {
  const id = req.params.restaurantId;
  Restaurant.deleteOne({ _id: id})
  .exec()
    .then(result => {
      res.status(200).json({
        message: "Channel deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
