const { signup, signin,getSignin } = require("./controller");
const { Router } = require("express");
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signin", getSignin);

module.exports = router;