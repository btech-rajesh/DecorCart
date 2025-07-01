const{productSchema,reviewSchema}=require('./schema_joi');
const Product=require('./models/Product');



//this is middlewae for product validation purpose

const validateProduct=(req,res,next)=>{
   const {name,img,price,desc}= req.body;//body ke andr sb samana ayega
   const {error}=productSchema.validate({name,img,price,desc});//here i deconstruct-so validate return (value,error)
   if(error){
    // return res.render('error', { err: error.details.map((e) => e.message).join(', ')});
    return res.render('error');
   }
   next();//if there is no error then it goes to next step after validate

}

const validateReview=(req,res,next)=>{
    const {rating,comment}= req.body
    const {error}=reviewSchema.validate({rating,comment});
    if(error){
      // return res.render('error', { err: error.details.map((e) => e.message).join(', ') });   
      return res.render('error');
       }

    next();
 
}


// to check this using property  using req.isauthenticate method if login true or false
const isLoggedIn=(req,res,next)=>{
   if(!req.isAuthenticated()){
      req.flash('error','Please login first');
      return res.redirect('/login');
   }
   next();

}

//i get author id for a products
//so check the he is seller or buyer check  role 
//if he seller then show new ,delete dikhayo so i need a middleware

const isSeller=(req,res,next)=>{
   if(!req.user.role){//if not any role not have rights
      req.flash('error','You donnot have this right,sorry');
      return res.redirect('/products');
   }
   else if(req.user.role!=='seller'){
      req.flash('error','You donnot have this right,sorry');
      return res.redirect('/products');
   }
   next();
}

//here we r getting of two obj id by which current is only applicable to edit/delete his product only
const isProductAuthor=async(req,res,next)=>{
   let{id}=req.params;//product id  destrucred 
  let product= await Product.findById(id);//entire product get  and find
  //when to comp a two obj id we have method .equals()
 if(!product.author.equals(req.user._id)){
          req.flash('error','You r not the authorised user,Sorry!');
      return res.redirect('/products');
   }
   next();

}

module.exports={isProductAuthor,validateProduct,validateReview,isLoggedIn,isSeller};//use these in prodcut add and edit part so i add these in product 