const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productRoute = require("./routes/product.route");


const app = express()

//middleware configuration

app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 




//routes
app.use("/api/products",productRoute);



app.get("/", (req,res) => {

    res.send("Hello world from our API")
});




mongoose.connect("...")
.then(() => { console.log("connected to a db.")})
.catch(()=>console.log("Error while connecting to MongoDB"))


app.listen(3001, () => {
    console.log('Server is running on 3001..');
});

