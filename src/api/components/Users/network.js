const response = require("../../lib/response");
const controller = require("./controller");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
	try {
		const data = await controller.getAll();
		response.success({
			res,
			data,
			status: 200,
		});
	} catch (error) {
		response.error({
			res,
			data: error.message,
			status,
			error,
		});
	}
});


module.exports = router