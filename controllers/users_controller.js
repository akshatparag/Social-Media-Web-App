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
    //
}

//sign in and create a session for user
module.exports.createSession = function(req,res){

}