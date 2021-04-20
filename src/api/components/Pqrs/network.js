const {
	getPqrs,
	createPqr,
	getPqrById,
	editPqrById,
    deletePqrById,
} = require("./controller");
const { Router } = require("express");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const router = Router();

router.get("/", verifyToken, getPqrs);
router.get("/:pqrId", verifyToken, getPqrById);
router.post("/form", verifyToken,  createPqr);
router.put("/edit/:pqrId", [verifyToken, isAdmin], editPqrById);
router.delete("/delete/:pqrId", [verifyToken, isAdmin] , deletePqrById);

module.exports = router;
