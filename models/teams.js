const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  team_name: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  ties: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model("Leaderboard", teamSchema);
