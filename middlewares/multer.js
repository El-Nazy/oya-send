const multer = require('multer');
const storage = multer.memoryStorage();
const { response } = require('../helpers/messages');

const fileFilter = (req, file, cb) => {
	let type = file.mimetype.split('/')[0];

	if (type !== 'image') {
		return cb(new Error('Only image files are allowed!'), false);
	}

	cb(null, true);
};

const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 6 },
	fileFilter,
}).single('image');

module.exports = (req, res, next) => {
	upload(req, res, err => {
		if (err) {
			return res.status(400).send(response(err.message), null, false);
		}

		next();
	});
};
