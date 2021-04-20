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
		window: 1,
	});
	return tokenValidates;
};

module.exports = {
	creteSecretTwoAf,
	decodedSecretForTwoAf,
	validateTokenTwoAf,
}
