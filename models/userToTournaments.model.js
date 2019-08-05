const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userToTournamentsSchema = new Schema({
  userEmail: String,
  tournamentIds: [String]
});

module.exports = mongoose.model("userToTournaments", userToTournamentsSchema);
