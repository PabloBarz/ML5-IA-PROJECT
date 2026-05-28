import {
    renderImageDetection,
    initImageDetection
}
from "./pages/imageDetection.js";

import {
    renderLineTracking,
    initLineTracking
}
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

    image:{ 
        render: renderImageDetection,
        init: initImageDetection
    },
    line:{
        render:renderLineTracking,
        init:initLineTracking
    },
    face: renderFaceDetection,
    teachable: renderTeachableMachine,
    alert: renderObjectAlert
};

export async function navigate(route){

    const currentRoute =
    routes[route];

    if(!currentRoute){
        return;
    }

    appContent.innerHTML =
    currentRoute.render();

    if(currentRoute.init){

        await currentRoute.init();
    }
}