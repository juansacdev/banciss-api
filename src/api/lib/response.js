const success = ({ res, msg, data, status }) => {
	let fullData = data || "";
	let message = msg || 'Todo OK'

	res.status(status).send({
		statusCode: status,
		message,
		data: fullData,
	});
};

const token = ({ res, msg, token, status }) => {
	let message = msg || 'Todo OK'

	res.status(status).send({
		statusCode: status,
		message,
		token,
	});
};

const invalidToken = ({ res, msg, status }) => {
	let message = msg || 'Invalid token'

	res.status(status).send({
		statusCode: status,
		message,
	});
};

const isNotAdmin = ({ res, msg, status }) => {

	res.status(status).send({
		statusCode: status,
		message: msg,
	});
};

const error = ({ res, msg, status, error }) => {
	console.error(`Response errror: ${error}`);

	res.status(status).send({
		error: {
			statusCode: status,
			message: msg,
		},
	});
};

module.exports = {
	success,
	error,
	token,
	invalidToken,
	isNotAdmin,
};
