let handPoseModel;

export async function loadHandPose(){

    handPoseModel =
    await ml5.handPose({
        maxHands:2,
    });

    return handPoseModel;
}

export async function detectHands(video){

    if(!handPoseModel){
        return [];
    }

    const results =
    await handPoseModel.detect(video);

    return results;
}