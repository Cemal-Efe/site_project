const mysql = require('../db_connect/db');
let product_list = [];

module.exports = class product_controller {
    /*constructor(id, name, mini_description, description, price, discount_price, image) {
        this.id = id;
        this.name = name;
        this.mini_description = mini_description;
        this.description = description;
        this.price = price;
        this.discount_price = discount_price;
        this.discount = discount_price > 0;
        this.image = image;
        
        if (this.id == null || this.name == null || this.mini_description == null || this.description == null || this.price == null || this.image == null) {
            console.error("Invalid Variable");
        }
    }*/

    /*save_product() {
        if (product_list.find(i => i.product_id === this.id)) {
            return false;
        } else {
            product_list.push({
                product_id: this.id,
                product_name: this.name,
                product_mini_description: this.mini_description,
                product_description: this.description,
                product_price: this.price,
                product_discount_price: this.discount_price,
                product_discount: this.discount,
                product_image: this.image
            });
            return true;
        }
    }*/

    /*static edit_product(id, datas) {
        const index = product_controller.FindByID(id);
        if (index) {
            index.product_name = datas.new_product_name;
            index.product_mini_description = datas.new_product_mini_des;
            index.product_description = datas.new_product_des;
            index.product_price = datas.new_product_price;
            index.product_discount_price = datas.new_product_discount_price;
            index.product_image = datas.new_product_image;

            if (index.product_discount_price < 0) {
                index.product_discount_price = 0;
            }
            index.product_discount = index.product_discount_price > 0;
        }
    }*/

    static FindByID(id) {
        return mysql.execute(`SELECT *FROM product WHERE product_id=${id}`)  // Ürünü geri döndür
        //! direkt olarak array gönderilecek düzeltilecek
    }
    static count_product() {
        return mysql.execute(`SELECT COUNT(*) AS productCount FROM product;`)
        //! direkt olarak array gönderilecek düzeltilecek
    }
    /*static DeleteByID(id) {
        const index = product_list.findIndex(i => i.product_id === id);  // Ürünün indeksini bul
        if (index !== -1) {
            product_list.splice(index, 1);  // Diziden sil
            console.warn("Item Deleted");
        } else {
            console.error("Product not found");
        }
    }*/
    static search_product(keyword) {
        const code = `SELECT * FROM product WHERE product_name LIKE '%${keyword}%' OR product_mini_description LIKE '%${keyword}%' OR product_description LIKE '%${keyword}%'`
        return mysql.execute(code);
    }
    static get_All_Product() {
        return mysql.execute('SELECT *FROM product')
        //! direkt olarak array gönderilecek düzeltilecek

        /*.then((response)=>{
          return response[0];
        })
        .catch((error)=>
          {
              console.error("get all product error: "+error)
          })*/
    }
};
