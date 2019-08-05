var express = require("express");
var router = express.Router();

let usersController = require("../conrollers/usersController");
/* GET users listing. */
router.get("/getUser", usersController.getUser);

router.get(
  "/getUserTournaments/:userEmail",
  usersController.getUserTournaments
);

router.get(
  "/getUsersPredictionsByTournament/:tournamentId",
  usersController.getUsersPredictionsByTournament
);

router.get(
  "/getUserPredictions/:tournamentId/:userEmail",
  usersController.getUserPredictions
);
router.post(
  "/addPredictionToUser/:tournamentId/:userEmail",
  usersController.addPredictionToUser
);

router.post(
  "/saveUserPredcitions/:tournamentId/:userEmail",
  usersController.saveUserPredicrtions
);

module.exports = router;
