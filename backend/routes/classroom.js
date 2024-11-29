const middlewareControllers = require("../controllers/middlewareControllers");
const classroomController = require("../controllers/classroomController")
const router = require("express").Router();


router.get("/", middlewareControllers.verifyTokenAndAdmin, classroomController.classList);
router.post("/createclass", middlewareControllers.verifyTokenAndAdmin, classroomController.createClass);
router.put("/editclass/:id", middlewareControllers.verifyTokenAndAdmin, classroomController.editClass);
router.delete("/delete/:id", middlewareControllers.verifyTokenAndAdmin, classroomController.deleteClass);

module.exports = router;