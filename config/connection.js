const mongoose = require('mongoose');
let dbjson = require('config');

module.exports.mongo_init = () => {
	try {
		// Uncomment Debug true when you wish to see which query execute via mongoose
		// mongoose.set('debug', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useUnifiedTopology', true);
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useCreateIndex', true);
		console.log(dbjson.get("database.mongo"));

		try {
			return mongoose.connect(dbjson.get("database.mongo"));
		} catch (e) {
			console.log("Error! Connection Failed", e);
		}

	} catch (e) {
		console.log(e);
	}
};