const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId
    },
    //this define sthe object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },

    //this field is used for defining the type of the liked object since this is a dynamic object
    onModel: {
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{timestamps:true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;