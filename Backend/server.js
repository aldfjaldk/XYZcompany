import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Dashboard from "./models/dashboardModel.js";
import PayrollDashboard from "./models/payrolldashboardModel.js";
import Newprs from "./models/paymentreceivedModel.js" ; 
import newexpenses from "./models/expensesModel.js";
import Budget from "./models/budget.js";
import Payment from "./models/newpayment.js";
import Billspage from "./models/billl.js";
import session from 'express-session';
import dchallan from "./models/deliverychallanModel.js";
import OAuth2Client from 'google-auth-library';
import invoice from "./models/invoiceModel.js";
import mongodb from "mongodb";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use("/api/v1/auth", authRoute)
app.use(express.static(join(__dirname, '..', 'Home')));
app.use(express.static(join(__dirname, '..', 'Budgets')));

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
     secure: true, // Cookie sent only over HTTPS
    sameSite: 'none' // For cross-origin cookies
  }
}));

 //'mongodb+srv://adarsh-adarsh:Text1234@cluster0.p7x9hyf.mongodb.net/?retryWrites=true&w=majority';
// var MongoClient = mongodb.MongoClient;
// var mongoUrl='mongodb+srv://adarsh-adarsh:Text1234@cluster0.p7x9hyf.mongodb.net/?retryWrites=true&w=majority';
// var db;
//  var secret =process.env.GOOGLE_CLIENT_SECRET;





  
//   async function verify(client ,token){
//     const ticket = await client.verifyIdToken({
//       idToken:token,
//       audience:process.env.GOOGLE_CLIENT_ID,

//     });
//     return ticket.getPayload();
    
//   }
 

//   app.get('/gauthenticate', async(req,res)=>{
//     var token= req.query.id_token;
//     const client = OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//     var x= await verify(client,token).catch(console.error);
//      res.send(x);
//     if(x.email_verified){
//       db.collection('users').find({email : x.email}).toArray((err,result)=>{
//         if(err) throw(err);
//         if(result.length<1){
//           db.collection('users').insert([{
//             name:x.name,
//             email:x.email,
//             password:bcrypt.hashSync(x.at_hash,8)

//           }])
//           db.collection('users').find({email:x.email}).toArray((e,r)=>{
//             if(e) throw e;
//             var tkn = JWT.sign({id:result[0]._id},secret);
//             res.send({
//               auth:true,
//               token:tkn
//             })
//           })

//         }else{
//           var token =JWT.sign({id:result[0]._id},secret);
//           res.send({
//             auth:true,
//             token:token
//           })

//         }
//       })
//     } else{
//       res.send({
//         auth:false,
//         message: "User unauthorized"
//       })
//     }
//   })

//   MongoClient.connect(mongoUrl,(err,client)=>{
//     if(err) console.log("Error while connecting")
//     else db= client.db('pandm');
//   })


app.get("/", function (req, res) {
  res.sendFile(join(__dirname, '..', 'index.html'));
});

app.get("/hi", (req, res) => {
  res.send("<h1>Seems like this is working.</h1>")
  console.log("hi url is working.");
})

