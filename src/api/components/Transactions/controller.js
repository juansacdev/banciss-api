const response = require("../../lib/response");
const {
    getAllTransactions,
    getOneTransactionById,
    createOneTransaction,
	deleteOneTransactionById
} = require('./store')

const getTransactions = async (req, res) => {
    try {
		const data = await getAllTransactions();
		return response.success({
			res,
			data,
			status: 200,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal error",
			status: 500,
			error,
		});
	}
}

const getTransactionById = async (req, res) => {
    const { transactionId } = req.params
    try {
		const data = await getOneTransactionById(transactionId);

		if (!data) {
			return response.error({
				res,
				msg: "La transacción no existe",
				status: 404,
				error: `Se intento obtener un transacción que no existe`,
			});
		}

		return response.success({
			res,
			data,
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal error",
			status: 500,
			error,
		});
	}
}

const createTransaction = async (req, res) => {
	const userId = req.userId

	const transactionData = {
		user: userId
	};

	try {
		const data = await createOneTransaction(transactionData, userId);
		return response.success({
			res,
			data,
			msg: 'Transaction creada con exito!',
			status: 201,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

const deleteTransactionById = async (req, res) => {
	const { transactionId } = req.params
	const userId = req.userId
	try {
		const data = await deleteOneTransactionById(transactionId, userId)

		if (!data) {
			return response.error({
				res,
				msg: "La  transaccion no existe",
				status: 404,
				error: `Se intento eliminar una transaccion que no existe`,
			});
		}

		return response.success({
			res,
			data,
			msg:'Transaccion eliminada con exito!',
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction,
	deleteTransactionById,
}