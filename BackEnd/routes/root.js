const express = require("express");
const router = express.Router();
const path = require("path");

//Only match if the requested route is only a '/' or 'index' or 'index.html'
router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
