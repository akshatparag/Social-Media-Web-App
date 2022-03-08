module.exports.profile = function(req,res){
    return res.render('home.ejs',{
        title:"Profile"
    });
}