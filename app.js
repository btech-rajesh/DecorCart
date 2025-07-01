
    require('dotenv').config();

//this is for production means require env file and require
const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const flash=require('connect-flash');//this is uses for pop notify
const session=require('express-session');





//authenticate passport vali
const passport=require('passport');
const  LocalStrategy=require('passport-local');
// const User=require('./models/User');



//routes requires
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes=require('./routes/cart');
const productapi=require('./routes/api/productapi');
const contactRoutes = require('./routes/navbar'); // Adjust path if needed


const User = require('./models/user');
const payment=require('./routes/payment');



//  dbURL=process.env.dbURL;

//here i will do this connection put it into environment variable
// mongoose.set('strictQuery',true);

mongoose.connect("mongodb+srv://krajeshpachori:rajesh123@cluster0.dscfewz.mongodb.net/DecorCart")
    .then(()=>{
        console.log("Db connected succesfully")
    })

    .catch((err)=>{
        console.log("Db error",err);
    })





//session middleware 
    let configSession={
        //i will not run this only define sesion here
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        Cookie:{
            //for security
            httpOnly:true,
            //it tells the times using date.now()+Expires_time(+ is the part of maxage time) it records everything
            expires:Date.now()+24*7*60*60*1000,
            maxAge:24*7*60*1000
        }
      }
      app.use(session(configSession));//sesion middleware





app.engine('ejs',ejsMate);//to see ejs file using ejs-mate engine
app.set('view engine','ejs');//to see views files
app.set('views',path.join(__dirname,'./views'));//views folder
app.use(express.static(path.join(__dirname, 'public')));//public folder
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(contactRoutes);
app.use(methodOverride('_method'));
app.use(flash());//flash middleware 


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });




    //passport 
    app.use(passport.initialize());//to initialise passport use of passport thing
    app.use(passport.session());//to use of passport entity to store locally
    

app.use((req,res,next)=>{//these middleware are for the flash messges
    // console.log(req.user,'raj')
    res.locals.currentUser=req.user || null; //Middleware to set currentUser for all views
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passport-set in this a middleware

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));


//seeding Databse DB
    //due to nodemon bar bar seed hoga as nodemon auto change save and run
    //so i ek bar chalke rok dunga
    // seedDB();



// Middleware to set currentUser for all views
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user || null;
//     next();
//   });
  


app.use(productRoutes);//so that har incoming request pe 
app.use(reviewRoutes);
app.use(authRoutes);//use for the routes running middleware
app.use(cartRoutes);
app.use(productapi);//from expoerts module to app.js ans require,use as middleware
// app.use('/', payment);










app.listen(8080,()=>{
    console.log("server is connected at port 8080");
})