const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameSchema = new Schema({
  groupA: String,
  groupB: String,
  stage: String,
  gameStartDate: Date,
  groupAResult90Min: Number,
  groupBResult90Min: Number,
  moveToNextStage: String,
  howTheGameOver: String,
  groupAResultExtraTime: Number,
  groupBResultExtraTime: Number
});

module.exports = mongoose.model("game", gameSchema);
