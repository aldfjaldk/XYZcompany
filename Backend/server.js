import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Budget from "./models/budget.js";

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


app.get("/", function (req, res) {
  res.sendFile(join(__dirname, '..', 'index.html'));
});

app.get("/hi", (req, res) => {
  res.send("<h1>Seems like this is working.</h1>")
  console.log("hi url is working.");
})

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
    const { name, email, period, description, amount, expenses } = req.body;

    // Check if all required fields are present
    if (!name || !email || !period || !amount || !description || !expenses) {
      const errorMessage = "All fields are required";
      console.error(errorMessage);
      return;
    }

    // Find existing budget document based on email
    let budget = await Budget.findOne({ email });

    if (budget) {
      // Update existing budget document
      budget.name = name;
      budget.period = period;
      budget.description = description;
      budget.amount = amount;
      budget.expense = expenses;
    } else {
      // Create new budget document
      budget = new Budget({
        name,
        email,
        period,
        description,
        amount,
        expense: expenses,
      });
    }

    // Save the budget document to the database
    await budget.save();

    // Redirect to budget.html
    res.redirect("http://localhost:5500/Budgets/budget.html");

  } catch (error) {
    console.error(error);
    console.log("Form submission failed");
    console.log("Internal server error");
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Server started ${process.env.mode} on port ${PORT}`);
});
