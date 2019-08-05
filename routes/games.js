var express = require("express");
var router = express.Router();

let gamesController = require("../conrollers/gamesController");

router.get("/getAllGames", gamesController.getAllGames);

router.post("/createGame", gamesController.createGame);
module.exports = router;
