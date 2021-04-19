const Transaction = require("../../../database/models/transaction");
const User = require("../../../database/models/user");

const getAllTransactions = () => {
	return new Promise((resolve, reject) => {
		try {
			Transaction.find()
				.populate({
					path: "user",
					select: "_id name lastName email",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const getOneTransactionById = (id) => {
	return new Promise((resolve, reject) => {
		try {
			const transactionFound = Transaction.findById(id);

			if (!transactionFound) {
				return reject(null);
			}

			Transaction.findById(id)
				.populate({
					path: "user",
					select: "_id name lastName email",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const createOneTransaction = (transactionData, userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			// Crea la Transaction
			const transactionCreated = new Transaction(transactionData);
			await transactionCreated.save();

			// Se agrega la Transaction al User que lo creo
			const { _id: transactionId } = transactionCreated;

			const userUpdated = await User.findByIdAndUpdate(
				userId,
				{
					$addToSet: {
						transactions: transactionId,
					},
				},
				{ new: true },
			);
			await userUpdated.save();

			// Resuelve con la transaction creada
			Transaction.findById(transactionId)
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

const deleteOneTransactionById = async (transactionId, userId) => {
	try {
		const transactionFound = Transaction.findById(transactionId);

		if (!transactionFound) {
			return null;
		}

		// Elimino la data que este asociada a esta Transaction
		const userUpdated = await User.findByIdAndUpdate(
			userId,
			{
				$pull: {
					transactions: transactionId,
				},
			},
			{
				new: true,
			},
		);

		await userUpdated.save();

		const transactionFoundAndDeleted = Transaction.findByIdAndDelete(
			transactionId,
		);

		if (!transactionFoundAndDeleted) {
			return null;
		}

		return transactionFoundAndDeleted;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getAllTransactions,
	getOneTransactionById,
	createOneTransaction,
	deleteOneTransactionById,
};
