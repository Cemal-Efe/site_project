document.addEventListener("DOMContentLoaded", () => {
document.getElementById("form-remove-button").addEventListener("click", (event)=>
    {
        fetch(`http://192.168.1.105:80/admin.menu/delete-product/${document.querySelector("#product-id-edit").value}`,
        {
            method:'POST',
        })
    })
})