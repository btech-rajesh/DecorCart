const mongoose=require('mongoose');
const Review=require('./Review');


//schema blur-print-
const productSchema=new mongoose.Schema({

    name:{
        type:String,
        trim:true,//extra sapcing will be removed from name
        required:true
    },
    img: {
        type:String,
        trim:true,
        // default:
       
    },
    price:{
        type:Number,
        min:0,
        required:true

    } ,
    desc: {
        type:String,
        trim:true,
    },
    avgRating: {
        type:Number,
        default:0,

    },
   

    reviews:[
        //for many reviews we need array since []
        {
            //here i am store reviews id
            type:mongoose.Schema.Types.ObjectId,
            //for ref of what here review ref(mujhe id uthani h model review k s )
            ref:'Review'

        }
    ],
    //here only one author not array need so author-field seller/buyer
    author:{
        //to get id from user i need the id from it using these
        type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }

});

//middleware jo BTS(behind the seen) mongodb operations krwane pr use hota h and iske andr pre and post middleware hote h
//which r basically used over the schema and before the model

//model is js class

//here this product is pass as a id for the this middle for deleteion 
productSchema.post('findOneAndDelete',async function(product){//here post means middleware chlne k bad it is use for reviews deletion 
    //behind this middle we use this for findByIdAndUpdate()-it use a middle findOneAndDDelete/Update()

    //pre and post are the schema middle use in schema only-so here i have these in Product.js schema file
    if(product.reviews.length>0){
      await  Review.deleteMany({_id:{$in:product.reviews}})
    }
});


//Schema for the model
let Product=mongoose.model('Product',productSchema);

//to use this product i need to exports this means two js file interchage something\


module.exports=Product;

