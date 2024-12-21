const express = require('express');
const admin_controls = require('../controls/admin_controls');
const routers = express.Router();
//GET
routers.get("/admin.menu",admin_controls.main_menu_control)
routers.get("/admin.menu/add-product",admin_controls.add_product_control_get)
routers.get("/admin.menu/product-list",admin_controls.main_menu_control)
routers.get("/admin.menu/edit-product",admin_controls.edit_product_control)
routers.get("/admin.menu/edit-product/:id",admin_controls.edit_page_detail_control)
//POST
routers.post("/admin.menu/edit-product/:id",admin_controls.edit_product_post)
routers.post("/admin.menu/delete-product/:id",admin_controls.delete_product_post)
routers.post("/admin.menu/add-product",admin_controls.add_product_control_post)
module.exports.admin_pages = routers;