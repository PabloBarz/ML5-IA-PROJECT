let classifier = null;

/* =========================
   LOAD MODEL
========================= */

export async function loadMobileNet(){

    classifier =
    await ml5.imageClassifier("MobileNet");
}

/* =========================
   CLASSIFY IMAGE
========================= */

export async function classifyImage(imageElement){

    if(!classifier){

        return null;
    }

    const results =
    await classifier.classify(imageElement);

    console.log(results)
    console.log(results[0])

    return results[0];
}