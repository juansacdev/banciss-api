const speakeasy = require("speakeasy");
const response = require("../../api/lib/response");

const creteSecretTwoAf = () => {
	const secretBase32 = speakeasy.generateSecret();
	return secretBase32.base32
};

const decodedSecretForTwoAf = (secret) => {
	const tokenDecoded = speakeasy.totp({
		secret: secret,
		encoding: "base32",
	});

	return tokenDecoded;
};

const validateTokenTwoAf = (secret, token) => {
	const tokenValidates = speakeasy.totp.verify({
		secret: secret,
		encoding: "base32",
		token,
	});
	return tokenValidates;
};


const verifyTokenTwoAf = async (req, res, next) => {

	try {
		const { tokerForTwoAf } = req

		if (!tokerForTwoAf) {
			return response.invalidToken({
				res,
				msg: "Not token provided for the two factor authtentication",
				status: 403,
			});
		}

		const tokenUserToDecode = decodedSecretForTwoAf(tokerForTwoAf)

		const tokenMatch = validateTokenTwoAf(tokerForTwoAf, tokenUserToDecode)

		if (!tokenMatch) {
			return response.isNotAdmin({
				res,
				msg: 'User unauthorized',
				status: 401,
			});
		}

		next()
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	creteSecretTwoAf,
	decodedSecretForTwoAf,
	validateTokenTwoAf,
	verifyTokenTwoAf,
}
