const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// const User = require('../models/User');

router.get('/user/cart' , isLoggedIn , async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user, totalAmount , productInfo });
})


router.post('/user/:productId/add' , isLoggedIn , async(req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart'); 
});
router.get("/product/payment", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart");

        if (!user.cart || user.cart.length === 0) {
            return res.status(400).send("Cart is empty");
        }

        const line_items = user.cart.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    description: item.desc,
                },
                unit_amount: item.price * 100, // Stripe uses paise (INR cents)
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:8080/payment/success", // update port if needed
            cancel_url: "http://localhost:8080/payment/failure",

//              customer_creation: 'always', // creates a new Stripe customer
//   billing_address_collection: 'required',
//    customer_email: user.email,
        });

        res.redirect(303, session.url);
    } catch (err) {
        console.error("Stripe payment error:", err);
        res.status(500).send("Stripe error");
    }
});

// Payment Success Page
router.get('/payment/success', async (req, res) => {
    // Optional: Clear the user's cart
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.render('cart/success'); // Render a success EJS page
});

// Payment Cancel Page
// router.get('/payment/failure', (req, res) => {
//     res.render('cart/failure'); // Render a cancel/failure EJS page
// });




//cart item removing 
router.post('/cart/remove/:itemId', isLoggedIn, async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user._id;

        // Remove the item from the cart
        const user = await User.findById(userId).populate('cart');
        user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
        await user.save();

        // Calculate the updated total amount
        const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);

        res.status(200).json({ message: 'Item removed', cart: user.cart, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;