const Hotels = require("../models/hotels.js");
const hotelController = {
  getHotel: async (req, res) => {
    try {
      const hotels = await Hotels.find({});
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAHotel: async (req, res) => {
    const { id } = req.params;
    console.log("my id", id);
    try {
      const hotel = await Hotels.findById({ _id: id });
      console.log("got hotel data", hotel);
      res.status(200).json(hotel);
    } catch (error) {
      console.log("got error", error);
      res.status(500).json({ error: error.message });
    }
  },
  addHotel: async (req, res) => {
    try {
      const {
        name,
        location,
        description,
        price_per_night,
        rating,
        amenities,
        images,
      } = req.body;

      // Create a new hotel instance
      const newHotel = new Hotels({
        name,
        location,
        description,
        price_per_night,
        rating,
        amenities,
        images,
      });

      // Save the new hotel to the database
      const savedHotel = await newHotel.save();

      res.status(201).json(savedHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateHotel: async (req, res) => {
    try {
      const {
        name,
        location,
        description,
        price_per_night,
        rating,
        amenities,
        images,
      } = req.body;
      const { id } = req.params;

      const hotel = await Hotels.updateOne(
        { _id: id },
        {
          $set: {
            name,
            location,
            description,
            price_per_night,
            rating,
            amenities,
            images,
          },
        }
      );
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteHotel: async (req, res) => {
    const { id } = req.params;
    try {
      const hotel = await Hotels.findByIdAndDelete({ _id: id });
      console.log(hotel);
      res.status(201).json("delete successful");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchHotels: async (req, res) => {
    const { searchTerm } = req.query;

    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { location: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }
    try {
      const hotels = await Hotels.find(query);
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = hotelController;
