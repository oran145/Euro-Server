const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userPredictionsSchema = new Schema({
  userEmail: String,
  tournamentId: String,
  gamesPredictions: [
    {
      gameId: String,
      groupAPrediction: Number,
      groupBPrediction: Number,
      howTheGameOver: String,
      MovedToNextStage: String
    }
  ]
});

module.exports = mongoose.model("userPredictions", userPredictionsSchema);
