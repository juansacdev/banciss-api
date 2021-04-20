const response = require("../../lib/response");
const {
    registerUser,
	signinUser,
	validateToken,
} = require('./store')

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
		const tokenForTwoAf = await signinUser(userData);

		const { emailNotFound, passwordNotMach } = tokenForTwoAf

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

		const data = {
			userEmail: email,
			token: tokenForTwoAf,
		}

		return response.success({
			res,
			data,
			msg: 'Revisa tu email, se te envio un código de verificación',
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

const twoAf = async (req, res) => {
	const { useremail: userEmail, authorization: userToken } = req.headers
	const { code: userCode } = req.body

	if (!userToken || !userEmail) {
		return response.invalidToken({
			res,
			msg: "Not token provided",
			status: 403,
		});
	}

	const tokenData = {
		userToken,
		userEmail,
		userCode,
	}

	try {
		const data = await validateToken(tokenData);

		const { emailNotFound, tokenNotMach } = data

		if (emailNotFound) {
			return response.error({
				res,
				msg: "El email no esta registrado o es incorrecto",
				status: 404,
				error: `Email no esta en la db`,
			});
		}

		if (tokenNotMach) {
			return response.error({
				res,
				msg: "El codigo es incorrecto o expiro",
				status: 404,
				error: `Se ingresa un codigo que no hace match con el token o expiro`,
			});
		}

		return response.token({
			res,
			token: data,
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
	twoAf,
}