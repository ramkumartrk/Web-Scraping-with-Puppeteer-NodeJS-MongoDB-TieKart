const mongoose = require('mongoose');
require('../config/config');
require('./db');
var productSchema = new mongoose.Schema({
    productName : 
    {
        type : String
    },

    category : 
    {
        type:String
    },
    price : 
    {
        type : String
    },
    product_url :
    {
        type: String
    },
    page_url :
    {
        type : String
    }   

});

mongoose.model('Products',productSchema);