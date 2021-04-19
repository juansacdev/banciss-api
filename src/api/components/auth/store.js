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

		const twoAfToken = creteSecretTwoAf();
		userData.token = twoAfToken;

		const userCreated = new User(userData);

		if (userRole) {
			const foundRole = await Role.findOne({ name: { $in: userRole } });
			userCreated.role = foundRole._id;
		} else {
			const defaultRole = await Role.findOne({ name: "user" });
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
		const userFindInDB = await User.findOne({ email: userEmail });

		let code = {
			emailNotFound: false,
			passwordNotMach: false,
			tokenNotMatch: false,
		};

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

		const { token } = userFindInDB;

		const tokenUserToDecode = decodedSecretForTwoAf(token);

		const tokenMatch = validateTokenTwoAf(token, tokenUserToDecode);

		if (!tokenMatch) {
			code.tokenNotMatch = true;
			return code;
		}

		const tokenLogin = createToken(userFindInDB);
		return tokenLogin;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	registerUser,
	signinUser,
};
