import { renderViewerLayout }
from "../components/viewerLayout.js";

export function renderImageDetection(){

    return renderViewerLayout({

        title:"Detector de Imágenes",
        description:"Reconocimiento de objetos con IA",
        status:"Sistema Activo",
        overlay:"VISUALIZACIÓN IA",
        
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