const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

/*loginLimiter: It sets specific limits on the number of requests a client can make within
  a defined time window, such as a certain number of requests per minute or per hour.*/
  
router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

module.exports = router;
