const express = require("express");
const router = express.Router();
const jenosizeController = require("../controllers/jenosizeController");
const passportJWT = require("../middleware/passportJWT");
const { body } = require("express-validator");

/* POST jenosize listing. */
/* http://localhost:9000/jenosize/search_nearby_restaurant/ */
router.post(
  "/search_nearby_restaurant",
  [passportJWT.isLogin],
  [
    body("keyword").not().isEmpty().withMessage("กรุณาป้อนข้อมูล keyword"),
    body("location").not().isEmpty().withMessage("กรุณาป้อนข้อมูล location"),
    body("radius").not().isEmpty().withMessage("กรุณาป้อนข้อมูล radius"),
  ],
  jenosizeController.searchNearbyRestaurants
);

/* POST jenosize listing. */
/* http://localhost:9000/jenosize/game_24/ */
router.post(
  "/game_24",
  [passportJWT.isLogin],
  [
    body("numbers").not().isEmpty().withMessage("กรุณาป้อนข้อมูล numbers"),
  ],
  jenosizeController.game24
);

module.exports = router;
