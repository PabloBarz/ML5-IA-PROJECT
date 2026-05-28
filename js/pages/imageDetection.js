import { renderViewerLayout }
from "../components/viewerLayout.js";

import {
    loadMobileNet,
    classifyImage
}
from "../models/mobilenet.js";

export function renderImageDetection(){

    return renderViewerLayout({

        title:"Detector de Imágenes",
        description:"Reconocimiento de objetos con IA",
        status:"Sistema Activo",

        overlay:`

            <div class="image-detection">
                <div class="image-list">

                    <button class="image-item active" data-image="./assets/images/detector/perro.png">
                        <img src="./assets/images/detector/perro.png" alt="Perro">
                    </button>

                    <button class="image-item" data-image="./assets/images/detector/gato.png">
                        <img src="./assets/images/detector/gato.png" alt="Gato">
                    </button>

                    <button class="image-item" data-image="./assets/images/detector/jirafa.png">
                        <img src="./assets/images/detector/jirafa.png" alt="Jirafa">
                    </button>

                    <button class="image-item" data-image="./assets/images/detector/control.png">
                        <img src="./assets/images/detector/control.png" alt="Control">
                    </button>

                    <button class="image-item"  data-image="./assets/images/detector/borroso.png">
                        <img src="./assets/images/detector/borroso.png" alt="Borroso">
                    </button>

                </div>

                <div class="viewer-container">
                    <div class="image-preview">
                        <img id="preview-image" src="./assets/images/detector/perro.png" alt="Preview">
                        <canvas id="preview-canvas"></canvas>
                    </div>
                </div>
            </div>
        `,

        cards:`

            <div class="cards">

                <div class="card">
                    <h3>Modelo Activo</h3>
                    <p>MobileNet V2</p>
                </div>

                <div class="card">
                    <h3>Predicción</h3>
                    <p id="prediction-value">---</p>
                </div>

                <div class="card">
                    <h3>Confianza</h3>
                    <p id="confidence-value">---</p>
                </div>

                <div class="card">
                    <h3>Resolución Original</h3>
                    <p id="resolution-value">---</p>
                </div>

            </div>

        `
    });
}

export async function initImageDetection(){

    const imageItems =
    document.querySelectorAll(".image-item");

    const previewImage =
    document.querySelector("#preview-image");

    const confidenceValue =
    document.querySelector("#confidence-value");

    const predictionValue =
    document.querySelector("#prediction-value");

    const resolutionValue =
    document.querySelector("#resolution-value");

    await loadMobileNet();

    const canvas =
    document.querySelector("#preview-canvas");

    const ctx =
    canvas.getContext("2d");

    function resizeCanvas(){

        canvas.width =
        previewImage.clientWidth;

        canvas.height =
        previewImage.clientHeight;
    }

    async function predictCurrentImage(){

        resizeCanvas();

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const result =
        await classifyImage(previewImage);

        resolutionValue.textContent =
        `${previewImage.naturalWidth}x${previewImage.naturalHeight}`;

        if(!result){
            return;
        }

        if(result.confidence < 0.5){

            predictionValue.textContent =
            "---";

            confidenceValue.textContent =
            "---";



            ctx.fillStyle =
            "#ff004c";

            ctx.font =
            "bold 10rem Arial";

            ctx.textAlign =
            "center";

            ctx.textBaseline =
            "middle";

            ctx.fillText(
                "?",
                canvas.width / 2,
                canvas.height / 2
            );

            return;
        }

        predictionValue.textContent =
        result.label;

        confidenceValue.textContent =
        `${(result.confidence * 100).toFixed(2)}%`;
    }

    previewImage.onload = ()=>{

        predictCurrentImage();
    };

    imageItems.forEach((item)=>{

        item.addEventListener("click", ()=>{

            imageItems.forEach((btn)=>{

                btn.classList.remove("active");
            });

            item.classList.add("active");

            const imageSrc =
            item.dataset.image;

            previewImage.src =
            imageSrc;
        });
    });

    predictCurrentImage();
}