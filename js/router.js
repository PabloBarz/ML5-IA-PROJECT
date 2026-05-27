import {
    renderImageDetection,
    initImageDetection
}
from "./pages/imageDetection.js";

import { renderLineTracking }
from "./pages/lineTracking.js";

import { renderFaceDetection }
from "./pages/faceDetection.js";

import { renderTeachableMachine }
from "./pages/teachableMachine.js";

import { renderObjectAlert }
from "./pages/objectAlert.js";

const appContent =
document.getElementById("app-content");

const routes = {

    image: renderImageDetection,
    line: renderLineTracking,
    face: renderFaceDetection,
    teachable: renderTeachableMachine,
    alert: renderObjectAlert
};

export function navigate(route){

    const render =
    routes[route];

    let html = "";

    if(render){

    html = render();
    appContent.innerHTML =
    html;

    if(route === "image"){

        initImageDetection();
    }
}
}