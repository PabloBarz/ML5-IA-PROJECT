import { renderImageDetection } 
from "./pages/imageDetection.js";

const appContent = 
document.getElementById("app-content");

function initApp(){

    appContent.innerHTML = 
    renderImageDetection();

}

initApp();