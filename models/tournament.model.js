const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tournamentSchema = new Schema({
  tournamentName: String,
  groupStageScore: { correctlyWinnigTeam: Number, exactResult: Number },
  top16Score: {
    correctlyWinnigTeam: Number,
    exactResult: Number,
    howTheGameOverResult: Number
  },
  quarterFinalsScore: {
    correctlyWinnigTeam: Number,
    exactResult: Number,
    howTheGameOverResult: Number
  },
  halfFinalsScore: {
    correctlyWinnigTeam: Number,
    exactResult: Number,
    howTheGameOverResult: Number
  },
  finalScore: {
    correctlyWinnigTeam: Number,
    exactResult: Number,
    howTheGameOverResult: Number
  },
  participants: [
    {
      displayName: String,
      email: String,
      imagePath: String
    }
  ],
  tournamentManager: String
});

// make this available to our users in our Node applications
module.exports = mongoose.model("Tournament", tournamentSchema);
