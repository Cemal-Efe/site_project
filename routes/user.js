const express = require('express');
const user_controls = require('../controls/user_controls');
const routers = express.Router();

routers.get("/",user_controls.main_page_control);
routers.get("/products",user_controls.products_page_control);
routers.get("/products/:id",user_controls.products_detail_control);
routers.get("/discount",user_controls.discount_page_control);
module.exports.user_page = routers;