const success = ({ res, data, status }) => {
	let statusCode = status;
	let fullData = data || "";

	res.status(statusCode).send({
		statusCode,
		data: fullData,
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
};
