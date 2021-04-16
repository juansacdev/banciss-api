const success = ({ res, data, status }) => {
	let statusCode = status || 200;
	let fullData = data || "";

	res.status(statusCode).send({
		error: "",
		body: fullData,
	});
};

const error = ({ res, data, status, error }) => {
	console.error(`Response errror: ${error}`);
	let statusCode = status || 500;
	let fullError = data || "";
	res.status(statusCode).send({
		error: fullError,
		body: "",
	});
};


module.exports = {
	success,
	error,
};
