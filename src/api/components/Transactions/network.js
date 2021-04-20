const {
	getTransactions,
	getTransactionById,
	createTransaction,
	deleteTransactionById,
} = require("./controller");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { Router } = require("express");
const router = Router();

router.get("/", verifyToken, getTransactions);
router.get("/:transactionId", verifyToken, getTransactionById);
router.post("/create", verifyToken, createTransaction);
router.delete("/delete/:transactionId", [verifyToken, isAdmin], deleteTransactionById);

module.exports = router;
