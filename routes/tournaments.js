var express = require("express");
var router = express.Router();

let tournamentsController = require("../conrollers/tournamentsController");
router.get("/getTournament/:tournamentId", tournamentsController.getTournament);
router.get(
  "/getScoreTable/:tournamentId",
  tournamentsController.getTournamentScoreTable
);

router.post("/createTournament", tournamentsController.CreateTournament);

router.post("/joinTournament", tournamentsController.joinTournament);

module.exports = router;
