const response = require("../../lib/response");
const {
	getAllProducts,
	getOneProductById,
	createOneProduct,
	editOneProduct,
	deleteOneProduct,
} = require("./store");

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
};

const getProductById = async (req, res) => {
	const { productId } = req.params;
	try {
		const data = await getOneProductById(productId);

		if (!data) {
			return response.error({
				res,
				msg: "El producto no existe",
				status: 404,
				error: `Se intento obtener un producto que no existe`,
			});
		}

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
};

const createProduct = async (req, res) => {
	const { name, type, description } = req.body;

	if (!name || !type || !description) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	if (
		![
			"tarjeta de credito",
			"tarjeta de debito",
			"cuenta bancaria",
			"hipoteca",
			"seguros",
		].includes(type)
	) {
		return response.error({
			res,
			msg: "Tipo de producto invalido",
			status: 400,
			error: "El usuario ingresa tipos de productos no validados",
		});
	}

	const productData = {
		name,
		type,
		description,
	};

	try {
		const data = await createOneProduct(productData);

		return response.success({
			res,
			data,
			status: 201,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
};

const editProductById = async (req, res) => {
	const productData = {}

	if (req.body.name) {
		productData.name = req.body.name
	}

	if (req.body.type) {
		productData.type = req.body.type
	}

	if (req.body.description) {
		productData.description = req.body.description
	}

	try {
		const { productId } = req.params
		const data = await editOneProduct(productId, productData)

		if (!data) {
			return response.error({
				res,
				msg: "Este producto no existe",
				status: 404,
				error: `Se intento actualizar un producto que no existe`,
			});
		}

		return response.success({
			res,
			msg: 'Producto actualizado con exito!',
			data,
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

const deleteProductById = async (req, res) => {
	const { productId } = req.params
	try {
		const data = await deleteOneProduct(productId)

		if (!data) {
			return response.error({
				res,
				msg: "El producto no existe",
				status: 404,
				error: `Se intento eliminar un producto que no existe`,
			});
		}

		return response.success({
			res,
			data,
			msg:'Producto eliminado con exito!',
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	editProductById,
	deleteProductById,
};
