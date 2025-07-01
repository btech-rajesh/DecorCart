//Authentication and authorisation

//we will do here using passport.js
//its a tool for nodejs and technique it isnot a middleware for nodejs only

//OAuth-usees facebook,email login purpose for these we have 1000 of straties but we use here passport-local for authentication 


//for authentication i need user-schema-name,email,username,password

//we will store password directly-it will be hashed first-it will be stored then 

//to get o/p se i/p directly it is not  a hashing algo so i need a  key for this
//here i have done this SHA technique

//ex-123pass-using hashing function -rajesh-login


//ques=>
//now how will i get the data 123 but in my db is stored only rajesh so tell me how i get 123(pass)


// ---------------------------------------------------------------------
//  ex- 123 (i/p)pass-hashfunction convert-o/p -it will check in db if ur email is matches then login 
//otherwise need authenticate it so any unique identity of a user will act a key i.e-email here in this senario\



//hashing done by-baycrpt(we will se it later)
//but here we will use

//1.passport-passport-local-this is local stategy
//passport-local-mongoose-plm(this is tool) jo hashing m milta h(this is hashing)
//it will store 2 field automatically ie. username and password
//ex.-instagram have unique username and password uses as a key there 
//so plm stores these automatically

//so for the schema field i will not put these two things becoz plm add these entity will add into db




//my task is to crete a user
//schema-iske andr password directly store ni hota
//basically isme hash+salt-it all done by passpport-local-mongoose and store it db also

//make routes auth

// -------------------------------------------------


// thsese r some static methods -jo directly schema ke upr apply ho jate h
//auhtenticate-it generates a function that is used in passportlocalstragey
//serializeUser()-ex-take id of him and add it into portal cb for study not ask bar bar tu ayega ya ni 
// basically in this informatiion is stored permanently once it enter
//deser->chla jaana not stored info of any person
//register(user-schema part,pass-2nd paramete,callback)->conveince method to register a new user


//now using plm user will register and authenticate it


//after login i have a object from req.user
//by which i can acces entity all information regarding user 



///for without login or sign my website products not visible to anyone so it
//will be done by using middleware if it authenticate
//


// ----------------------
//authentication for buyer-he will see only and read ,reviews and seller-crud and seller are multiple and s1 cannot delete s2 so we used 2 checks for buyer and seller

//this is called a authorisation and authentication for checking valid data

//step1. signup m buyer and seller make for these





//after authorisation


// ---------------------------------------------------


//cart functionality
//product count home work


//adding to cart the prodcuts

//cart-particular user k liye having id of diff product
//so it need an array

//and for the change of ui for cart button i need a route to redirect the thing on url

//for cart i need to add product id cart ke andr so in cart.js