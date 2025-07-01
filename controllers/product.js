const Product=require("../models/Product");


const showAllProducts=async (req,res)=>{
    try{
        let products=await Product.find({});//use this to diplay all products
            res.render('products/index',{products});
            }
    catch(e){
        // console.log(e);
        
            res.status(500).render('error',{err:e.message});
    }
  
}
const prodcutForm=(req,res)=>{
    try{
            
        res.render('products/new');
}
catch(e){
        res.status(500).render('error',{err:e.message});
}
}

const createProduct= async(req,res)=>{//next means validate hone ke bad ka sb chlega if no error
    try{
        let {name,img,price,desc}=req.body;
        await Product.create({name,img,price,desc,author:req.user._id});//here author is not come from req.body it came from req.user and its id 
        req.flash('success' , 'Product added successfully');
        res.redirect('/products') 
            
        }
catch(e){
        res.status(500).render('error',{err:e.message});
}

};

module.exports = {showAllProducts,prodcutForm,createProduct};