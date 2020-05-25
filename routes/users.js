var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

/* GET users listing. */
/* http://localhost:9000/user/ */
router.get(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  userController.index
);

/* POST users listing. */
/* http://localhost:9000/user/login */
router.post("/login", userController.login);

/* GET users listing. */
/* http://localhost:9000/user/me */
router.get("/me", [passportJWT.isLogin], userController.me);

module.exports = router;
