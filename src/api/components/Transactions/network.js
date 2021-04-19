const {
	getTransactions,
	getTransactionById,
	createTransaction,
	deleteTransactionById,
} = require("./controller");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { verifyTokenTwoAf } = require("../../../utils/auth/twoAf");
const { Router } = require("express");
const router = Router();

router.get("/", getTransactions);
router.get("/:transactionId", getTransactionById);
router.post("/create", [verifyToken,verifyTokenTwoAf], createTransaction);
router.delete("/delete/:transactionId", [verifyToken, verifyTokenTwoAf, isAdmin], deleteTransactionById);

module.exports = router;
