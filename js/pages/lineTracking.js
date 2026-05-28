import { renderViewerLayout }
from "../components/viewerLayout.js";

import { loadHandPose, detectHands }
from "../models/handpose.js";

import { setupP5Camera }
from "../core/camera.js";

let p5Instance;

export function renderLineTracking(){

    return renderViewerLayout({

        title:"Línea entre dedos",
        description:"Seguimiento realtime con HandPose",
        status:"Cámara Activa",

        overlay:`

            <div id="handpose-container"
                 class="handpose-container">
            </div>

        `,

        cards:`

            <div class="cards">

                <div class="card">
                    <h3>Modelo</h3>
                    <p>HandPose</p>
                </div>

                <div class="card">
                    <h3>Estado</h3>
                    <p id="hand-status">Iniciando...</p>
                </div>

                <div class="card">
                    <h3>Detecciones</h3>
                    <p id="hand-count">0</p>
                </div>

                <div class="card">
                    <h3>FPS</h3>
                    <p>Realtime</p>
                </div>

            </div>

        `
    });
}

export async function initLineTracking(){

    const container =
    document.querySelector("#handpose-container");

    const handStatus =
    document.querySelector("#hand-status");

    const handCount =
    document.querySelector("#hand-count");

    await loadHandPose();

    handStatus.textContent =
    "Modelo cargado";

    p5Instance = new p5((p)=>{

        let video;

        p.setup = async ()=>{

            const canvas =
            p.createCanvas(640,480);

            canvas.parent(container);
            video = setupP5Camera(p,640,480);
        };

        p.draw = async ()=>{

            p.background(0);

            if(video.loadedmetadata){
                p.image(video, 0, 0);
            }

            const hands =
            await detectHands(video);

            handCount.textContent =
            hands.length;

            console.log(hands);
        };
    });
}