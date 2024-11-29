const middlewareControllers = require("../controllers/middlewareControllers");
const questionsControllers = require("../controllers/questionsControllers");
const router = require("express").Router();

router.post("/createquestion" , middlewareControllers.verifyTokenAndAdmin, questionsControllers.createQuestion);
router.delete("/deletequestion/:id", middlewareControllers.verifyTokenAndAdmin, questionsControllers.deleteQuestion);
router.put("/editquestion/:id", middlewareControllers.verifyTokenAndAdmin, questionsControllers.editQuestion);
router.get("/", middlewareControllers.verifyTokenAndAdmin, questionsControllers.getAllQuestion)
module.exports = router;

