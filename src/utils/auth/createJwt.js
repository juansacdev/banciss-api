const { jwt_secret } = require("../../config");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
	const token = jwt.sign(
		{
			id: user._id,
		},
		jwt_secret,
		{
			expiresIn: "100m",
		},
	);

	return token;
};

module.exports = {
    createToken,
}