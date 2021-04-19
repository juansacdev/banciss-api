const response = require("../../lib/response");

const signup = () => {
	return response.success({
		res,
		status: 200,
	});
}

const signin = () => {
	return response.success({
		res,
		status: 200,
	});
}

module.exports = {
	signup,
	signin,
}