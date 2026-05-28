import { renderViewerLayout }
from "../components/viewerLayout.js";

import {
    loadFaceMesh,
    detectFaces
}
from "../models/facemesh.js";

import { FACE_PARTS }
from "../utils/faceParts.js";

import { setupP5Camera }
from "../core/camera.js";

let p5Instance;
let currentFaces = [];
let currentRegion = "faceOval";
let isReady = false;
let video;
let detectionInterval;

export function renderFaceDetection(){
    
    const faceButtonsHTML =
    FACE_PARTS.map((part,index)=>`

        <button
            class="face-btn ${index === 0 ? "active" : ""}"
            data-region="${part.value}"
        >
            ${part.label}
        </button>

    `).join("");

    return renderViewerLayout({

        title:"FaceMesh",
        description:"Detección facial realtime",
        status:"Cámara Activa",

        overlay:`

            <div id="facemesh-container"
                 class="handpose-container">
            </div>
            <div class="face-controls">
                ${faceButtonsHTML}
            </div>

        `,

        cards:`

            <div class="cards">

                <div class="card">
                    <h3>Modelo</h3>
                    <p>FaceMesh</p>
                </div>

                <div class="card">
                    <h3>Estado</h3>
                    <p id="face-status">Iniciando...</p>
                </div>

                <div class="card">
                    <h3>Rostros</h3>
                    <p id="face-count">0</p>
                </div>

                <div class="card">
                    <h3>FPS</h3>
                    <p>Realtime</p>
                </div>

            </div>

        `
    });
}

export async function initFaceDetection(){

    currentFaces = [];
    isReady = false;

    const container =
    document.querySelector("#facemesh-container");

    const faceStatus =
    document.querySelector("#face-status");

    const faceCount =
    document.querySelector("#face-count");

    const faceButtons =
    document.querySelectorAll(".face-btn");

    faceButtons.forEach((btn)=>{

        btn.addEventListener("click", ()=>{

            faceButtons.forEach((item)=>{
                item.classList.remove("active");
            });
            
            btn.classList.add("active");

            currentRegion =
            btn.dataset.region;
        });
    });

    await loadFaceMesh();

    faceStatus.textContent =
    "Modelo cargado";

    p5Instance = new p5((p)=>{

        p.setup = ()=>{

            isReady = true;

            const canvas =
            p.createCanvas(640,480);

            canvas.parent(container);

            video =
            setupP5Camera(p,640,480);

            detectionInterval =
            setInterval(async ()=>{

                currentFaces =
                await detectFaces(video.elt);

            },16);
        };

        p.draw = ()=>{

            p.background(0);

            if(!isReady){
                return;
            }

            if(video){
                p.image(video,0,0);
            }

            faceCount.textContent =
            currentFaces.length;

            if(currentFaces.length === 0){
                return;
            }

            for(let face of currentFaces){

                const points =
                face[currentRegion].keypoints;

                for(let point of points){

                    p.fill(0,255,255);
                    p.noStroke();
                    p.circle(
                        point.x,
                        point.y,
                        5
                );
                }
            }

        };
    });
}

export function destroyFaceDetection(){

    if(video && video.elt.srcObject){

        const tracks =
        video.elt.srcObject.getTracks();

        tracks.forEach((track)=>{
            track.stop();
        });
    }

    if(detectionInterval){
        clearInterval(detectionInterval);
    }

    if(p5Instance){
        p5Instance.remove();
    }

    currentFaces = [];
    currentRegion = "faceOval";

    detectionInterval = null;
    video = null;
    p5Instance = null;
    isReady = false;
}