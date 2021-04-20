const {
	getProducts,
	getProductById,
	createProduct,
	editProductById,
	deleteProductById,
} = require("./controller");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { Router } = require("express");
const router = Router();

router.get("/", verifyToken, getProducts);
router.get("/:productId", verifyToken, getProductById);
router.post("/create", [verifyToken, isAdmin], createProduct);
router.put("/edit/:productId", [verifyToken, isAdmin], editProductById);
router.delete("/delete/:productId", [verifyToken, isAdmin], deleteProductById);

module.exports = router;
