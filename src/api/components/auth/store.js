const User = require("../../../database/models/user");
const Role = require("../../../database/models/role");
const {
	encryptPassword,
	comparePassword,
} = require("../../../utils/encryption");
const {
	creteSecretTwoAf,
	decodedSecretForTwoAf,
	validateTokenTwoAf,
} = require("../../../utils/auth/twoAf");
const { createToken } = require("../../../utils/auth/createJwt");
const { emailSend } = require("../../../utils/auth/mailer");

const registerUser = async (userData) => {
	const {
		role: userRole,
		email: userEmail,
		password: userPassword,
	} = userData;
	try {
		const userFindInDB = await User.findOne({ email: userEmail });

		if (userFindInDB) {
			return null;
		}

		const hash = await encryptPassword(userPassword);
		userData.password = hash;

		const userCreated = new User(userData);

		// Setting role. by default User
		if (userRole) {
			const foundRole = await Role.findOne({ name: { $in: userRole } });
			userCreated.role = foundRole._id;
		} else {
			const defaultRole = await Role.findOne({ name: "User" });
			userCreated.role = defaultRole._id;
		}

		const userSaved = await userCreated.save();
		return userSaved;
	} catch (error) {
		console.error(error);
	}
};

const signinUser = async (userData) => {
	const { email: userEmail, password: userPassword } = userData;
	try {
		const code = {
			emailNotFound: false,
			passwordNotMach: false,
		};

		const userFindInDB = await User.findOne({ email: userEmail });

		if (!userFindInDB) {
			code.emailNotFound = true;
			return code;
		}

		const passwordMach = await comparePassword(
			userPassword,
			userFindInDB.password,
		);

		if (!passwordMach) {
			code.passwordNotMach = true;
			return code;
		}

		const tokenTwoAf = creteSecretTwoAf();
		const tokenUserDecoded = decodedSecretForTwoAf(tokenTwoAf);

		await emailSend({
			code: tokenUserDecoded,
			userEmail,
		});

		return tokenTwoAf;
	} catch (error) {
		console.error(error);
	}
};

const validateToken = async (tokenData) => {
	const { userToken, userEmail, userCode } = tokenData;
	try {
		const code = {
			emailNotFound: false,
			tokenNotMach: false,
		};

		const userFindInDB = await User.findOne({ email: userEmail });

		if (!userFindInDB) {
			code.emailNotFound = true;
			return code;
		}

		// Valida si el encriptado contiene lo que se desencripto
		const tokenMatch = validateTokenTwoAf(userToken, userCode);

		if (tokenMatch) {
			const token = createToken(userFindInDB);
			return token;
		}

		code.tokenNotMach = true
		return code

	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	registerUser,
	signinUser,
	validateToken,
};
