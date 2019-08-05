const Tournament = require("../models/tournament.model");
// const userToTournaments = require("../models/userToTournaments.model");
const userPredictions = require("../models/userPredictions.model");
const Game = require("../models/game.model");

exports.getTournament = function(req, res, next) {
  Tournament.findById(req.params.tournamentId, function(err, response) {
    if (err) {
      return next(err);
    }
    res.send(response);
  });
};

exports.CreateTournament = function(req, res, next) {
  let newTournament = new Tournament(req.body);

  newTournament.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(newTournament);
  });
};

exports.joinTournament = function(req, res, next) {
  Tournament.findByIdAndUpdate(
    req.body.tournamentId,
    {
      $addToSet: { participants: req.body.user }
    },
    { new: false },
    function(err, updatedDoc) {
      if (err) {
        if (err) return next(err);
      }
      // addTournamentToUser(req.body.user.email, updatedDoc._id);
      createUserPredictionDocument(req.body.user.email, updatedDoc._id);
      res.send(updatedDoc);
    }
  );
};

exports.getTournamentScoreTable = function(req, res, next) {
  var scoreTable = [];
  var tournamentId = req.params.tournamentId;
  var query = { tournamentId: tournamentId };
  userPredictions.find(query, function(err, usersPredictionsRes) {
    if (err) {
      return next(err);
    }

    Tournament.findById(tournamentId, function(err, tournamentRes) {
      if (err) {
        return next(err);
      }
      var gameQuery = {
        groupAResult90Min: { $ne: null },
        groupBResult90Min: { $ne: null }
      };
      Game.find(gameQuery, function(err, gamesRes) {
        if (err) {
          return next(err);
        }
        usersPredictionsRes.forEach(user => {
          var userExactScoreline = 0;
          var userOutcomes = 0;
          var userPoints = 0;
          user.gamesPredictions.forEach(gamePrediction => {
            var game = gamesRes.find(game => {
              return gamePrediction.gameId == game._id;
            });
            if (game) {
              if (
                game.groupAResult90Min == gamePrediction.groupAPrediction &&
                game.groupBResult90Min == gamePrediction.groupBPrediction
              ) {
                userExactScoreline++;
                userPoints += tournamentRes[game.stage + "Score"].exactResult;
              } else {
                var gameResult =
                  game.groupAResult90Min - game.groupBResult90Min;
                var prediction =
                  gamePrediction.groupAPrediction -
                  gamePrediction.groupBPrediction;
                if (gameResult * prediction > 0 || gameResult == prediction) {
                  userOutcomes++;
                  userPoints +=
                    tournamentRes[game.stage + "Score"].correctlyWinnigTeam;
                }
              }
              if (game.stage !== "groupStage") {
                if (game.howTheGameOver == gamePrediction.howTheGameOver) {
                  userPoints +=
                    tournamentRes[game.stage + "Score"].howTheGameOverResult;
                }
              }
            }
          });

          var userDetails = tournamentRes.participants.find(userDetails => {
            return userDetails.email == user.userEmail;
          });
          console.log(userDetails);

          scoreTable.push({
            displayName: userDetails.displayName,
            imagePath: userDetails.imagePath,
            exactScoreline: userExactScoreline,
            outcome: userOutcomes,
            points: userPoints
          });
        });
        res.send(scoreTable);
      });
    });
  });
};
function createUserPredictionDocument(userEmail, tournamentId) {
  let userPredictionDocument = new userPredictions({
    userEmail: userEmail,
    tournamentId: tournamentId,
    gamesPredictions: []
  });
  userPredictionDocument.save(function(err) {
    if (err) {
      return next(err);
    }
  });
}

// function addTournamentToUser(userEmail, tournamentId) {
//   var query = { userEmail: userEmail },
//     update = {
//       $addToSet: { tournamentIds: tournamentId }
//     },
//     options = {
//       upsert: true,
//       new: true,
//       setDefaultsOnInsert: true,
//       useFindAndModify: false
//     };
//   userToTournaments.findOneAndUpdate(query, update, options, function(
//     err,
//     result
//   ) {
//     if (err) {
//       return next(err);
//     }
//   });
// }
