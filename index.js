const express = require('express');
const User_pages = require('./routes/user');
const Admin_pages = require('./routes/admin');
const path = require('path');
const product_module = require('./models/product_data');
const db = require('./db_connect/db');
const app = express();


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.json());

app.use(express.static('public'));

app.use(User_pages.user_page);
app.use(Admin_pages.admin_pages);
 
/*db.execute('SELECT id,name,price,img_url,descript FROM product')
.then((response_db)=>{console.log(response_db[0][1]);})
.catch((error)=>{console.log(error)})*/

app.use((req,res)=>{res.render("user/layout",{title:"404",content:"../error/404",product_array:null,product_details_ejs:null,query_action:req.query});})
const server = app.listen(80,"192.168.1.105",()=>
    {
        
        console.clear();
        console.log(`For Connect: ${server.address().address}:${server.address().port}`);
        
    })