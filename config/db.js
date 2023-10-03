const mongoose = require("mongoose");

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI);
	//not important just to show that mongodb is connected
	console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
