export function renderImageDetection(){

    return `
    
        <header class="content-header">

            <div>
                <h2>Detector de Imágenes</h2>
                <p>Reconocimiento de objetos con IA</p>
            </div>

            <div class="camera-status">
                <div class="camera-dot"></div>
                <span>Sistema Activo</span>
            </div>

        </header>

        <div class="viewer">

            <div class="viewer-overlay">
                <h3>VISUALIZACIÓN IA</h3>
            </div>

        </div>

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

    `;
}