const router = require('express').Router();
const userRoutes = require('./userRoutes');
const faceRoutes = require('./face');

module.exports = function() {
	router.use('/users', userRoutes());
	router.use('/face', faceRoutes());

	return router;
};
