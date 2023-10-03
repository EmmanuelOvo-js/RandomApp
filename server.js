const path = require("path"); // nodejs module
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000; //test the port i added in dotenv file
const connectDB = require("./config/db"); //call in datababse function from config file

connectDB(); //invoke the function from config file

const app = express();

//make a static folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser Middleware
//use this always
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cors Midleware
app.use(cors());
//Or you tell cors to give access to specific URL
// app.use(
// 	core({
// 		origin: ["http://localhost:5000", "http://localhost:3000"],
// 		credentials: true,
// 	})
// );

// Welcome route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Emmanuel's App" });
});

//linking to ideas.js router
const ideasRouter = require("./routes/ideas.js");
//use. method for middleware
app.use("/api/ideas", ideasRouter); //connect endpoint to ideas.js

//server port
app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
