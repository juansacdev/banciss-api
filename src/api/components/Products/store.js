const Product = require("../../../db/models/product");

const getAllProducts = () => Product.find()

const getOneProductById = (id) => Product.findById(id)

// const addProduct = async (productData) => {
// 	try {
// 		const productCreated = new Product(productData)
// 		await productCreated.save()
// 		return productCreated
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

module.exports = {
	getAllProducts,
    getOneProductById,
    // addProduct,
};