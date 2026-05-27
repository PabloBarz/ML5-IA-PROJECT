export function renderViewerLayout(config){

    return `

        <header class="content-header">

            <div>
                <h2>${config.title}</h2>
                <p>${config.description}</p>
            </div>

            <div class="camera-status">
                <div class="camera-dot"></div>
                <span>${config.status}</span>
            </div>

        </header>

        <div class="viewer">

            <div class="viewer-overlay">
                <h3>${config.overlay}</h3>
            </div>

        </div>

        ${config.cards || ""}

    `;
}