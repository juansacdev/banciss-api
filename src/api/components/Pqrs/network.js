const {
	getPqrs,
	createPqr,
	getPqrById,
	editPqrById,
    deletePqrById,
} = require("./controller");
const { Router } = require("express");
const { verifyToken, isAdmin } = require("../../../utils/auth/authoJwt");
const { verifyTokenTwoAf } = require("../../../utils/auth/twoAf");
const router = Router();

router.get("/", getPqrs);
router.get("/:pqrId", getPqrById);
router.post("/form", [verifyToken, verifyTokenTwoAf], createPqr);
router.put("/edit/:pqrId", [verifyToken, verifyTokenTwoAf, isAdmin], editPqrById);
router.delete("/delete/:pqrId", [verifyToken, verifyTokenTwoAf, isAdmin] , deletePqrById);

module.exports = router;
