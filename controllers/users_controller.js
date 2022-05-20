const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("../models/user");
const fs = require("fs");
const path = require('path');
const otpMailer = require("../mailers/otp_mailer");
const { redirect } = require("express/lib/response");

// let's keep it same as before
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  //     if(req.user.id == req.params.id){
  //         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
  //             return res.redirect('back');
  //         });
  //     }else{
  //         return res.status(401).send('Unauthorized');
  //     }
  // }

  if (req.user.id == req.params.id) {
   try{
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err)
            {
                console.log('*****MULTER ERROR:',err)
            }
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                if(user.avatar)
                {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                //this is saving the path if the uploaded file into avatarb field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename
            }
            user.save();
            return res.redirect('back');
        });

   } catch(err){
       req.flash('error',err);
      return res.redirect("back");
    }
  } 
  
  else {
    req.flash('error','Unauthorized');
    return res.status(401).send('Unauthorized');
  }
}

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "Logged out Successfully");
  return res.redirect("/");
};

module.exports.forgotPassword = function(req,res){
  return res.render("forgot_password",{
    title:"Forgot Password | Codeial"
  });
};

let otp;
console.log("Hello");

module.exports.resetPassword = function(req,res){
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
        return res.redirect("/users/sign-in");
    }
     else {
        otp = Math.floor(Math.random() * 100);
        otpMailer.newOTP(otp,req.body.email);
        return res.render("verification.ejs",{
        title:"Verification | Codeial"
      });
    }
  });
};

module.exports.verify = function(req,res){
    if(req.body.otp == otp)
    {
      // console.log(req.body.otp);
      // console.log(otp);
        return res.render("change_password.ejs",{
          title:"Change Password | Codeial"
        });
    }

      return res.render("verification.ejs",{
        title:"Verification | Codeial"
    });
};

module.exports.changePassword = function(req,res){
      if(req.body.password!=req.body.repassword)
      {
        alert('Password dont match');
        return;
      }
      else
      {
        User.findOneAndUpdate({ "email": req.body.email },{
          $set: {
              "password": req.body.password
          }
       }, { new: true }, (err, doc) => {
          if (!err) { 

              res.redirect('/users/sign-in'); 
          }
          else {
              console.log('Error during record update : ' + err);
          }
       });
      }
};