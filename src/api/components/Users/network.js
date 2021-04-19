const {
	getUsers,
	getUserById,
	editUserById,
	deleteUserById,
} = require("./controller");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { verifyTokenTwoAf } = require("../../../utils/auth/twoAf");
const { Router } = require("express");
const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.put("/edit/:userId", [verifyToken, verifyTokenTwoAf], editUserById);
router.delete("/delete/:userId", [verifyToken, verifyTokenTwoAf, isAdmin], deleteUserById);

module.exports = router;
