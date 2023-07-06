import express from "express";
import { 
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    newSalesOrderController,

} from "../controllers/authController.js"
import  {requireSignIn,isAdmin} from "../middlewares/authmiddleware.js"

//route object
const router= express.Router();
//routing
//New Sales Order 
router.post("/new-sales-order", newSalesOrderController);
//register ||method Post
router.post("/register",registerController);
//LOGIN||POST
router.post("/login",loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


//test routes
router.get('/test', requireSignIn,isAdmin,testController);
//protected route user
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
//protected route admin
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});

})
export default router;