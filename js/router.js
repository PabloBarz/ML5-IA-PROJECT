import { renderImageDetection }
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

    if(render){

        appContent.innerHTML =
        render();
    }
}