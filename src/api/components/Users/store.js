const User = require("../../../db/models/user");

const getAllUsers = () => {
	try {
		return new Promise((resolve, reject) => {
			User.find()
				.populate("product")
				.exec((error, data) => {
					if (error) {
						reject(error);
						return false;
					}
					resolve(data);
				});
		});
	} catch (error) {
		console.log(error);
	}
};


module.exports = {
	getAllUsers,
};