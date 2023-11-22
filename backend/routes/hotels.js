const router = require("express").Router();
const hotelController = require("../controllers/hotelController.js");
router.get("/hotels", hotelController.getHotel);
router.post("/addHotel", hotelController.addHotel);
router.get("/hotel/:id", hotelController.getAHotel);
router.delete("/deleteHotel/:id", hotelController.deleteHotel);
router.put("/updateHotel/:id", hotelController.updateHotel);
router.get("/searchHotels", hotelController.searchHotels);
module.exports = router;
