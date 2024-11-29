const middlewareControllers = require("../controllers/middlewareControllers");
const usersControllers = require("../controllers/usersControllers");


const router = require("express").Router();


router.post("/addlistuser" , middlewareControllers.verifyTokenAndAdmin, usersControllers.addListUser);
router.post("/adduser", middlewareControllers.verifyTokenAndAdmin, usersControllers.addUser);
router.delete("/delete/:id" , middlewareControllers.verifyTokenAndAdmin,usersControllers.deleteUser);
router.put("/edit/:id" , middlewareControllers.verifyTokenAndAdmin, usersControllers.editUser);
router.get("/", middlewareControllers.verifyTokenAndAdmin,usersControllers.getAllUsers);
router.post("/editpassuser" , middlewareControllers.verifyToken , usersControllers.editPassWordUser)


module.exports = router;