const middlewareControllers = require("../controllers/middlewareControllers");
const subjectManagementController = require("../controllers/subjectManagementController")
const router = require("express").Router();

router.post("/createsubject", middlewareControllers.verifyTokenAndAdmin ,subjectManagementController.createSubject)
router.put("/editsubject/:id", middlewareControllers.verifyTokenAndAdmin, subjectManagementController.editSubject)
router.delete("/deletesubject/:id", middlewareControllers.verifyTokenAndAdmin, subjectManagementController.deleteSubject)
router.get("/", middlewareControllers.verifyTokenAndAdmin, subjectManagementController.getAllSubject);

module.exports = router;