const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product=require('./Product');



//schema blur-print-
const userSchema=new mongoose.Schema({
        //i will make schema any except username and pass
        email:{
            type:String,
            trim:true,
            require:true,
            unique: true // Ensuring unique email pSS AND EMAIL ETC
        },
        role:{
            type:String,
            required:true,
            
        },
        wishList: [
            { type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }],
        //array required for the diifrent products in carts 
      cart:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }

        ],


   

});



//this userpligin provides me all the info of plm provide me in backned
userSchema.plugin(passportLocalMongoose);
//for loginin routes



//Schema for the model User
let User=mongoose.model('User',userSchema);
//to use this review i need to exports this means two js file interchage something
module.exports=User;