app.post("/api/dashboard", async (req, res) => {
  try {
    const { email } = req.body;

    const incomeSize = 7;

    const randomIncome = Array.from({ length: incomeSize }, () => Math.floor(Math.random() * 1000));
    const randomExpense = Array.from({ length: incomeSize }, () => Math.floor(Math.random() * 500));

    const income = randomIncome;
    const expenseArr = randomExpense.map((expense, index) => Math.min(expense, income[index]));

    const dashboardData = {
      email: email,
      income: income,
      amountToPay: 500,
      amountToReceive: 500,
      currentBalance: 500,
      overDue: 100,
      expenses: 200,
      followers: 300,
      projects: 400,
      records: 500,
      expenseArr: expenseArr
    };

    const existingDashboard = await Dashboard.findOne({ email });

    if (existingDashboard) {
      const updatedDashboard = await Dashboard.findOneAndUpdate({ email }, dashboardData, { new: true });
      res.json(updatedDashboard);
    } else {
      const newDashboard = new Dashboard(dashboardData);
      const savedDashboard = await newDashboard.save();
      res.json(savedDashboard);
    }
  } catch (error) {
    console.error('Error updating or fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Budgets/budget.html', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post("/budget-submit-form", async (req, res) => {
  try {
    console.log(req.body);
    const { name, period, description, amount, expenses, user } = req.body;

    // Check if all required fields are present
    if (!name || !period || !amount || !description || !expenses) {
      const errorMessage = "All fields are required";
      console.error(errorMessage);
      return;
    }

    // Find existing budget document based on name and user
    let budget = await Budget.findOne({ name, user });
    console.log(budget)
    if (budget) {
      // Update existing budget document
      budget.period = period;
      budget.description = description;
      budget.amount = amount;
      budget.expense = expenses;
    } else {
      // Create new budget document
      budget = new Budget({
        name,
        period,
        description,
        amount,
        user,
        expense: expenses,
      });
    }

    // Save the budget document to the database
    await budget.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


app.delete("/api/v1/budgets/:id", async (req, res) => {
  try {
    const budgetId = req.params.id;
    
    // Delete the budget document from the database
    await Budget.findByIdAndDelete(budgetId);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


app.delete("/api/v1/deleteDeliveryChallan/:id", async (req, res) => {
  try {
    const challanId = req.params.id;
    
    // Delete the budget document from the database
    await dchallan.findByIdAndDelete(challanId);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/api/v1/deletebill/:id", async (req, res) => {
  try {
    const billId = req.params.id;
    
    // Delete the budget document from the database
    await Billspage.findByIdAndDelete(billId);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/api/v1/deleteinvoice/:id", async (req, res) => {
  try {
    const challanId = req.params.id;

    // Delete the budget document from the database
    await invoice.findByIdAndDelete(challanId);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


app.get("/api/v1/budgets/:id", async (req, res) => {
  try {
    const budgetId = req.params.id;
    
    const budgets = await Budget.findById(budgetId);
    
    
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/v1/dischallan/:id", async (req, res) => {
  console.log("pepega")
  try {
    const budgetId = req.params.id;
    
    const budgets = await dchallan.findById(budgetId);
    
    
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/v1/invoice/:id", async (req, res) => {
  console.log("pepega")
  try {
    const budgetId = req.params.id;

    const budgets = await invoice.findById(budgetId);


    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


app.post("/api/salesReport" , async(req , res) => {
  try{
    const { email } = req.body; 
    const salesData = await Newprs.find({ useremail: email });
    res.json(salesData);    
  }catch (error) {
    console.error('Error updating or fetching sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/api/purchasesReport" , async(req , res) => {
  try{
    const { email } = req.body;
    const purchasesData = await newexpenses.find({ useremail: email });
    res.json(purchasesData);  
  }catch (error) {
    console.error('Error updating or fetching purchases data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Server started ${process.env.mode} on port ${PORT}`);
});

app.get('/Payments Recieved/PaymentRecieved.html', async (req,res)=> {
  try{
    const paymnet=await Payment.find();
    res.status(200).json(payment);
  } catch (error){
    console.log(error);
    res.status(500).send('Server Error');
  }
});

app.post("/payment-form",async (req,res)=>{
  try{
    console.log(req.body);
    const{customerName,amount,paymentdate,paymentMode,deliveryMethod,taxdeducted,customerNotes,transactionid}=req.body;
    let payment=await Payment.findOne({customerName,amount});

    payemnt=new Payment({
      customerName,
      amount,
      paymentdate,
      paymentMode,
      deliveryMethod,
      taxdeducted,
      customerNotes,
      transactionid
    });
    await payment.submit();
  } catch(error){
    console.error(error);
    console.log("Submission Failed");
    console.log("Server Error");

    return res
      .status(500)
      .json({success: false,error: "Server Error"});
  }

});
app.post("/challan-submit-form", async (req, res) => {
  console.log(req.body)
  try {
    const { customerName, deliveryChallan, referenceNumber, deliveryChallanDate,challanType, warehouseName ,items, subTotal,user_email} = req.body;

    if (!customerName || !deliveryChallan || !referenceNumber || !deliveryChallanDate ||!challanType || !warehouseName) {
      const errorMessage = "All fields are required";
      console.error(errorMessage);
      return;
    }

    // Find existing budget document based on name
    let Challan = await dchallan.findOne({deliveryChallan,user_email});

    if (Challan) {
          // Check if all required fields are present
      const biggerArray = items.map(item => Object.values(item));
      // Update existing budget document
      Challan.customerName = customerName;
      Challan.referenceNumber = referenceNumber;
      Challan.deliveryChallanDate = deliveryChallanDate;
      Challan.warehouseName = warehouseName;
      Challan.items = biggerArray;
      Challan.subTotal = subTotal;
      

      
    } else {
      // Create new budget document
      Challan = new dchallan({
        customerName,
        deliveryChallan,
        referenceNumber,
        deliveryChallanDate,
        challanType,
        warehouseName,
        items,
        subTotal,user_email
      });
    }

    // Save the budget document to the database
    await Challan.save();

  } catch (error) {
    console.error(error);
    console.log("Form submission failed");
    console.log("Internal server error");
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

app.post("/invoice-submit-form", async (req, res) => {
  console.log(req.body)
  try {
    const { customerName, deliveryChallan, referenceNumber, deliveryChallanDate, challanType, warehouseName, items, subTotal, user_email } = req.body;

    if (!customerName || !deliveryChallan || !referenceNumber || !deliveryChallanDate || !challanType || !warehouseName) {
      const errorMessage = "All fields are required";
      console.error(errorMessage);
      return;
    }

    // Find existing budget document based on name
    let Challan = await invoice.findOne({ deliveryChallan, user_email });

    if (Challan) {
      // Check if all required fields are present
      const biggerArray = items.map(item => Object.values(item));
      // Update existing budget document
      Challan.customerName = customerName;
      Challan.referenceNumber = referenceNumber;
      Challan.deliveryChallanDate = deliveryChallanDate;
      Challan.warehouseName = warehouseName;
      Challan.items = biggerArray;
      Challan.subTotal = subTotal;



    } else {
      // Create new budget document
      Challan = new invoice({
        customerName,
        deliveryChallan,
        referenceNumber,
        deliveryChallanDate,
        challanType,
        warehouseName,
        items,
        subTotal, user_email
      });
    }

    // Save the budget document to the database
    await Challan.save();

  } catch (error) {
    console.error(error);
    console.log("Form submission failed");
    console.log("Internal server error");
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});


app.post("/api/payrolldashboard", async (req, res) => {
  try {
    const { email } = req.body;

    const totalCostSize = 4;

    const randomTotalCost = Array.from({ length: totalCostSize }, () => Math.floor(Math.random() * 100000));
    const totalCostArr = randomTotalCost;

    const payrolldashboardData = {
      email: email,
      epfAmount: 15257,
      esiAmount: 7693,
      tdsAmount: 13039,
      activeEmployeesCount: 7,
      totalCostArr: totalCostArr
    };

    const existingPayrollDashboard = await PayrollDashboard.findOne({ email });

    if (existingPayrollDashboard) {
      const updatedPayrollDashboard = await PayrollDashboard.findOneAndUpdate({ email }, payrolldashboardData, { new: true });
      res.json(updatedPayrollDashboard);
    } else {
      const newPayrollDashboard = new PayrollDashboard(payrolldashboardData);
      const savedPayrollDashboard = await newPayrollDashboard.save();
      res.json(savedPayrollDashboard);
    }
  } catch (error) {
    console.error('Error updating or fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.post("/bill-submit-form", async (req, res) => {
  console.log(req.body)
  try {
    const { VendorName, billNumber, order, billDate,duedate, terms, reference ,items, subTotalInput, grandInput,user_email, discountPercentage, taxDropdown} = req.body;

    if (!VendorName || !billNumber || !order || !billDate ||!duedate || !terms || !reference || !items || !subTotalInput || !grandInput) {
      const errorMessage = "All fields are required";
      console.error(errorMessage);
      return;
    }

    // Find existing budget document based on name
    let bill = await Billspage.findOne({billNumber,user_email});

    if (bill) {
          // Check if all required fields are present
      const biggerArray = items.map(item => Object.values(item));
      // Update existing budget document
      bill.VendorName = VendorName;
      bill.order = order;
      bill.billDate = billDate;
      bill.duedate = duedate;
      bill.terms = terms;
      bill.reference = reference;
      bill.subTotalInput = subTotalInput
      bill.grandInput = grandInput
      bill.items = biggerArray;
      bill.discountPercentage = discountPercentage;
      bill.taxDropdown = taxDropdown;
      

      
    } else {
      // Create new budget document
     bill = new Billspage({
        VendorName, billNumber, order, billDate,duedate, terms, reference ,items, subTotalInput, grandInput,user_email,discountPercentage, taxDropdown
      });
    }

    // Save the budget document to the database
    await bill.save();

  } catch (error) {
    console.error(error);
    console.log("Form submission failed");
    console.log("Internal server error");
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});


app.get('/Bills/bill.html', async (req, res) => {
  try {
    const bills = await Billspage.find();
    console.log(bills);
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});



app.get("/api/v1/dbill/:id", async (req, res) => {
  console.log("pepega")
  try {
    const billId = req.params.id;
    
    const bills = await Billspage.findById(billId);
    
    
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
