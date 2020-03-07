const axios = require('axios');
const config = require('../config');

// custom headers for calling api
const headers = {
	'Content-Type': 'application/json',
	'Ocp-Apim-Subscription-Key': config['Ocp-Apim-Subscription-Key'],
};
const baseURL = 'https://oya-send.cognitiveservices.azure.com';
const instance = axios.create({
	baseURL,
	headers,
});
const personGroupId = 'oyasend-users';

exports.createPerson = async () => {
	const data = {
		name: 'Oyasend Users',
		recognitionModel: 'recognition_02',
	};
	return await instance.put(`/face/v1.0/persongroups/${personGroupId}`, data);
};

exports.createPersonInGroup = async user => {
	if (!user) {
		throw new Error('User Object is required to create Person in Group');
	}

	const data = {
		name: user._id,
	};
	return await instance.post(
		`/face/v1.0/persongroups/${personGroupId}/persons`,
		data
	);
};

// detect persons image
exports.detectPerson = async buffer => {
	if (!buffer) throw new Error('Image buffer required to detect person');
	const options = { ...headers, 'Content-Type': 'application/octet-stream' };
	const url = `${baseURL}/face/v1.0/detect?recognitionModel=recognition_02`;

	return axios.post(url, buffer, { headers: options });
};

//add persons image
exports.addPersonImage = async (personId, buffer) => {
	if (!buffer) throw new Error('Image buffer required to detect person');
	const options = {
		...headers,
		'Content-Type': 'application/octet-stream',
		detectionModel: 'detection_02',
	};

	let url = `${baseURL}/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
	return axios.post(url, buffer, { headers: options });
};

exports.trainPersonGroup = async () => {
	return await instance.post(`/face/v1.0/persongroups/${personGroupId}/train`, {
		personGroupId,
	});
};

exports.identityFace = async faceIds => {
	const data = {
		personGroupId,
		faceIds,
		maxNumOfCandidatesReturned: 1,
		confidenceThreshold: 0.5,
	};
	return await instance.post('/face/v1.0/identify', data);
};
