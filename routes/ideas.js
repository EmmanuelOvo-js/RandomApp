const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea"); //Schema imported from config file

//Get all ideas
router.get("/", async (req, res) => {
	try {
		const ideas = await Idea.find();
		res.json({ success: true, data: ideas });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Something went wrong" });
	}
});

//Get by single idea by id
router.get("/:id", async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		res.json({ success: true, data: idea });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Something went wrong" });
	}
});

//Post Ideas
router.post("/", async (req, res) => {
	const idea = new Idea({
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
	});

	try {
		const savedIdea = await idea.save();
		res.json({ success: true, data: savedIdea });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Something went wrong" });
	}
});

//Update Ideas
router.put("/update/:id", async (req, res) => {
	try {
		//basic validation
		const idea = await Idea.findById(req.params.id);

		//Check if inputed username matches db username
		if (idea.username === req.body.username) {
			const updatedIdea = await Idea.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						text: req.body.text,
						tag: req.body.tag,
					},
				},
				//if data does not exist it creates a new data
				{ new: true }
			);
			return res.json({ success: true, data: updatedIdea });
		}
		//Username do not match
		res.status(403).json({
			success: false,
			error: "You are not authorized to Update this data",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Something went wrong" });
	}
});

//Delete Ideas
router.delete("/:id", async (req, res) => {
	try {
		//basic validation
		const idea = await Idea.findById(req.params.id);

		//Check if inputed username matches db username
		if (idea.username === req.body.username) {
			await Idea.findByIdAndDelete(req.params.id);
			return res.json({ success: "Item Deleted", data: {} });
		}
		//Username do not match
		res.status(403).json({
			success: false,
			error: "You are not authorized to Delete this data",
		});
		//end validation
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Something went wrong" });
	}
});

module.exports = router;
