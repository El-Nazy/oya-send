const {
	createPerson,
	addPersonImage,
	detectPerson,
	trainPersonGroup,
	identityFace,
} = require('../services/faceServices');
const { response } = require('../helpers/messages');

class FaceController {
	async createPersonGroup(req, res, next) {
		const { data } = await createPerson();
		return res
			.status(200)
			.json(response('Create Person Request was successful', data));
	}

	async detectPersonAndAddImage(req, res, next) {
		const { buffer } = req.file;
		const { personId } = req.user;
		let { data: facesDetected } = await detectPerson(buffer);
		if (!facesDetected || facesDetected.length === 0) {
			return res
				.status(400)
				.json(
					response(
						'Face not found in Image. Make sure to take a clear picture',
						null,
						false
					)
				);
		}

		await addPersonImage(personId, buffer);
		await trainPersonGroup();
		return res.status(200).json(response('Faced added Successfully'));
	}

	async identifyPerson(req, res, next) {
		if (!req.file) {
			return res
				.status(400)
				.send(response('Bad request. Image not found', null, false));
		}

		const { buffer } = req.file;

		const { data } = await detectPerson(buffer);

		if (data.length === 0) {
			return res
				.status(401)
				.json(
					response(
						'Authentication Failed. Face not Recognized',
						{ match: false },
						false
					)
				);
		}
		const faceIds = [data[0].faceId];
		const identityRes = await identityFace(faceIds);

		let persons = identityRes.data[0].candidates;
		if (persons.length === 0) {
			return res
				.status(401)
				.json(
					response(
						'Authentication Failed. Face not Recognized',
						{ match: false },
						false
					)
				);
		}

		return res
			.status(200)
			.json(
				response(
					'Authentication Completed. Image Matched',
					{ match: true },
					true
				)
			);
	}
}

module.exports = new FaceController();
