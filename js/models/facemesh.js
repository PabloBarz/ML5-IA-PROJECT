let faceMeshModel;

export async function loadFaceMesh(){

    faceMeshModel =
    await ml5.faceMesh({
        maxFaces:1,
        refineLandmarks:false,
        flipHorizontal: false
    });

    return faceMeshModel;
}

export async function detectFaces(video){

    if(!faceMeshModel){
        return [];
    }

    const results =
    await faceMeshModel.detect(video);

    return results;
}