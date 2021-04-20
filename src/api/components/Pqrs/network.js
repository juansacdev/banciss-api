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

router.get("/", getPqrs);
router.get("/:pqrId", getPqrById);
router.post("/form", verifyToken,  createPqr);
router.put("/edit/:pqrId", [verifyToken, isAdmin], editPqrById);
router.delete("/delete/:pqrId", [verifyToken, isAdmin] , deletePqrById);

module.exports = router;
