import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    vendorController,
    expenseController,
    employeeController,
    handleVendorData,
    newSalesOrderController,
    customerController,
    handleCustomerData,
    itemController,
    handleItemData,
    currencyController,
    handleCurrencyData,
    handleDeliveryChallanData,
    deletevendor,
    handleExpenseData
} from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js"

//route object
const router = express.Router();
//routing
//register ||method Post
router.post("/register", registerController);
//LOGIN||POST
router.delete("/deletevendor/:id", deletevendor);
router.post("/login", loginController);
router.post("/addVendor", vendorController);
router.post("/addExpense", expenseController);
router.post("/addEmployee",employeeController);
router.post("/addItem", itemController);
router.post("/addCustomer", customerController);
router.post("/addCurrency", currencyController);
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
////New Sales Order 
router.post("/new-sales-order", newSalesOrderController);
//test routes
router.get("/displayvendor", handleVendorData);
router.get("/displayexpense", handleExpenseData);
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
