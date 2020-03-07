const {
	signupUser,
	signinUser,
	getUsers,
	getUser,
	deleteUser,
	editUser,
} = require('../services/userServices');

const { response } = require('../helpers/messages');
const CustomError = require('../helpers/CustomError');

class UserContoller {
	async signupUser(req, res, next) {
		const token = await signupUser(req.body);
		res.status(201).send(response('Account created', token));
	}

	async signinUser(req, res, next) {
		const token = await signinUser(req.body);
		res.status(200).send(response('User signed in', token));
	}

	async getUsers(req, res, next) {
		const users = await getUsers();
		res.status(200).send(response('All users', users));
	}

	async getUser(req, res, next) {
		const user = await getUser(req.params.userId);
		res.status(200).send(response('User detail', user));
	}

	async editUser(req, res, next) {
		const user = await editUser(req.params.userId, req.body);
		if (req.params.userId != req.user.id)
			throw new CustomError('Invalid user', 401);
		res.status(200).send(response('Profile edited', user));
	}

	async deleteUser(req, res, next) {
		const user = await deleteUser(req.params.userId);
		res.status(200).send(response('User deleted', user));
	}
}

module.exports = new UserContoller();
