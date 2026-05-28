import { renderViewerLayout }
from "../components/viewerLayout.js";

import { loadHandPose, detectHands }
from "../models/handpose.js";

import { setupP5Camera }
from "../core/camera.js";

let p5Instance;
let currentHands = [];

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

    if(p5Instance){
        p5Instance.remove();
    }

    p5Instance = new p5((p)=>{


        let video;

        p.setup = async ()=>{

            const canvas =
            p.createCanvas(640,480);

            canvas.parent(container);
            video = setupP5Camera(p,640,480);

            setInterval(async ()=>{

                currentHands =
                await detectHands(video.elt);

                console.log(currentHands);

            },10);
        };

        p.draw = ()=>{

            p.background(0);

            if(video){
                p.image(video, 0, 0);
            }

            handCount.textContent =
            currentHands.length;

            for(let hand of currentHands){

                for(let keypoint of hand.keypoints){

                    p.fill(0,255,255);

                    p.noStroke();

                    p.circle(
                        keypoint.x,
                        keypoint.y,
                        12
                    );
                }
            }
        };
    });
}