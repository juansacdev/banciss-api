const Pqr = require("../../../database/models/pqr");
const Transaction = require("../../../database/models/transaction");
const User = require("../../../database/models/user");
const { encryptPassword } = require("../../../utils/encryption");

const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		try {
			User.find()
				.populate("role")
				.populate("products")
				.populate({
					path: "transactions",
					select: "_id realizada",
				})
				.populate({
					path: "pqrs",
					select: "_id title description createdAt",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const getOneUserById = (id) => {
	return new Promise((resolve, reject) => {
		try {
			const userFound = User.findById(id);

			if (!userFound) {
				return reject(null);
			}

			User.findById(id)
				.populate("role")
				.populate("products")
				.populate({
					path: "transactions",
					select: "_id realizada",
				})
				.populate({
					path: "pqrs",
					select: "_id title description createdAt",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const updateUserById = (userId, userData) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hash;
			let password;
			if (userData.password) {
				password = userData.password;
				hash = await encryptPassword(password);
				userData.password = hash;
			}

			const userUpdated = await User.findByIdAndUpdate(userId, userData, {
				new: true,
			});

			if (!userUpdated) {
				return resolve(null);
			}

			await userUpdated.save();

			User.findById(userId)
				.populate("role")
				.populate("products")
				.populate({
					path: "transactions",
					select: "_id realizada",
				})
				.populate({
					path: "pqrs",
					select: "_id title description createdAt",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const deleteOneUserById = async (userId) => {
	const userFound = User.findById(userId);

	if (!userFound) {
		return null;
	}

	// eliminar toda la data asociada a esta persona
	const pqrsToDelete = await Pqr.find({user: {$in: userId }})
	pqrsToDelete.forEach( async (pqr) => await Pqr.findByIdAndDelete(pqr._id))

	const transactionToDelete = await Transaction.find({user: {$in: userId }})
	transactionToDelete.forEach( async (transaction) => await Transaction.findByIdAndDelete(transaction._id))

	const userFoundandDeleted = await User.findByIdAndDelete(userId);

	if (!userFoundandDeleted) {
		return null;
	}

	return userFoundandDeleted

};

module.exports = {
	getAllUsers,
	getOneUserById,
	updateUserById,
	deleteOneUserById,
};
