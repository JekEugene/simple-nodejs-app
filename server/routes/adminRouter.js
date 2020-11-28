const {Router} = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = Router();
 
adminRouter.post("/check", adminController.postCheck); 
adminRouter.get("/", adminController.getApplications);

module.exports = adminRouter;