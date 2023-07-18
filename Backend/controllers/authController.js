import { hashPassword, comparePassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import vendorsModel from "../models/vendorsModel.js";
import expensesModel from "../models/expensesModel.js";
import itemsModel from "../models/itemsModel.js";
import customersModel from "../models/customersModel.js";
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
export const newSalesOrderController = async (req, res) => {
  console.log("Backend received the new-sales-order request")
  res.status(200);
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
    const { useremail,fullname, description, email, stock, hsncode, sku } = req.body

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
      sku
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



export const addpaymentController =async(req,res)=>{

      try{
          const {customerName,amount,paymentdate,paymentTerms,paymentMode,deliveryMethod,taxDeducted,customerNotes,salesOrderAttachment}=req.body
  
          if(!customerName){
              return res.send({message:'Name is required'})
          }
          if(!amount){
              return res.send({message:'Amount is required'})
          }
          if(!paymentdate){
              return res.send({message:'Date of payment is required'})
          }
          if(!paymentTerms){
              return res.send({message:'It is required'})
          }
          if(!deliveryMethod){
              return res.send({message:'Method of delivery is required'})
          }
          if(!taxDeducted){
              return res.send({message:'Mention the amount of tax deducted, if so'})
          }
          if(!customerNotes){
              return res.send({message:'Please give some extra note '})
          }
          if(!salesOrderAttachment){
              return res.send({message:'attach the sales order file'})
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
  
      }catch(error){
          console.log(error)
          res.status(500).send({
              success:false,
              message:'Error',
              error,
          })
  
      }
  
  
      };

      export const customerController = async (req, res) => {

        try {
          const { useremail,firstname, email, companyname, workphone, receivables } = req.body
      
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
            workphone ,
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
    const { useremail, vendorname, email, company, phone, payables } = req.body

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
      payables
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
    const { name, id, gender, doj, email, dob, phone, department, designation, basic, rent, conveyance, fixed, ctc } = req.body

    if (!name) {
      return res.send({ message: 'Name is required' })
    }
    if (!id) {
      return res.send({ message: 'Id is required' })
    }
    if (!gender) {
      return res.send({ message: 'Gender is required' })
    }
    if (!doj) {
      return res.send({ message: 'Date of joining is required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!dob) {
      return res.send({ message: 'Date of birth required' })
    }
    if (!phone) {
      return res.send({ message: 'Phone number is required' })
    }
    if (!department) {
      return res.send({ message: 'Department is required' })
    }
    if (!designation) {
      return res.send({ message: 'Designation is required' })
    }
    if (!basic) {
      return res.send({ message: 'Basic pay is required' })
    }
    if (!rent) {
      return res.send({ message: 'House Rent is required' })
    }
    if (!conveyance) {
      return res.send({ message: 'Conveyance is required' })
    }
    if (!fixed) {
      return res.send({ message: 'Fixed Allowance is required' })
    }
    if (!ctc) {
      return res.send({ message: 'CTC is required' })
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

    const createdEmployee = await employeesModel.create(newEmployee); // Save the new vendor

    console.log("Employee added:", createdEmployee);

    res.status(201).send({
      success: true,
      message: "Employee added successfully",
      employee: createdEmployee
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

export const currencyController = async (req, res) => {

  try {
    const {date, amount_to_convert, gain_or_loss, notes} = req.body

    if (!date) {
      return res.send({ message: 'Date is required' })
    }
    if (!amount_to_convert) {
      return res.send({ message: 'Amount_to_convert is required' })
    }
    if (!gain_or_loss) {
      return res.send({ message: 'Gain_or_loss is required' })
    }
    if (!notes) {
      return res.send({ message: 'Notes is required' })
    }
   

    const newVendor = {
      
      date,
      amount_to_convert,   
      gain_or_loss,   
      notes ,
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
    const { useremail,eno, date, expenseaccount, amount, paidthrough,vendor,invoice, customer} = req.body
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

export const editvendordata = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Assuming the request body contains the updated vendor data

    // Check if the vendor with the provided ID exists
    const existingVendor = await vendorsModel.findById(id);
    if (!existingVendor) {
      return res.status(404).send({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Update the vendor data
    const updatedVendor = await vendorsModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated data
    });

    res.status(200).send({
      success: true,
      message: 'Vendor updated successfully',
      vendor: updatedVendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error updating vendor',
      error,
    });
  }
};

export const VendorDataByID = async (req, res) => {
  try {
    const vendorId = req.params.id;

    // Fetch the vendor data with the provided ID from the database
    const vendor = await vendorsModel.findById(vendorId);

    // If the vendor is not found, return a 404 status
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Return the vendor data as a JSON response
    res.status(200).json({
      success: true,
      message: 'Vendor found successfully',
      vendor: vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error finding vendor',
      error,
    });
  }
};
