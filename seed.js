// seed-db-mongoose
const mongoose=require('mongoose');
// seed- models-product
const Product=require('./models/Product');

//task1-to make array
//products depend upon thei schema blue-print
const products=[
    {
        name:"Iphone 14 pro",
        img:"https://images.unsplash.com/photo-1677144677444-9ab5de19143f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price:130000,
        desc:"very costly,aukaat ke bhar"
    },
    {
        name:"Range Rover",
        img:"https://images.unsplash.com/photo-1526242138665-33b6d8245e6f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhbmdlJTIwcm92ZXIlMjB2ZWxhcnxlbnwwfHwwfHx8MA%3D%3D",
        price:25000000,
        desc:"Range Rover Velar",

    },
    {
        name:"Flats",
        img:"https://images.unsplash.com/photo-1504919562-9f07375d8d01?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxhdHN8ZW58MHx8MHx8fDA%3D",
        price:2500000,
        desc:"Beautiful flat with discount",
    },
    {
        name:"Jet Aeroplane",
        img:"https://media.istockphoto.com/id/1495164847/photo/white-private-plane-on-runway.webp?a=1&b=1&s=612x612&w=0&k=20&c=vmhivsRBNyqUYjv-NlpH1mDdh754NHbZMwoAdaYfz3E=",
        price:100000000,
        desc:"This is Jet Aeroplane",
    },
    {
        name:"Motorsport Bike",
        img:"https://images.unsplash.com/photo-1612426072360-d968815594b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt0bXxlbnwwfHwwfHx8MA%3D%3D",
        price:24000000,
        desc:"A good racing Bike ",
    }
];
async function seedDB(){
   await Product.insertMany(products);
    console.log("data seeded successfully");//mongo keyword always return promise-hoga ya na hoga to iske bachne k liye we await for waiting we use await

}

module.exports=seedDB;