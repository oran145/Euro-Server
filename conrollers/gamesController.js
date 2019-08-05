const Game = require("../models/game.model");

exports.getAllGames = function(req, res, next) {
  Game.find({}, function(err, response) {
    if (err) {
      return next(err);
    }
    res.send(response);
  });
};

exports.createGame = function(req, res, next) {
  let newGame = new Game(req.body);

  newGame.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(newGame);
  });
};
