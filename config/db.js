const mongoose = require('mongoose');
const config = require('./index');

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

module.exports = function initDB() {
	mongoose
		.connect(config.mongo_uri, options)
		.then(() => {
			console.log(':: connected to database');
		})
		.catch(error => {
			console.log(":: couldn't connect to database ", error);
		});
};
