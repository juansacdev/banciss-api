const response = require("../../lib/response");
const {
	getAllPqrs,
	getOnePqrById,
    createOnePqr,
	updatePqrById,
	deleteOnePqrById,
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

		if (!data) {
			return response.error({
				res,
				msg: "El pqr no existe",
				status: 404,
				error: `Se intento obtener un pqr que no existe`,
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

const createPqr = async (req, res) => {
	const {
		title,
		description,
	} = req.body;

	const userId = req.userId

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
			msg: 'Pqr creado con exito!',
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

		if (!data) {
			return response.error({
				res,
				msg: "Este pqr no existe",
				status: 404,
				error: `Se intento actualizar un pqr que no existe`,
			});
		}

		return response.success({
			res,
			msg: 'Pqr actualizado con exito!',
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

const deletePqrById = async (req, res) => {
	const { pqrId } = req.params
	const userId = req.userId
	try {
		const data = await deleteOnePqrById(pqrId, userId)

		if (!data) {
			return response.error({
				res,
				msg: "El pqr no existe",
				status: 404,
				error: `Se intento eliminar un pqr que no existe`,
			});
		}

		return response.success({
			res,
			data,
			msg:'Pqr Eliminado con exito!',
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
    createPqr,
	editPqrById,
	deletePqrById,
}