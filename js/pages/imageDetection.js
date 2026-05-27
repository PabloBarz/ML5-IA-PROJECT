import { renderViewerLayout }
from "../components/viewerLayout.js";

export function renderImageDetection(){

    return renderViewerLayout({

        title:"Detector de Imágenes",
        description:"Reconocimiento de objetos con IA",
        status:"Sistema Activo",

        overlay:`

            <div class="image-detection">
                <div class="image-list">

                    <button class="image-item active">
                        <img src="./assets/images/detector/perro.png" alt="Perro">
                    </button>

                    <button class="image-item">
                        <img src="./assets/images/detector/gato.png" alt="Gato">
                    </button>

                    <button class="image-item">
                        <img src="./assets/images/detector/jirafa.png" alt="Jirafa">
                    </button>

                    <button class="image-item">
                        <img src="./assets/images/detector/control.png" alt="Control">
                    </button>

                    <button class="image-item">
                        <img src="./assets/images/detector/borroso.png" alt="Borroso">
                    </button>

                </div>

                <div class="viewer-container">
                    <div class="image-preview">
                        <img src="./assets/images/detector/jirafa.png"
                            alt="Preview">
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
                    <h3>Confianza</h3>
                    <p>97.4%</p>
                </div>

                <div class="card">
                    <h3>FPS</h3>
                    <p>28.7</p>
                </div>

                <div class="card">
                    <h3>Resolución</h3>
                    <p>640x480</p>
                </div>

            </div>

        `
    });
}