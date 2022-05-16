const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.home = function(req,res){
    console.log(req.cookies);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: posts
    //     });
    // });

    //Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err)
        {
            console.log(err);
            return;
        }

        return res.render('home.ejs',{ 
            title: "Codeial | Home",
            posts: posts
        });
    })
   
};

//module.exports.actionName = function(req,res){}