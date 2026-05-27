import { navigate }
from "./router.js";

const menuItems =
document.querySelectorAll(".menu-item");

function initEvents(){

    menuItems.forEach((item)=>{
        item.addEventListener("click", ()=>{

            menuItems.forEach((btn)=>{
                btn.classList.remove("active");
            });

            item.classList.add("active");

            const route =
            item.dataset.route;

            navigate(route);
        });
    });
}

function initApp(){

    navigate("image");
    initEvents();
}

initApp();