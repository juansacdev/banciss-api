const success = ({ res, data, status }) => {
	let statusCode = status || 200;
	let fullData = data || "";

	res.status(statusCode).send({
		statusCode,
		data: fullData,
	});
};

const error = ({ res, status, error }) => {
	console.error(`Response errror: ${error}`);
	let statusCode = status || 500;

	res.status(statusCode).send({
		error: {
			statusCode,
			message: "Internal Error",
		},
	});
};

module.exports = {
	success,
	error,
};
