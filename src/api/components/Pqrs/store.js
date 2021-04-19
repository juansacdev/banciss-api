const Pqr = require("../../../database/models/pqr");
const User = require("../../../database/models/user");

const getAllPqrs = () => {
	return new Promise((resolve, reject) => {
		try {
			Pqr.find()
				.populate({
					path: "user",
					select: "_id name lastName email",
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

const getOnePqrById = (pqrId) => {
	return new Promise((resolve, reject) => {
		try {
			const pqrFound = Pqr.findById(pqrId);

			if (!pqrFound) {
				return reject(null);
			}

			Pqr.findById(pqrId)
				.populate({
					path: "user",
					select: "_id name lastName email",
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

const createOnePqr = (pqrData) => {
	return new Promise(async (resolve, reject) => {
		try {
			// Crea PQR
			const pqrCreated = new Pqr(pqrData);

			await pqrCreated.save();

			// Se agrega Pqr al User que lo creo
			const { _id: pqrId } = pqrCreated;
			const { user: userId } = pqrData;

			const userUpdated = await User.findByIdAndUpdate(
				userId,
				{
					$addToSet: {
						pqrs: pqrId,
					},
				},
				{ new: true },
			);
			await userUpdated.save();

			// Resuelve con el pqr creado
			Pqr.findById(pqrId)
				.populate({
					path: "user",
					select: "_id name lastName email",
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

const updatePqrById = (pqrId, pqrData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const pqrUpdated = await Pqr.findByIdAndUpdate(pqrId, pqrData, {
				new: true,
			});

			if (!pqrUpdated) {
				return reject(null);
			}

			await pqrUpdated.save();

			Pqr.findById(pqrId)
				.populate({
					path: "user",
					select: "_id name lastName email",
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

const deleteOnePqrById = async (pqrId, userId) => {
	try {
		const pqrFound = Pqr.findById(pqrId);

		if (!pqrFound) {
			return null;
		}

		// Elimino la data que este asociada a este pqr
		const userUpdated = await User.findByIdAndUpdate(
			userId,
			{
				$pull: {
					pqrs: pqrId,
				},
			},
			{
				new: true,
			},
		);

		await userUpdated.save();
		const pqrFoundAndDeleted = Pqr.findByIdAndDelete(pqrId);

		if (!pqrFoundAndDeleted) {
			return null;
		}

		return pqrFoundAndDeleted;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getAllPqrs,
	getOnePqrById,
	createOnePqr,
	updatePqrById,
	deleteOnePqrById,
};
