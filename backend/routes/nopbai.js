const nopbaiControllers = require("../controllers/nopbaiControllers");
const middlewareControllers = require("../controllers/middlewareControllers");
const router = require("express").Router();

router.post("/create" , middlewareControllers.verifyToken, nopbaiControllers.createNopbai);

router.get("/getnopbai" , middlewareControllers.verifyToken, nopbaiControllers.getBaiThiUser);
router.get("/getadmin/:id" , middlewareControllers.verifyTokenAndAdmin, nopbaiControllers.getBaiThiAdmin);
router.get("/" , middlewareControllers.verifyTokenAndAdmin, nopbaiControllers.getAllScoredExams);

module.exports = router;