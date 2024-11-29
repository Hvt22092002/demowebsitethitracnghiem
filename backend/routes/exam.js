const examControllers = require("../controllers/examControllers");
const middlewareControllers = require("../controllers/middlewareControllers");
const router = require("express").Router();

router.post("/create" , middlewareControllers.verifyTokenAndAdmin, examControllers.createExam);
router.put("/edit/:id", middlewareControllers.verifyTokenAndAdmin, examControllers.editExam);
router.delete("/delete/:id", middlewareControllers.verifyTokenAndAdmin, examControllers.deleteExam);
router.get("/examuser", middlewareControllers.verifyToken, examControllers.getExamUser);
router.get("/", middlewareControllers.verifyTokenAndAdmin, examControllers.getExamAdmin);

module.exports = router;
