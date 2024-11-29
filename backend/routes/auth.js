const authControllers = require("../controllers/authControllers");

const router = require("express").Router();


router.post("/login" , authControllers.login);

router.post("/refresh" , authControllers.requestRefreshToken);

router.post("/logout" , authControllers.logOut)

module.exports = router;