let open_control = false; // Kapsamı genişletildi

window.addEventListener("load", () => {
    updateMenuDisplay(); // İlk görünüm ayarı
    window.addEventListener('resize', () => {
        updateMenuDisplay(); // Boyut değiştiğinde görünümü güncell
        console.log();
    })
})
const updateMenuDisplay = () => {
    const card = document.querySelectorAll(".card-border");
    let width = window.innerWidth;
    if (width <= 1075) {
        document.querySelector("#desktop-menu").style.display = 'none';
        document.querySelector("#menu_icon_id").style.display = "block";
        document.querySelector("#search_input").style = "right =20px;margin-right = 0px"
        for (let index = 0; index < card.length; index++) {
            card[index].style = "margin-left : 8vh";
            
        }
    } else {
        document.querySelector("#desktop-menu").style.display = 'block';
        document.querySelector("#menu_icon_id").style.display = "none";
        for (let index = 0; index < card.length; index++) {
            card[index].style = "margin-left : 15vh";
        }
        /*for (let index = 0; index < card.length; index++) {
            card[index].style.display = "inline-block";
            card[index].style.margin = "10px";
            card[index].style = "margin-left: 20px%";
        }*/
        if (open_control == true) {
            document.querySelector("#mobile-menu").style.display = 'none'
            open_control = !open_control;
            document.querySelector("#menu_icon_id").className = "fa-solid fa-bars"
            document.querySelector("#menu_icon_id").style.color = "white"
        }

    }
};


document.querySelector("#menu_icon_id").addEventListener("click", () => {
    const mobileMenu = document.querySelector("#mobile-menu");
    open_control = !open_control; // Durumu tersine çevir
    if (open_control) { document.querySelector("#menu_icon_id").className = "fa-solid fa-xmark" };
    if (!open_control) { document.querySelector("#menu_icon_id").className = "fa-solid fa-bars" }
    document.querySelector("#menu_icon_id").style.color = "white";
    mobileMenu.style.display = open_control ? 'block' : 'none'; // Duruma göre göster
});
