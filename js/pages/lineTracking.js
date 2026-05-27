import { renderViewerLayout }
from "../components/viewerLayout.js";

export function renderLineTracking(){

    return renderViewerLayout({

        title:"Línea entre Manos",
        description:"Seguimiento de dedos en tiempo real",
        status:"Tracking Activo",
        overlay:"HAND TRACKING"
    });
}