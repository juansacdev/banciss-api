const response = require("../../lib/response");
const {
    getAllUsers,
	getOneUserById,
	updateUserById,
	deleteOneUserById
} = require('./store')

const getUsers = async (req, res) => {
    try {
		const data = await getAllUsers();
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

const getUserById = async (req, res) => {
    const { userId } = req.params
    try {
		const data = await getOneUserById(userId);

		if (!data) {
			return response.error({
				res,
				msg: "El usuario no existe",
				status: 404,
				error: `Se intento obtener un usuario que no existe`,
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

const editUserById = async (req, res) => {
	const userData = {}

	if (req.body.name) {
		userData.name = req.body.name
	}

	if (req.body.lastName) {
		userData.lastName = req.body.lastName
	}

	if (req.body.email) {
		userData.email = req.body.email
	}

	if (req.body.password) {
		userData.password = req.body.password
	}

	if (req.body.confirmPassword) {
		userData.confirmPassword = req.body.confirmPassword
	}

	try {
		if (userData.password && userData.confirmPassword) {
			if (userData.password !== userData.confirmPassword) {
				return response.error({
					res,
					msg: "Las contraseñas no coinciden",
					status: 400,
					error: "El usuario ingreso mal las contraseñas",
				});
			}
		}

		const { confirmPassword, ...newData } = userData
		const { userId } = req.params
		const data = await updateUserById(userId, newData)

		if (!data) {
			return response.error({
				res,
				msg: "Este usuario no existe",
				status: 404,
				error: 'Se intento actualizar un usuario que no existe',
			});
		}

		return response.success({
			res,
			data,
			msg: 'Usuario actualizado con exito!',
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

const deleteUserById = async (req, res) => {
	const { userId } = req.params
	try {
		const data = await deleteOneUserById(userId)

		if (!data) {
			return response.error({
				res,
				msg: "Este usuario no existe",
				status: 404,
				error: 'Se intento eliminar un usuario que no existe',
			});
		}

		return response.success({
			res,
			data,
			msg: 'Usuario eliminado con exito!',
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
    getUsers,
	getUserById,
	editUserById,
	deleteUserById,
}