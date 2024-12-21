debugger;
const path = require('path');
const product_module = require('../models/product_data');
const { response } = require('express');
const main_page_control = async (req, res) => {
    let product_list = [];
    if (req.query.status == "Server_Error") {
        if (!res.headersSent) {
            return res.render(path.join(__dirname, "../", "/views/user/layout"), {
                title: "Ana Sayfa",
                content: "main_page",
                product_array: product_list,
                product_details_ejs: null,
                query_action: req.query
            });
        }
    }
    const product_array_edit = async () => {
        try {
            const product_data_then = await product_module.get_All_Product();
            for (let index = 0; index < product_data_then[0].length; index++) {
                // Discount Control
                if (product_data_then[0][index].product_discount == 1) {
                    product_data_then[0][index].product_discount = true;
                }
                if (product_data_then[0][index].product_discount == 0) {
                    product_data_then[0][index].product_discount = false;
                }
                product_list.push(product_data_then[0][index]);
            }
        } catch (error) {
            // Eğer hata varsa ve başlıklar henüz gönderilmemişse yönlendirme yapılır
            console.log(error);
            if (!res.headersSent) {
                res.redirect('/?status=Server_Error');  // Hata durumunda yalnızca bir kez yönlendiriyoruz
            }
            return; // Hata durumunda işlem durdurulmalı, yönlendirme yapılmaz
        }
    }

    await product_array_edit();

    // Yönlendirme yapılmadıysa render işlemi yapılır
    if (!res.headersSent) {
        return res.render(path.join(__dirname, "../", "/views/user/layout"), {
            title: "Ana Sayfa",
            content: "main_page",
            product_array: product_list,
            product_details_ejs: null,
            query_action: req.query
        });
    }
};

const products_page_control = async (req, res) => {
    let product_list = [];
    if (req.query.status == "Server_Error") {
        res.render(path.join(__dirname, "../", "/views/user/layout"), { title: "Ürünler", content: "products_page", product_array: product_list, product_details_ejs: null, query_action: req.query })
    }
    else if ("search_input" in req.query) {
        let product_list_ = [0];
        product_module.search_product(req.query.search_input)
            .then((response) => {
                for (let index = 0; index < response[0].length; index++) {
                    product_list_[index] = response[0][index];
                }
                res.render(path.join(__dirname, "../", "/views/user/layout"),
                    {
                        title: "Ürünler",
                        content: "product_find",
                        product_array: product_list_,
                        product_details_ejs: null,
                        query_action: req.query
                    })

            })
    }
    const product_array_edit = async () => {
        await product_module.get_All_Product()
            .then((product_data_then) => {

                for (let index = 0; index < product_data_then[0].length; index++) {
                    if (product_data_then[0][index].product_discount == 1) { product_data_then[0][index].product_discount = true }

                    if (product_data_then[0][index].product_discount == 0) { product_data_then[0][index].product_discount = false }
                    //

                    product_list.push(product_data_then[0][index]);
                }
            })
            .catch((error) => {
                if (!res.headersSent) {
                    res.redirect(`/products?status=Server_Error`)
                }
            })
    }

    await product_array_edit();
    if (!res.headersSent) {
        res.render(path.join(__dirname, "../", "/views/user/layout"), { title: "Ürünler", content: "products_page", product_array: product_list, product_details_ejs: null, query_action: req.query })
    }
}
const products_detail_control = async (req, res) => {
    let product_data;
    let random_product;
    let id = req.params.id
    if (req.query.status == "Server_Error") {
        res.render(path.join(__dirname, "../", "/views/user/layout"), { title: "Server Error", content: "../error/pnf", product_array: null, product_details_ejs: null, query_action: req.query })
    }
    product_module.FindByID(req.params.id)
        .then((response) => {
            product_data = response[0][0]
            product_module.count_product()
                .then((response) => {
                    product_module.FindByID(Math.floor(Math.random() * response[0][0].productCount + 1))
                        .then((response) => {
                            random_product = response[0][0];
                            res.render(path.join(__dirname, "../", "/views/user/layout"),
                                {
                                    title: product_data.product_name,
                                    content: "product_details",
                                    product_array: random_product,
                                    product_details_ejs: product_data,
                                    query_action: req.query
                                })
                        })
                        .catch(() => {
                            if (!res.headersSent) {
                                res.redirect(`/products/${id}?status=Server_Error`);
                            }
                        })
                })
                .catch(() => {
                    if (!res.headersSent) {
                        res.redirect(`/products/${id}?status=Server_Error`);
                    }
                })
        })
        .catch(() => {
            if (!res.headersSent) {
                res.redirect(`/products/${id}?status=Server_Error`);
            }
        })


}

const discount_page_control = async (req, res) => {
    let product_list = [];
    if (req.query.status == "Server_Error") {
        res.render(path.join(__dirname, "../", "/views/user/layout"), { title: "İndirimli Ürünler", content: "discount", product_array: product_list, product_details_ejs: null, query_action: req.query })
    }
    const product_array_edit = async () => {
        await product_module.get_All_Product()
            .then((product_data_then) => {

                for (let index = 0; index < product_data_then[0].length; index++) {
                    product_list.push(product_data_then[0][index]);
                    //console.log(product_list[index]);
                }
            })
            .catch((error) => {
                if (!res.headersSent) {
                    res.redirect("/discount?status=Server_Error");
                }
            })
    }
    await product_array_edit();
}

module.exports.main_page_control = main_page_control;
module.exports.products_page_control = products_page_control;
module.exports.products_detail_control = products_detail_control;
module.exports.discount_page_control = discount_page_control;
