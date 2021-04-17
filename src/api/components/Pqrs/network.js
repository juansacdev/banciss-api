const {
	getPqrs,
	createPqr,
	getPqrById,
	getPqrsByUserId,
	editPqrById,
    deletePqrById,
} = require("./controller");
const { Router } = require("express");
const router = Router();

router.get("/", getPqrs);
router.get("/:pqrId", getPqrById);
router.get("/:userId", getPqrsByUserId);
router.post("/form", createPqr);
router.put("/edit/:pqrId", editPqrById);
router.delete("/delete/:pqrId", deletePqrById);

module.exports = router;
