const mongoose = require('mongoose');
require('../config/config');

mongoose.connect("mongodb://localhost:27017/ecommerce-webscraping",(err)=>{
    if(!err) console.log('DB connected successfully');
    else console.log('Not connected');
})