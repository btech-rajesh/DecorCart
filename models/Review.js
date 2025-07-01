const mongoose=require('mongoose');


//schema blue-print-
const reviewSchema=new mongoose.Schema({

    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    },

},{timestamps:true});


//Schema for the model
let Review=mongoose.model('Review',reviewSchema);

//to use this review i need to exports this means two js file interchage something\


module.exports=Review;

