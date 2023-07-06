import { hashPassword, comparePassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
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
// test controller

export const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {

    console.log(error);
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

export const newSalesOrderController = async (req, res) => {
  console.log("successfully")
};