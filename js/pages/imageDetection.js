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
                    <p id="confidence-value">0%</p>
                </div>

                <div class="card">
                    <h3>Resolución</h3>
                    <p>640x480</p>
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

    await loadMobileNet();

    async function predictCurrentImage(){

        const result =
        await classifyImage(previewImage);

        if(result){


            predictionValue.textContent =
            result.label;

            confidenceValue.textContent =
            `${(result.confidence * 100).toFixed(2)}%`;
        }
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