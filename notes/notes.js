//task1=basic server connected

//task2->db to be connected
//server+db-ko interecet kra paunga


//task3 ->collection make i.e models -se pehle scehma
//views-template
//staticfiles-public
//collection schema-models(product,user,review,cart)
//every model collection have their diffrent schema
//models folder-product.js,user.js etc

//summary of top all
//Schema-model-Db(mongoose) i.e-ODM-so i need to require this



//task4->add initial data using insertMany([{},{},{}])
//for initial data we make seed.js file-array bana -or use insert krna

//task5 seeding
//task6 db m s product show krne hain to i need routes for this i will make a new folder 

//we cant exports app from app.js as it is a instance



//Task 1.1
//Revies.js -schema for this -modee
//we make  route for the review.js file taki hm review ko add kr paye

//for the review we post it using form and button using POST request
// using prodcuts/:id/reviews




// ------------------
//to render somthing from diffrent collection we have populate
// products and reviews
//over the shop.ejs using that obj id which is push into products
//soit will be done by populated of any product of particular search krenge tabhi usi ke sath reviews bhi populate kr denge using objID





// ---------------------------------------
//after topic review date and time update 


//middleware-function have 3 thing req,res,next-aage badho 

//we use this next for if we delete the particular object using button but  
//next aftre run of middleware it will next and aage bado
//its comments are not delete so we get excess amount of review for that object
//so first we will del the review of obj in delete opr 





//validation->examples=>e.g-mandtory thing,form not be empty,age not be -ve
//type-client side-bootstrap eg-validation(required keyword) and novalidation keyword -finish the existance of required keyword
//,server side validation-approval for server side
//i have also used required in my schema of product name.
// ---------------------------------------------------


//after try cache server side validation is start


//ssv->server side validation-for using Joi in the backed server side validation
//npm package most powerfull work over schema descripted lang -it  works for data validator

//steps to done joi ssv=>
//stp1. we have to make schema it make a new schema for it or alg schema bnega iska
//stp2.jha pr bhi m ise rkhunga ise validate krunga i.e-validate-it is an method


//it is a backend part so this we use package joi for ssv








