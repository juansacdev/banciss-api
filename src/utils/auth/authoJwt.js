const { jwt_secret } = require("../../config");
const response = require("../../api/lib/response");
const jwt = require("jsonwebtoken");
const Role = require("../../database/models/role");
const User = require("../../database/models/user");

const verifyToken = (req, res, next) => {
	try {
		let token = req.headers.authorization;

		if (!token) {
			return response.invalidToken({
				res,
				msg: "Not token provided",
				status: 403,
			});
		}

		const decoded = jwt.verify(token, jwt_secret);
		req.userId = decoded.id;
		next();
	} catch (error) {
		if (error.message === "jwt expired") {
			return response.invalidToken({
				res,
				msg: "Your JWT has been expired",
				status: 401,
			});
		}

		if (error.message === "invalid signature") {
			return response.invalidToken({
				res,
				msg: "Invalid Token",
				status: 401,
			});
		}

		return response.invalidToken({
			res,
			status: 401,
			msg: "Unauthorized",
		});
	}
};

const isAdmin = async (req, res, next) => {
	const { userId } = req;
	const user = await User.findById(userId);
	const roleUser = await Role.findOne({ _id: { $in: user.role }});

    if (roleUser.name !== 'admin') {
        return response.isNotAdmin({
            res,
            msg: 'User unauthorized. Require Admin role',
            status: 401,
        });
    }
    next()
};
module.exports = {
	verifyToken,
	isAdmin,
};
