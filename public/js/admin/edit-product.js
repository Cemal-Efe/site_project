const edit_form_inputs = document.querySelectorAll(".form2-inputs");  // .form-input sınıfını kullanalım

const product_edit_data_control = () => {
    for (let index = 0; index < edit_form_inputs.length; index++) {
        const input = edit_form_inputs[index];

        // Eğer input disabled ise, atla
        if (input.disabled) {
            continue;
        }

        // Boş input kontrolü
        if (input.value.trim() === "") {
            return false; // Eğer bir input boşsa false döner
        }

        // Sayısal inputlar için geçerlilik kontrolü
        if (input.type === "number") {
            const numValue = parseFloat(input.value);
            // Eğer değeri geçerli bir sayı değilse veya negatifse
            if (isNaN(numValue) || numValue < 0) {
                return false; // Geçersiz bir sayısal değer varsa false döner
            }
        }
    }
    return true; // Tüm inputlar geçerliyse true döner
}

document.querySelector("#form-edit-button").addEventListener("click", (event) => {
    event.preventDefault(); // Formun sayfayı yenilemesini engelle
    if (product_edit_data_control()) {
        const form = document.querySelector("#edit-products");
        const formDataObject = {};

        const inputs = document.querySelectorAll(".form2-inputs");
        console.log(inputs)
        inputs.forEach(input => {
            formDataObject[input.name] = input.value.trim(); // Her input'un değerini nesneye ekle
        });

        const jsonData = JSON.stringify(formDataObject);

        fetch(`http://192.168.1.105:80/admin.menu/edit-product/${document.getElementById("product-id-edit").value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // İçerik tipini JSON olarak ayarla
            },
            body: jsonData // JSON string'i gönder
        })
        .then((response) => response.text())
        .then((text) => { 
            window.location.href = text;  // Başarıyla tamamlanırsa yönlendirme
        });
    } else {
        alert("Please Check Inputs");  
    }
});
