const express=require('express');
const router=express.Router();//mini intance to use routers in place of app
const Review=require('../models/Review')
const passport=require('passport');
const User = require('../models/user');


router.get('/', (req,res) =>{
    res.render('landing_page.ejs');
})


//sbse pehle form register ayega
router.get('/register',(req,res)=>{ 
    res.render('auth/signup');
})



//actually want to register a user in my db
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate if all required fields are present
        if (!username || !email || !password || !role) {
            req.flash('error', 'All fields are required!');
            return res.redirect('/register');
        }

        // Make sure the role is either "buyer" or "seller"
        if (role !== 'buyer' && role !== 'seller') {
            req.flash('error', 'Invalid role!');
            return res.redirect('/register');
        }

        // Create a new user instance
        const user = new User({ email, username, role });

        // Register the user with the provided password
        const newUser = await User.register(user, password);

        // After registering the user, log them in automatically
        req.login(newUser, function (err) {
            if (err) {
                return next(err); // Handle error if login fails
            }

            // Send a success message and redirect to products page
            req.flash('success', 'You are successfully registered');
            return res.redirect('/products');
        });
    } catch (e) {
        // Handle any errors that occur during registration
        console.error(e); // Log the error to the console for debugging
        req.flash('error', 'Registration failed. Please try again.');
        return res.redirect('/register');
    }
});



//to get login form 
router.get('/login',(req,res)=>{
    res.render('auth/login');
})


// actually to login by the db 
//to check cerendialt for an user
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/login',
          failureMessage: true 
       }),
      (req,res)=>{
        console.log(req.user);
        req.flash('success','welcome back');
        res.redirect('/products');

});

//logout routes
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err); // handle any errors during logout
        }
        req.flash('success', 'Goodbye friend, see you again');
        res.redirect('/'); // Redirect to the homepage after logout
    });
});


module.exports=router;// to use this in mainfile i.err app.js uske bad sb m jata h
