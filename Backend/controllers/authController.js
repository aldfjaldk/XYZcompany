import { hashPassword, comparePassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import vendorsModel from "../models/vendorsModel.js";
import itemsModel from "../models/itemsModel.js";
import customersModel from "../models/customersModel.js";
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


export const itemController = async (req, res) => {

  try {
    const { fullname, description, rate, stock, hsncode, sku } = req.body

    if (!fullname) {
      return res.send({ message: 'Item name is required' })
    }
    if (!description) {
      return res.send({ message: 'Description is required' })
    }
    if (!rate) {
      return res.send({ message: 'rate is required' })
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
      fullname,
      description,
      rate,
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
          const { firstname, customeremail, companyname, workphone, receivables } = req.body
      
          if (!firstname) {
            return res.send({ message: 'Name is required' })
          }
          if (!customeremail) {
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
      
          const newVendor = {
            
            firstname,
            customeremail,   
            companyname,   
            workphone ,
            receivables
            };
      
          const createdCustomer = await customersModelsModel.create(newCustomer); // Save the new customer
      
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