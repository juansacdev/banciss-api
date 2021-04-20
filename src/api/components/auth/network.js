const { signup, signin, twoAf } = require("./controller");
const { Router } = require("express");
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/twoAf", twoAf);

module.exports = router;