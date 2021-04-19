const Product = require("../../../database/models/product");

const getAllProducts = () => Product.find();

const getOneProductById = (id) => Product.findById(id);

const createOneProduct = async (productData) => {
    try {
		const productCreated = new Product(productData);
		await productCreated.save();
		return productCreated;
	} catch (error) {
		console.error(error);
	}
};

const editOneProduct = async (productId, productData) => {
    try {
        const productEdited = await Product.findByIdAndUpdate(productId, productData, {
            new: true,
        });

        if (!productEdited) {
            return null;
        }

        await productEdited.save();
        return productEdited
	} catch (error) {
		console.error(error);
	}
};

const deleteOneProduct = (productId) => {
    try {
    	const productFoundAndDeleted = Product.findByIdAndDelete(productId);

        if (!productFoundAndDeleted) {
            return null;
        }

	    return productFoundAndDeleted;
	} catch (error) {
		console.error(error);
	}
};



module.exports = {
	getAllProducts,
	getOneProductById,
	createOneProduct,
    editOneProduct,
    deleteOneProduct,
};
