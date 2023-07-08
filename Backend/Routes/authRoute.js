import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    vendorController,
    handleVendorData,
    customerController,
    handleCustomerData,
    newSalesOrderController
} from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js"

//route object
const router = express.Router();
//routing
//register ||method Post
router.post("/register", registerController);
//LOGIN||POST
router.post("/login", loginController);
router.post("/addVendor", vendorController);
router.post("/addCustomer", customerController);
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
////New Sales Order 
router.post("/new-sales-order", newSalesOrderController);
//test routes
router.get("/displaycustomer", handleCustomerData);
router.get("/displayvendor", handleVendorData);
router.get('/test', requireSignIn, isAdmin, testController);
//protected route user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//protected route admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });

})
export default router;