const { application } = require("express");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');
const JWT_SECRET = 'deepakisagoodboy';
var jwt = require('jsonwebtoken');
var getuser=require("../middleware/getuser");
let success=false;

//route 1: create a user using post /api/auth/createuser no login required
router.post(
  "/createuser",
  [
    body("email","enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {

    //if there are error return the errors encountered
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ errors: errors.array() });
    }

    const salt =await bcrypt.genSaltSync(10);
    const secpass=await bcrypt.hash(req.body.password, salt);
    //check whether the user already exists or not
    try
    {
    let user= await User.findOne({email:req.body.email})  //its gives user which has same mail
    if(user)
    { 
      success=false;
      return res.status(400).json({success:{success},error:"A user with same mail already exits"});
    }
    user= await User.create({
        name: req.body.name,
        password: secpass,
        email:req.body.email
      })
      
      // .then(user => res.json(user))
      // .catch(err=>console.log(err))
      const data={
        user:{
          id:user.id
        }
      }
      const token =jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,token})
    }catch(error)
    {
      success=false;
      console.error(error.message);
      res.status(500).send(success,"Internal server occured");
    }
  }
);


//route 2: authentication a user using post /api/auth/login no login required
router.post(
  "/login",
  [
    body("email","enter a valid email").isEmail(),
    body("password","password cannot be blank").exists(),

  ],
  async (req, res) => {
    
     //if there are error return the errors encountered
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       success=false;
       return res.status(400).json({success,errors: errors.array() });
     }
     
     const {email,password}=req.body;
     try{
      let user=await User.findOne({email});
      if(!user)
      {
        success=false;
        return res.status(400).json({success,error:"Please try to login with proper credentials!"});
      }

      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare)
      {
        success=false;
        return res.status(400).json({success,error:"Please try to login with proper credentials!"});
      }

      const data={
        user:{
          id:user.id
        }
      }

      const authToken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authToken});


     }
     catch(error)
     {
       success=false;
      console.error(error.message);
      res.status(500).send(success,"Internal server occured");
     }
  }
);


//route 3: get loginned user details using post /api/auth/getuser login required
  router.post(
    "/getuser",getuser,
    async (req, res) => {
    try{
      userid=req.user.id;
      const user=await User.findById(userid).select("-password");
      success=true;
      res.send({success,user});
    }
    catch(error)
    {
      success=false;
      console.error(error.message);
      res.status(500).send(success,"Internal server occured");
    }
    }
    );

module.exports = router;
