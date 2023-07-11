import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    vendorController,
    employeeController,
    handleVendorData,
    newSalesOrderController,
    customerController,
    handleCustomerData,
    itemController,
    handleItemData,
    currencyController,
    handleCurrencyData,
    deliveryChallanController,
    AddExpensesController,
    handleDeliveryChallanData
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
router.post("/addEmployee",employeeController);
router.post("/addItem", itemController);
router.post("/addCustomer", customerController);
router.post("/addCurrency", currencyController);
router.post("/addDeliveryChallan", deliveryChallanController);
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
////New Sales Order 
router.post("/new-sales-order", newSalesOrderController);

router.post("/add-expenses", AddExpensesController);

//test routes
router.get("/displayvendor", handleVendorData);
router.get("/displaycustomer", handleCustomerData);
router.get("/displayitem", handleItemData);
router.get("/displaycurrency", handleCurrencyData);
router.get("/displayDeliveryChallan", handleDeliveryChallanData);
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
