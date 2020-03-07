const router = require('express').Router();
const FaceController = require('../controllers/faceController');
const { isUser } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

module.exports = () => {
	// router.use(isUser);

	router.post('/persongroups/create', FaceController.createPersonGroup);
	router.post('/add', upload, FaceController.detectPersonAndAddImage);
	router.post('/identify', upload, FaceController.identifyPerson);
	return router;
};
