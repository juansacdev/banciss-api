const { jwt_secret } = require("../../config");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
		},
		jwt_secret,
		{
			expiresIn: "1h",
		},
	);

	return token;
};

module.exports = {
    createToken,
}