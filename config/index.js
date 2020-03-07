require('dotenv').config();

const config = {};
const jwt_key = process.env.JWT_KEY || 'randomtokenkey';
const mongo_uri = 'mongodb://localhost:27017/fsi';
const env = process.env.NODE_ENV || 'development';
const CSA_APIKEY = process.env.CSA_APIKEY;

config.development = {
	jwt_key,
	mongo_uri,
	port: 3000,
	'Ocp-Apim-Subscription-Key': CSA_APIKEY,
};

config.production = {
	jwt_key,
	mongo_uri: process.env.MONGO_URI || mongo_uri,
	port: process.env.PORT || 8080,
	'Ocp-Apim-Subscription-Key': CSA_APIKEY,
};

module.exports = config[env] ? config[env] : config['development'];
