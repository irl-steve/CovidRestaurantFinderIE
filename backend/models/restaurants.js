const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  type: String, //e.g. cafe, pub, fine dining
  openTime: String,
  closeTime: String,
  menuLink: String, //website url
  webLink: String, //website url
  bookingLink: String, //website url
  seating: String, //can be indoor, outdoor, or both
  meals: String, //e.g. breakfast, brunch, lunch etc.
  services: String, //take-away, sit-in, or both
  booking: String, // optional, mandatory, not possible
  address: String, //text address
  reducedMenu: Boolean,
  extraDetails: String,
},
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
