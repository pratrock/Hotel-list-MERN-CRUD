const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelsSchema = new Schema({
  name: String,
  location: String,
  description: String,
  price_per_night: Number,
  rating: Number,
  amenities: Array,
  images: Array,
});
module.exports = mongoose.model("hotel", hotelsSchema, "hotels");
