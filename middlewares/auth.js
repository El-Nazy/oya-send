const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require('../helpers/CustomError');
const config = require('../config');

async function isUser(req, res, next) {
	const decoded = await jwt.verify(req.headers.authtoken, config.jwt_key);

	const user = await User.findOne({ _id: decoded.id });

	if (!user) throw new CustomError("User dosen't exist");

	if (decoded.role == 'user') {
		req.user = user;
		next();
	} else {
		throw new CustomError('Unauthorized user', 401);
	}
}

module.exports.isUser = isUser;
