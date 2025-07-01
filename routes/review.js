
const express=require('express');
const router=express.Router();//mini intance to use routers in place of app
const Product=require('../models/Product');
const Review=require('../models/Review');

const {validateReview,isLoggedIn}=require('../middleware');


// To post a review
router.post('/products/:id/review',validateReview,isLoggedIn,async(req, res) => {

    // console.log('Product ID:', req.params.id);
    // console.log('Form Data:', req.body);
    // res.send('req review');
try{
    let {id}=req.params;
    let{rating,comment}=req.body

   const product=await Product.findById(id);//here review is populate and//here product is find 
   //now we make a review for product using model or js fun
   const review=new Review({rating,comment});

   //in product uske ander array m push for review add krne k liye
   product.reviews.push(review);
   await review.save();
   await product.save();
   req.flash('success','Review Added succefully');//flash is made using req ke obj ke sath mess,mess desc
   //to show this msg on particular producst i need to pass this as a obj to show form so route-products-pro/show m use flash('msg)
   res.redirect(`/products/${id}`);
}
catch(e){
   res.status(500).render('error',{err : e.message});
}


})








module.exports=router;// to use this in mainfile i.err app.js uske bad sb m jata h
