const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");
// const session = require("express-session");
const config = require("../config/config");




exports.securePassword = async(password)=>{
    try {

        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        console.log(error);
        
    }
}


exports.loadRegister = async(req,res)=>{
    try {
        //const data = await user.find({});
        res.render("registeration");

    } catch (error) {
        console.log(error);
        
    }
}


exports.insertUser = async(req,res)=>{
    try {

        const spassword = await this.securePassword(req.body.password);
        
        let file = req.files[0];
        console.log(file)
        const randomNumber = (Math.floor(100000 + Math.random() * 900000));
        
        const User = new user({
            name: req.body.name,
            email: req.body.email,
            image: file.filename,
            password:spassword,
            //"image" : file.filename,
            "fileupload_id" : randomNumber,
            is_admin:0

        });
        const userData =await User.save();
   
        console.log(userData);

if (userData) {
    



    res.render('registeration',{message:"success"});
} else {
    res.render('registeration',{message:"failed"});

}

    } catch (error) {
        console.log(error.message);
        
    }
}




// Login Fuction //

exports.loginload = async(req,res)=>{

    try {
        res.render("login");
    } catch (error) {
        console.log(error.message);
    }
}


exports.loadhome = async(req,res)=>{

    try {

     const userData = await user.findById({_id:req.session.user_id});
        res.render("home",{user:userData});
    } catch (error) {
        console.log(error.message);
    }
}




exports.verifylogin = async(req,res)=>{

    try {

        const email = req.body.email;
        //console.log(email);
        const password = req.body.password;
        //console.log(password);

      const userData = await user.findOne({email:email});
      //console.log(userData);

      if (userData) {

        
  const passwordMatch = await bcrypt.compare(password,userData.password);
  //console.log(passwordMatch);

  if (passwordMatch) {

    if (userData.is_varified === 1) {
        console.log(userData.is_varified === 1);
        res.render("login",{message:"Please verify your mail"});

    } else {

        req.session.user_id = userData._id;
        res.redirect("home");
    }
  }
   else {
    res.render("login",{message:"email password inncorrect"});

    
  }
     
}
 else {
        res.render("login",{message:"email password inncorrect"});

      }


} catch (error) {
        console.log(error.message);
    }
}

// Login Fuction //

exports.userLogout = async(req,res)=>{

    try {
        
        req.session.destroy();

        res.redirect("login");
    } catch (error) {
        console.log(error.message);

        
    }
}




// user Edit & Update //

exports.editload = async(req,res)=>{

    try {

      const id = req.query.id;
      const userData =await user.findById({_id:id});
      //console.log(userData);
      
      if (userData) {
       
        res.render("edituser",{user:userData});

      } else {

        res.redirect("/home");

        
      }

    } catch (error) {
        console.log(error.message);
    }
}


exports.updateProfile =  async(req,res)=>{
    
try {
  
    if (req.file) {

            const _id  = req.body.user_id;
            console.log(_id);
            const userData = await user.findByIdAndUpdate(
                {_id:req.body.user_id} ,
                {$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile,image:req.file.filename} });   
            console.log(userData);        
        
        }
     else 
     {

        // const _id  = req.body.user_id;
        // console.log(_id);
        const userData = await user.findByIdAndUpdate({_id:req.body.user_id },{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile} }); 
        console.log(userData);
    }

    res.redirect("/user/home");

    }
    catch (error)
    {
        console.log(error.message);
    }
}

// user Edit & Update //


// user Delete //

exports.deleteUser = async(req,res)=>{

    try {
        
        const userData  = await user.findByIdAndDelete({_id:req.params.id});
        //res.send(userData);
        res.redirect("/user/list");

        console.log(userData);
    } catch (error) {
        
        console.log(error.message);
    }
}

// user Delete //




// All User List //

exports.UserList = async(req,res)=>{

    try {
                
        const data = await user.find({});
        res.render("userlist",{data:data});
       // console.log(data);

    } catch (error) {
        console.log(error.message);
    }
}

// All User List //

// download File //

exports.download = async(req,res)=>{

    try {
        user.find({fileupload_id : req.params.fileupload_id},(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
              var x =__dirname+'/public/user_Images'+data[0].image;
                res.download(x);
            }
       })
    } catch (error) {
        console.log(error.message);
    }
}

// download File //
