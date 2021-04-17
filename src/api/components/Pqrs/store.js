const Pqr = require("../../../db/models/pqr");

const getAllPqrs = () => {
	try {
		return new Promise((resolve, reject) => {
			Pqr.find()
				.populate("user")
				.exec((error, data) => {
					if (error) {
						reject(error);
						return false;
					}
					resolve(data);
				});
		});
	} catch (error) {
		console.error(error);
	}
};

const getOnePqrById = (pqrId) => {
	try {
		return new Promise((resolve, reject) => {
			Pqr.findById(pqrId)
				.populate("user")
				.exec((error, data) => {
					if (error) {
						reject(error);
						return false;
					}
					resolve(data);
				});
		});
	} catch (error) {
		console.error(error);
	}
};

const getAllPqrsFromOneUserById = (userId) => {
	try {
		return new Promise((resolve, reject) => {
			Pqr.find()
				.populate({
					path: "user",
					select: "_id name lastName email",
					match: { _id: userId },
				})
				.exec((error, data) => {
					if (error) {
						reject(error);
						return false;
					}
					resolve(data);
				});
		});
	} catch (error) {
		console.error(error);
	}
};

const createOnePqr = async (pqrData) => {
	try {
		const pqrCreated = new Pqr(pqrData);
		await pqrCreated.save();
		return pqrCreated;
	} catch (error) {
		console.error(error);
	}
};

const updatePqrById = (pqrId, pqrData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const pqrFound = Pqr.findById(pqrId);

			if (!pqrFound) {
				reject(null);
			}

			const pqrUpdated = await Pqr.findByIdAndUpdate(pqrId, pqrData, {
				new: true,
			});
			await pqrUpdated.save();

			Pqr.findById(pqrId)
				.populate("user")
				.exec((error, data) => {
					if (error) {
						reject(error);
						return false;
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const deletePqrById = (pqrId) => Pqr.findByIdAndDelete(pqrId)

module.exports = {
	getAllPqrs,
	getOnePqrById,
	getAllPqrsFromOneUserById,
	createOnePqr,
	updatePqrById,
	deletePqrById,
};
