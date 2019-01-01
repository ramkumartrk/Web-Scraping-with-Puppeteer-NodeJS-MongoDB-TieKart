const puppeteer  = require('puppeteer');
const mongoose = require('mongoose');

    require('./models/db');
    require('./models/product.model');
const ProductsModel = mongoose.model('Products');
const express = require('express');

var app= express();
//app.listen(process.env.PORT,()=>console.log('server running at ' + process.env.PORT));


(async function main(){

    try{
    const browser= await puppeteer.launch({headless : false});
    const page= await browser.newPage();    

    // console.log(items.length);//12

for(let i=0;i<12;i++)
    {
        await page.goto('http://www.tiekart.com/');
        await page.waitFor(10000);
        await page.waitForSelector('.col-lg-4');
        const items = await page.$$('.col-lg-4');


        const item=items[i];
        const button = await item.$('a');        
        button.click();

        if(await page.$('.product-grid')!==null)
        await page.waitForSelector('.product-grid');       
        else        
        await page.waitForSelector('.product-block'); //remove
        const  products = await page.$$('.product-block');

        //loop over each product on inner page
        for(const product of products)
        {   
            
            //passes h3
            const var_name = await product.$eval('h3',h3=> h3.innerText);
            console.log('product_name:',var_name);
            
            if(await product.$('span.price-new')!==null)
           var var_price =await product.$eval('span.price-new', e=> e.innerText);
           else
           var var_price =await product.$eval('div.price', e=> e.innerText);
           console.log('price:',var_price);

            const var_product_url = await product.$eval('a[href]', a => {return a.href;});
            console.log('product_url:'  + var_product_url);

           const var_page_url = page.mainFrame().url();
           console.log('Page URL:'+ var_page_url);    
            if(await product.$('div#breadcrumb ol.breadcrumb li:nth-child(0n+3)')!==null)
           var var_category = await page.$eval('div#breadcrumb ol.breadcrumb li:nth-child(0n+3)',e=>{return e.innerText});
           else 
           var var_category = await page.$eval('div#breadcrumb ol.breadcrumb li:nth-child(0n+2)',e=>{return e.innerText});
      console.log('category:' +var_category);

           var productobj = new ProductsModel();           
           productobj.productName = var_name;
           productobj.price =var_price;
           productobj.product_url = var_product_url;
           productobj.category = var_category;
           productobj.page_url = var_page_url;

           productobj.save((err)=>{
               if(!err)console.log('successfully saved');
               else console.log('something went wrong! Fix it..' + err);
           });


           

        }    
         
    }
    await browser.close();
}
catch(err)
{
    console.log(err);
}

})()


