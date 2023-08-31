import { hashPassword, comparePassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import vendorsModel from "../models/vendorsModel.js";
import expensesModel from "../models/expensesModel.js";
import itemsModel from "../models/itemsModel.js";
import paymentsModel from "../models/paymentsModel.js";
import customersModel from "../models/customersModel.js";
import newsalesorderModel from "../models/newsalesorderModel.js";
import currencysModel from "../models/currencyModel.js";
import employeesModel from "../models/employeesModel.js";
import dchallan from "../models/deliverychallanModel.js";
export const registerController = async (req, res) => {

  try {
    const { name, email, company, country, job, password, confirm, phone, address, answer } = req.body

    if (!name) {
      return res.send({ message: 'Name is required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!company) {
      return res.send({ message: 'company name is required' })
    }
    if (!country) {
      return res.send({ message: 'country name is required' })
    }
    if (!job) {
      return res.send({ message: 'job is required' })
    }
    if (!password) {
      return res.send({ message: 'password is required' })
    }
    if (!confirm) {
      return res.send({ message: 'confirm password ' })
    }
    if (!phone) {
      return res.send({ message: 'phone is required' })
    }
    if (!address) {
      return res.send({ message: 'address is required' })
    }
    if (!answer) {
      return res.send({ message: 'answer is required' })
    }
    // check user
    const existingUser = await userModel.findOne({ email })
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already Registerd, please login',
      })
    }
    // register user

    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({ name, email, company, country, job, password: hashedPassword, confirm: hashedPassword, phone, address, answer }).save()
    res.status(201).send({
      success: true,
      message: "User Registered   Successfully",
      user,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Registeration',
      error,
    })

  }


};
//post login
export const loginController = async (req, res) => {
  console.log("login request posted, here is the login data:")
  console.log("email: ", req.body.email)
  console.log("pass: ", req.body.password)
  try {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password '
      })
    }
    //check user
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'email is not registered'

      })
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      })
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
    res.status(200).send({
      success: true,
      message: 'login successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        company: user.company,
        country: user.country,
        job: user.job,
        confirm: user.confirm,
        role: user.role,

      },
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    })
  }
};
//new-sales-order controller
export const deletesalesorder = async (req, res) => {
  try {
    const id = req.params.id;
    await newsalesorderModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Sales Order deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const displaySalesOrderData = async (req, res) => {
  try {
    const salesOrder = await newsalesorderModel.find();

    res.status(200).send({
      success: true,
      message: 'SalesOrder fetched successfully',
      salesOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const newSalesOrderController = async (req, res) => {
  console.log("successfully")
  try {
    const { customerName, salesOrder, referenceNumber, salesOrderDate, expectedShipmentDate, paymentTerms, deliveryMethod, customerNotes, grandTotal, salesOrderAttachment, item, quantity, rate, discount, amount, email } = req.body;
    if (!customerName) {
      return res.status(400).send({ message: 'Customer Name is required' });
    }
    if (!salesOrder) {
      return res.status(400).send({ message: 'Sales Order is required' });
    }
    if (!referenceNumber) {
      return res.status(400).send({ message: 'Reference Number is required' });
    }
    if (!salesOrderDate) {
      return res.status(400).send({ message: 'Sales Order Date is required' });
    }
    if (!expectedShipmentDate) {
      return res.status(400).send({ message: 'Shipment Date is required' });
    }
    if (!paymentTerms) {
      return res.status(400).send({ message: 'Payment Terms is required' });
    }
    if (!deliveryMethod) {
      return res.status(400).send({ message: 'Delivery Method is required' });
    }
    if (!customerNotes) {
      return res.status(400).send({ message: 'Customer Notes is required' });
    }
    if (!grandTotal) {
      return res.status(400).send({ message: 'Grand Total is required' });
    }
    if (!item) {
      return res.status(400).send({ message: 'Item is required' });
    }
    if (!quantity) {
      return res.status(400).send({ message: 'Quantity is required' });
    }
    if (!rate) {
      return res.status(400).send({ message: 'Rate is required' });
    }
    if (!discount) {
      return res.status(400).send({ message: 'Discount is required' });
    }
    if (!amount) {
      return res.status(400).send({ message: 'Amount is required' });
    }
    const newSalesOrder = {
      customerName,
      salesOrder,
      referenceNumber,
      salesOrderDate,
      expectedShipmentDate,
      paymentTerms,
      deliveryMethod,
      customerNotes,
      grandTotal,
      item,
      quantity,
      rate,
      discount,
      amount,
      email
    };

    const createdNewSalesOrder = await newsalesorderModel.create(newSalesOrder); // Save the new vendor

    console.log("New Sales Order Created:", createdNewSalesOrder);

    res.status(201).send({
      success: true,
      message: "New Sales Order Created successfully",
      order: createdNewSalesOrder
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })
  }
};

//add-expense controller

// test controller

export const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {

    comsole.log(error);
    res.send({ error });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


export const itemController = async (req, res) => {

  try {
    const { useremail, fullname, description, email, stock, hsncode, sku, unit, tax, sp, account } = req.body

    if (!fullname) {
      return res.send({ message: 'Item name is required' })
    }
    if (!description) {
      return res.send({ message: 'Description is required' })
    }
    if (!email) {
      return res.send({ message: 'email is required' })
    }
    if (!stock) {
      return res.send({ message: 'stock on hand is required' })
    }
    if (!hsncode) {
      return res.send({ message: 'HSN Code is required' })
    }
    if (!sku) {
      return res.send({ message: 'SKU is required' })
    }

    const newItem = {
      useremail,
      fullname,
      description,
      email,
      stock,
      hsncode,
      sku,
      unit,
      tax,
      sp,
      account
    };

    const createdItem = await itemsModel.create(newItem); // Save the new item

    console.log("Item added:", createdItem);

    res.status(201).send({
      success: true,
      message: "Item added successfully",
      item: createdItem
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }

};

export const handleItemData = async (req, res) => {
  try {
    const items = await itemsModel.find();

    res.status(200).send({
      success: true,
      message: 'Items fetched successfully',
      items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};



export const paymentController = async (req, res) => {

  try {
    const { useremail, paymentDate, paymentNumber, reference, vendorname, paymentMode, paymentMade, email, paidThrough} = req.body

    if (!paymentDate) {
      return res.send({ message: 'Payment Date is required' })
    }
    if (!paymentNumber) {
      return res.send({ message: 'Payment Number is required' })
    }
    if (!reference) {
      return res.send({ message: 'reference is required' })
    }
    if (!vendorname) {
      return res.send({ message: 'vendor name is required' })
    }
    if (!paymentMode) {
      return res.send({ message: 'payment mode is required' })
    }
    if (!paymentMade) {
      return res.send({ message: 'payment amount is required' })
    }
    if (!email) {
      return res.send({ message: 'email is required' })
    }

    const newPayment = {
      useremail,
      paymentDate,
      paymentNumber,
      reference,
      vendorname,
      paymentMode,
      paymentMade,
      email,
      paidThrough
    };

    const createdPayment = await Model.create(newPayment); // Save the new payment

    console.log("Payment added:", createdPayment);

    res.status(201).send({
      success: true,
      message: "Payment added successfully",
      payment: createdPayment
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }

};

export const handlePaymentData = async (req, res) => {
  try {
    const payments = await paymentsModel.find();

    res.status(200).send({
      success: true,
      message: 'Payments fetched successfully',
      payments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};





export const addpaymentController = async (req, res) => {

  try {
    const { customerName, amount, paymentdate, paymentTerms, paymentMode, deliveryMethod, taxDeducted, customerNotes, salesOrderAttachment } = req.body

    if (!customerName) {
      return res.send({ message: 'Name is required' })
    }
    if (!amount) {
      return res.send({ message: 'Amount is required' })
    }
    if (!paymentdate) {
      return res.send({ message: 'Date of payment is required' })
    }
    if (!paymentTerms) {
      return res.send({ message: 'It is required' })
    }
    if (!deliveryMethod) {
      return res.send({ message: 'Method of delivery is required' })
    }
    if (!taxDeducted) {
      return res.send({ message: 'Mention the amount of tax deducted, if so' })
    }
    if (!customerNotes) {
      return res.send({ message: 'Please give some extra note ' })
    }
    if (!salesOrderAttachment) {
      return res.send({ message: 'attach the sales order file' })
    }

    const newpayment = {
      customerNme,
      amount,
      paymentdate,
      paymentTerms,
      deliveryMethod,
      taxDeducted,
      customerNotes,
      salesOrderAttachment
    };

    const createdPayemnt = await addpaymentmodel.create(newpayment); // Save the new payment

    console.log("Payment added:", createdPayemnt);

    res.status(201).send({
      success: true,
      message: "New payment added successfully",
      newpayment: createdVendor
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }


};

export const customerController = async (req, res) => {

  try {
    const { useremail, firstname, email, companyname, workphone, receivables } = req.body

    if (!firstname) {
      return res.send({ message: 'Name is required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!companyname) {
      return res.send({ message: 'company name is required' })
    }
    if (!workphone) {
      return res.send({ message: 'phone is required' })
    }
    if (!receivables) {
      return res.send({ message: 'payables required' })
    }

    const newCustomer = {
      useremail,
      firstname,
      email,
      companyname,
      workphone,
      receivables
    };

    const createdCustomer = await customersModel.create(newCustomer); // Save the new customer

    console.log("Customer added:", createdCustomer);

    res.status(201).send({
      success: true,
      message: "Customer added successfully",
      customer: createdCustomer
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }
};


export const handleCustomerData = async (req, res) => {
  try {
    const customers = await customersModel.find();

    res.status(200).send({
      success: true,
      message: 'Customers fetched successfully',
      customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const vendorController = async (req, res) => {

  try {
    const { useremail, vendorname, email, company, phone, payables, sourceofsupply, openingbalance, paymentterms, website, GSTtreatment, tds } = req.body

    if (!vendorname) {
      return res.send({ message: 'Name is required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!company) {
      return res.send({ message: 'company name is required' })
    }
    if (!phone) {
      return res.send({ message: 'phone is required' })
    }
    if (!payables) {
      return res.send({ message: 'payables required' })
    }

    const newVendor = {
      useremail,
      vendorname,
      email,
      company,
      phone,
      payables,
      sourceofsupply,
      openingbalance,
      paymentterms,
      website,
      GSTtreatment,
      tds
    };

    const createdVendor = await vendorsModel.create(newVendor); // Save the new vendor

    console.log("Vendor added:", createdVendor);

    res.status(201).send({
      success: true,
      message: "Vendor added successfully",
      vendor: createdVendor
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }


};

export const handleVendorData = async (req, res) => {
  try {
    const vendors = await vendorsModel.find();

    res.status(200).send({
      success: true,
      message: 'Vendors fetched successfully',
      vendors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const employeeController = async (req, res) => {
  try {
    const { name, id, gender, doj, email, dob, phone, department, designation, basic, rent, conveyance, fixed, ctc } = req.body;

    // Validate the required fields
    if (!name || !id || !gender || !doj || !email || !dob || !phone || !department || !designation || !basic || !rent || !conveyance || !fixed || !ctc) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const newEmployee = {
      name,
      id,
      gender,
      doj,
      email,
      dob,
      phone,
      department,
      designation,
      basic,
      rent,
      conveyance,
      fixed,
      ctc
    };
    console.log(newEmployee.id);
    const existingEmployee = await employeesModel.findOne({ id: newEmployee.id });
    console.log(existingEmployee);
    if (existingEmployee) {
      // If an employee with the same ID exists, update the existing entry with the new values
      await employeesModel.updateOne({ id: newEmployee.id }, newEmployee);

      res.status(200).send({
        success: true,
        message: 'Employee updated successfully',
      });
    }
    else {
      // If no employee with the same ID exists, create a new entry
      const createdEmployee = await employeesModel.create(newEmployee);

      console.log("Employee added:", createdEmployee);

      res.status(201).send({
        success: true,
        message: "Employee added successfully",
        employee: createdEmployee
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const handleEmployeeData = async (req, res) => {
  try {
    const employees = await employeesModel.find();
    res.status(200).send({
      success: true,
      message: 'Employees fetched successfully',
      employees,
    });
    // console.log(createdEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const deleteemployee = async (req, res) => {
  // console.log(req);
  try {
    const id = req.params.id;
    // console.log(id);
    await employeesModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};


// export const editemployee = async (req, res) => {
//   // console.log(req);
//   try {
//     const id = req.params.id;
//     // console.log(id);
//     const updatedEmployeeData = await employeesModel.findById({_id:id});
//     // console.log(updatedEmployeeData);
//     res.status(200).json({
//       success: true,
//       message: 'Employee data retrieved successfully',
//       data: updatedEmployeeData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Error',
//       error,
//     });
//   }
// };

export const editemployee = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatedEmployeeData = await employeesModel.findById({ _id: id });
    console.log(updatedEmployeeData);
    res.status(200).json({
      success: true,
      message: 'Employee data retrieved successfully',
      data: updatedEmployeeData.toObject(), // Convert to object
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error',
      error,
    });
  }
};


export const currencyController = async (req, res) => {

  try {
    const { date, amount_to_convert, gain_or_loss, notes } = req.body

    if (!date) {
      return res.send({ message: 'Date is required' })
    }
    if (!amount_to_convert) {
      return res.send({ message: 'Amount_to_convert is required' })
    }
    if (!from) {
      return res.send({ message: 'From is required' })
    }
    if (!to) {
      return res.send({ message: 'To is required' })
    }
    if (!notes) {
      return res.send({ message: 'Notes is required' })
    }


    const newCurrency = {

      date,
      amount_to_convert,
      from,
      to,
      notes,
    };

    const createdCurrency = await currencysModelsModel.create(newCurrency);

    console.log("Currency added:", createdCurrency);

    res.status(201).send({
      success: true,
      message: "Currency added successfully",
      customer: createdCurrency
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }
};


export const handleCurrencyData = async (req, res) => {
  try {
    const currencys = await currencysModel.find();

    res.status(200).send({
      success: true,
      message: 'Currencys fetched successfully',
      Currencysr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const handleDeliveryChallanData = async (req, res) => {
  try {
    const deliveryChallans = await dchallan.find();

    res.status(200).send({
      success: true,
      message: 'DeliveryChallans fetched successfully',
      deliveryChallans,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const expenseController = async (req, res) => {

  try {
    const { useremail, eno, date, expenseaccount, amount, paidthrough, vendor, invoice, customer } = req.body
    if (!eno) {
      return res.send({ message: 'Eno. is required' })
    }
    if (!date) {
      return res.send({ message: 'Date is required' })
    }
    if (!expenseaccount) {
      return res.send({ message: 'Expense Account is required' })
    }
    if (!amount) {
      return res.send({ message: 'Amount is required' })
    }
    if (!paidthrough) {
      return res.send({ message: 'paid through is required' })
    }
    if (!vendor) {
      return res.send({ message: 'Vendor is required' })
    }
    if (!invoice) {
      return res.send({ message: 'Invoice is required' })
    }
    if (!customer) {
      return res.send({ message: 'Customer is required' })
    }



    const newExpense = {
      useremail,
      eno,
      date,
      expenseaccount,
      amount,
      paidthrough,
      vendor,
      invoice,
      customer,
    };

    const createdExpense = await expensesModel.create(newExpense);

    console.log("Expense added:", createdExpense);

    res.status(201).send({
      success: true,
      message: "Expense added successfully",
      expense: createdExpense
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    })

  }
};

export const handleExpenseData = async (req, res) => {
  try {
    const expenses = await expensesModel.find();

    res.status(200).send({
      success: true,
      message: 'Expense fetched successfully',
      expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

export const deleteexpense = async (req, res) => {
  try {
    const id = req.params.id;
    await expensesModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};
export const deletecurrency = async (req, res) => {
  try {
    const id = req.params.id;
    await currencysModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Currency deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};



export const deletevendor = async (req, res) => {
  try {
    const id = req.params.id;
    await vendorsModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Vendor deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};
export const deletecustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await customersModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};
export const deleteitem = async (req, res) => {
  try {
    const id = req.params.id;
    await itemsModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};


export const deletepayment = async (req, res) => {
  try {
    const id = req.params.id;
    await paymentsModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error',
      error,
    });
  }
};

