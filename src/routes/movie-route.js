const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie-controller");

router.get("/", movieController.getAllMovie);

module.exports = router;
