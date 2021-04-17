const response = require("../../lib/response");
const {
	getAllPqrs,
	getOnePqrById,
	getAllPqrsFromOneUserById,
    createOnePqr,
	updatePqrById,
} = require('./store')

const getPqrs = async (req, res) => {
	try {
		const data = await getAllPqrs();
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

const getPqrById = async (req, res) => {
    const { pqrId } = req.params
	try {
		const data = await getOnePqrById(pqrId);
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

const getPqrsByUserId = async (req, res) => {
    const { userId } = req.params
	try {
		const data = await getAllPqrsFromOneUserById(userId);
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

const createPqr = async (req, res) => {
	const {
		title,
		description,
	} = req.body;

	const userId = req.user.id

	if (!title || !description) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	const pqrData = {
		title,
		description,
		user: userId
	};

	try {
		const data = await createOnePqr(pqrData);

		return response.success({
			res,
			data,
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

const editPqrById = async (req, res) => {
	const pqrData = {}

	if (req.body.title) {
		pqrData.title = req.body.title
	}

	if (req.body.description) {
		pqrData.description = req.body.description
	}

	try {
		const { pqrId } = req.params
		const data = await updatePqrById(pqrId, pqrData)

		if (data) {
			return response.success({
				res,
				data,
				status: 200,
			});
		}

		return response.error({
			res,
			msg: "Este PQR no existe",
			status: 404,
			error: 'Se intento actualizar un PQR que no existe',
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

const deletePqrById = async (req, res) => {
	const { pqrId } = req.params
	try {
		const data = await deleteOnePqrById(pqrId)

		return response.success({
			res,
			data,
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
    getPqrs,
	getPqrById,
	getPqrsByUserId,
    createPqr,
	editPqrById,
	deletePqrById,
}