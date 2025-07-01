
const Joi = require('joi');

//here i have make schema for validation ssv
//this is step1 for step2.we make diffrent validate file

const productSchema = Joi.object({
    name: Joi.string().required(),//model ke schema ke keys-name etc ko server side p validate krega
    img:Joi.string().required(),
    price:Joi.string().min(0).required(),
    desc:Joi.string().required()

    
});
const reviewSchema = Joi.object({
    rating:Joi.string().min(0).max(5).required(),
    comment:Joi.string().required()
})


module.exports={productSchema,reviewSchema};//this is named exports 
//for default exports we use it in product


//this is schema-2. validate hone ke bad edit/add hoga\
//so 2. is here acting like a middleware so we make it




//in this we can also use for difrent server side validation for the checking email nd username and password

//with any specification by checking purpose in joi.dev