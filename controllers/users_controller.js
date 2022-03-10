const User = require('../models/user')

//renders user profile page
module.exports.profile = function(req,res){
    return res.render('user_profile.ejs',{
        title:"Profile"
    });
};

//renders sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//renders sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign in"
    })
}

//get signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('Error in finding user');return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finding user in signing up');return;}
                console.log("Created");
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for user
module.exports.createSession = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in signing up');return;}

        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id',user_id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    })
};