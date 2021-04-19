const { signup, signin } = require("./controller");
const { Router } = require("express");
const router = Router();

router.get("/signup", signup);
router.get("/signin", signin);

module.exports = router;