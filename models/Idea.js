const mongoose = require("mongoose");

//Database Schema
const IdeaSchema = new mongoose.Schema({
	text: {
		type: String,
		required: [true, "Please add a text field"],
	},
	tag: {
		type: String,
	},
	username: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Idea", IdeaSchema);
