const {
	getUsers,
	getUserById,
	editUserById,
	deleteUserById,
} = require("./controller");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { Router } = require("express");
const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:userId", verifyToken, getUserById);
router.put("/edit/:userId", verifyToken, editUserById);
router.delete("/delete/:userId", [verifyToken, isAdmin], deleteUserById);

module.exports = router;
