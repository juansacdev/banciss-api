const { getProducts, getProductById, /* createProduct */} = require("./controller");
const { Router } = require("express");
const router = Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);
// router.post("/", createProduct);

module.exports = router;
