const mongoose=require('mongoose');


var userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    imgUrl:{
     type:String,
     
    }
})
const UserModal = mongoose.model('UserModal',userSchema);
module.exports = UserModal;


