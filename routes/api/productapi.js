const express=require('express');
const router=express.Router();//mini intance to use routers in place of app
// const {isLoggedIn}=require('../../middleware');
const User = require('../../models/User');
// const { route } = require('../product');

// router.post('/product/:productId/like', isLoggedIn, async (req, res) => {
  
//       const { productId } = req.params;
//       let user=req.user;//jo loggedin rehta h uski sari info req.user m mil jati h
//       let isLiked=user.wishList.includes(productId);

//     //   if(isLiked){
//     //     User.findByIdAndUpdate(req.user._id,{$pull:{wishList:productId}});
//     //   }-same a down side 


//       //$pull-operator,if a value instance are present before  then it remove
//       //$addtoset-operator-agr pehle s present huyi to add ni krega if present ni huyi to add kr dega and oppo in $pull

//       const option=isLiked?'$pull' : '$addToSet';
//       req.user=await User.findByIdAndUpdate(req.user._id,{[option]:{wishList:productId}},{new:true});

//       //new is parameter-is the part of findByIdAndUpdate for the final documnet and update one or the modify/update document
//         res.send('like done api');
      
     
//   });

router.post('/product/:productId/like', isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        let user = req.user; // the logged-in user's info is stored in req.user

        // Check if the product is already in the user's wishlist
        let isLiked = user.wishList.includes(productId);

        // Determine whether to add or remove the product from the wishlist
        const option = isLiked ? '$pull' : '$addToSet';

        // Update the user's wishlist
        await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true });

        // Send a success response
        res.send('like done api');
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send('Server error');
    }
});

// isLoggedIn middleware should handle redirect for non-authenticated users
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized: Please log in');
    }
    next();
}


  module.exports=router;