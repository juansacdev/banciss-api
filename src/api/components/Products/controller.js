const response = require("../../lib/response");
const {
    getAllProducts,
    getOneProductById,
} = require('./store')

const getProducts = async (req, res) => {
    try {
		const data = await getAllProducts();
		return response.success({
			res,
			data,
			status: 200,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal error",
			status: 500,
			error,
		});
	}
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    try {
		const data = await getOneProductById(productId);
		return response.success({
			res,
			data,
			status: 200,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal error",
			status: 500,
			error,
		});
	}
}

module.exports = {
    getProducts,
    getProductById,
}