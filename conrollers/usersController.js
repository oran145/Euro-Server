// const userToTournaments = require("../models/userToTournaments.model");
const userPredictions = require("../models/userPredictions.model");
const Tournament = require("../models/tournament.model");

exports.getUser = function(req, res, next) {
  res.send("User!");
};

exports.getUserTournaments = function(req, res, next) {
  var query = { userEmail: req.params.userEmail };

  var userTournaments = [];
  Tournament.find(
    { participants: { $elemMatch: { email: req.params.userEmail } } },
    function(err, response) {
      if (err) {
        return next(err);
      }
      if (response === null || response === []) {
        res.status(404).send("This user is not registered to any tournament");
      }
      response.forEach(element => {
        userTournaments.push({
          tournamentId: element._id,
          tournamentName: element.tournamentName
        });
      });
      res.send(userTournaments);
    }
  );
  // userPredictions.find(query, function(err, response) {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (response === null) {
  //     res.status(404).send("This user is not registered to any tournament");
  //   }
  //   response.forEach(element => {
  //     tournamentIds.push(element.tournamentId);
  //   });
  //   res.send(tournamentIds);
  // });
};

exports.getUsersPredictionsByTournament = function(req, res, next) {
  var query = { tournamentId: req.params.tournamentId };
  userPredictions.find(query, function(err, response) {
    if (err) {
      return next(err);
    }
    res.send(response);
  });
};

exports.getUserPredictions = function(req, res, next) {
  var query = {
    tournamentId: req.params.tournamentId,
    userEmail: req.params.userEmail
  };
  userPredictions.findOne(query, function(err, response) {
    if (err) {
      return next(err);
    }
    res.send(response);
  });
};

exports.addPredictionToUser = function(req, res, next) {
  var query = {
    tournamentId: req.params.tournamentId,
    userEmail: req.params.userEmail
  };
  var update = {
    $addToSet: { gamesPredictions: req.body }
  };
  userPredictions.findOneAndUpdate(query, update, function(err, result) {
    if (err) {
      return next(err);
    }
    res.send(result);
  });
};

exports.saveUserPredicrtions = function(req, res, next) {
  var query = {
    tournamentId: req.params.tournamentId,
    userEmail: req.params.userEmail
  };
  var update = {
    gamesPredictions: req.body
  };
  userPredictions.findOneAndUpdate(query, update, function(err, result) {
    if (err) {
      return next(err);
    }
    res.send(result);
  });
};
