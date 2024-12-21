const product_module = require('../models/product_data');
const path = require('path');
const main_menu_control = (req,res)=>
    {
        res.render(path.join(__dirname,"../","/views/admin/layout"),{title:"Admin menu",content:"main_menu",query_action:req.query})
    };
const add_product_control_get = (req,res)=>
    {
            res.render(path.join(__dirname,"../","/views/admin/layout"),{title:"Admin menu",content:"add_product",query_action:req.query})
    };
const add_product_control_post = (req,res)=>
    {
        const new_product = new product_module(req.body.new_product_id,req.body.new_product_name,req.body.new_product_mini_des,req.body.new_product_des,req.body.new_product_price,req.body.new_product_discount_price,req.body.new_product_image);
        let check = new_product.save_product();
        if(check)
        {res.json({check,url:`http://192.168.1.105/admin.menu/add-product/?process=add_item`})}
        else{res.json({check,url:`http://192.168.1.105/admin.menu/add-product/?process=add_item_error`})};
        //console.log(new_product);
    };
const edit_page_control = async (req,res)=>
    {   
        let product_list = [];
        const product_array_edit = async ()=>{
            await product_module.get_All_Product()
            .then((product_data_then)=>{
                
                for (let index = 0; index < product_data_then[0].length; index++) {
                    product_list.push(product_data_then[0][index]);
                    //console.log(product_list[index]);
                }
            })
            .catch((error)=>{console.error(`Data Base Error => ${error}`)})
        }
        await product_array_edit();
        res.render(path.join(__dirname,"../","/views/admin/layout"),{title:"Product menu",content:"product_menu",product_data:product_list,query_action:req.query})
    }
const edit_page_detail_control =(req,res)=>
    {
        let finded  = false;
        let product_list = product_module.get_All_Product();
        for (let index = 0; index < product_list.length; index++) {
            if(product_list[index].product_id == req.params.id)
            {var product_details= product_list[index];finded = true;}
        };
        if(finded == false){res.render(path.join(__dirname,"../","/views/admin/layout"),{title:"PNF Error",content:"../error/pnf",product_array:product_list,product_details_ejs:null,query_action:req.query})}
        else{res.render(path.join(__dirname,"../","/views/admin/layout"),
            {   title:product_details.product_name,
                content:"edit_product",
                product_array:product_list,
                product_details_ejs:product_details,
                query_action:req.query
            })}
    }
const edit_product_post = async (req,res)=>
    {
        //console.log(req.params.id);
        await product_module.edit_product(req.params.id, req.body);
        res.send(`http://192.168.1.105/admin.menu/edit-product/${req.params.id}?process=edit`)
        //.redirect(`${window.location.href}?process=edit`)
        

    }
const delete_product_post = async (req,res)=>
    {
        await product_module.DeleteByID(req.params.id);
        //res.redirect(`$/?process=delete`)
    }
module.exports.main_menu_control = main_menu_control;
module.exports.add_product_control_get = add_product_control_get;
module.exports.add_product_control_post = add_product_control_post;
module.exports.edit_product_control = edit_page_control;
module.exports.edit_page_detail_control = edit_page_detail_control;
module.exports.edit_product_post = edit_product_post;
module.exports.delete_product_post = delete_product_post;

