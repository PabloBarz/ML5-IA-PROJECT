import {
    renderImageDetection,
    initImageDetection
}
from "./pages/imageDetection.js";

import {
    renderLineTracking,
    initLineTracking,
    destroyLineTracking
}
from "./pages/lineTracking.js";

import {
    renderFaceDetection,
    initFaceDetection,
    destroyFaceDetection
}
from "./pages/faceDetection.js";

import { renderTeachableMachine }
from "./pages/teachableMachine.js";

import { renderObjectAlert }
from "./pages/objectAlert.js";

const appContent =
document.getElementById("app-content");

let currentDestroy = null;

const routes = {

    image:{ 
        render: renderImageDetection,
        init: initImageDetection
    },
    line:{
        render:renderLineTracking,
        init:initLineTracking,
        destroy:destroyLineTracking
    },
    face:{
        render:renderFaceDetection,
        init:initFaceDetection,
        destroy:destroyFaceDetection
    },

    teachable:{
        render:renderTeachableMachine
    },

    alert:{
        render:renderObjectAlert
    }
};

export async function navigate(route){

    const currentRoute =
    routes[route];

    if(!currentRoute){
        return;
    }

    if(currentDestroy){
        currentDestroy();
        currentDestroy = null;
    }


    appContent.innerHTML =
    currentRoute.render();

    if(currentRoute.init){

        await currentRoute.init();
        currentDestroy = currentRoute.destroy;
    }
}