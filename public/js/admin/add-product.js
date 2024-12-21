const form_inputs = document.getElementsByClassName("form-input");

const product_data_control = () => {
    for (let index = 0; index < form_inputs.length; index++) {
        if (form_inputs[index].value.trim() === "" ||form_inputs[index].value<0) {
            return false; // Eğer bir input boşsa false döner
        }
    }
    return true; // Tüm inputlar doluysa true döner
}

document.querySelector("#form-sumbit-button-add-product").addEventListener("click", (event) => {
     event.preventDefault();// Formun varsayılan gönderimini engelle
    if (product_data_control()) { 
        const form = document.querySelector("#add-products");
        const formDataObject = {}; // Boş bir nesne oluştur
        
        // Formdan verileri al
        const inputs = form.querySelectorAll(".form-input");
        inputs.forEach(input => {
            formDataObject[input.name] = input.value.trim(); // Her input'un değerini nesneye ekle
        });

        // JSON formatına çevir
        const jsonData = JSON.stringify(formDataObject); // Nesneyi JSON string'e çevir

        // Verileri gönder
        fetch("http://192.168.1.105:80/admin.menu/add-product", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // İçerik tipini JSON olarak ayarla
            },
            body: jsonData // JSON string'i gönder
        })
        .then((response)=>response.json())
        .then(response=>
            {        
               if(response.check === true)
               {window.location.href = response.url}
               if(response.check === false)
                {window.location.href = response.url}
            }
        )
        }
        else
        {   
            alert("Plase Check Inputs");  
        }
    }
   
);
