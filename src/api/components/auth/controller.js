const response = require("../../lib/response");
const {
    registerUser,
	signinUser,
} = require('./store')

const getSignin = () => {
	return response.success({
		res,
		status: 200,
	});
}

const signup = async (req, res) => {
    const {
		name,
		lastName,
		email,
		password,
		confirmPassword,
		role,
	} = req.body;

	if (!name || !lastName || !email || !password || !confirmPassword) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	if (password !== confirmPassword) {
		return response.error({
			res,
			msg: "Las contraseñas no coinciden",
			status: 400,
			error: "El usuario ingreso mal las contraseñas",
		});
	}

	const userData = {
		name,
		lastName,
		email,
		password,
		role,
	};

	try {
		const data = await registerUser(userData);

		if (!data) {
			return response.error({
				res,
				msg: "El email ya esta en uso",
				status: 409,
				error: `Email ya en DB: ${data}`,
			});
		}

		return response.token({
			res,
			token: data,
			msg: 'First Authentication',
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

const signin = async (req, res) => {
    const {
		email,
		password,
	} = req.body;

	if (!email || !password) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	const userData = {
		email,
		password,
	};

	try {
		const data = await signinUser(userData);

		const { emailNotFound, passwordNotMach, tokenNotMatch } = data

		if (emailNotFound) {
			return response.error({
				res,
				msg: "El email no esta registrado",
				status: 404,
				error: `Email no esta en la db`,
			});
		}

		if (passwordNotMach) {
			return response.error({
				res,
				msg: "Contraseña incorrecta",
				status: 404,
				error: `Se intento ingresar con una contraseña invalida`,
			});
		}

		if (tokenNotMatch) {
			return response.invalidToken({
				res,
				msg: "User Unauthorized",
				status: 403,
			});
		}

		return response.token({
			res,
			token: data,
			msg: 'expire in 10 minutes!',
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
    signup,
	signin,
	getSignin,
}