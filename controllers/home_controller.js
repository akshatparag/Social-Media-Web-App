module.exports.home = function(req,res){
    console.log(req.cookies);
    return res.render('home.ejs',{
        title:"Home"
    });
};

//module.exports.actionName = function(req,res){}