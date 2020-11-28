const {Router}  = require("express");
const userController = require("../controllers/userController.js");
const userRouter = Router();
 
userRouter.get("/certificates", userController.getCerts);
userRouter.get("/applications", userController.getApps);
userRouter.get("/", userController.getUser)

userRouter.post("/applications", userController.postApps);
 
module.exports = userRouter;