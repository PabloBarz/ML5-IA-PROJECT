export async function setupCamera(video){

    const stream =
    await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false
    });

    video.srcObject =
    stream;

    await video.play();

    return video;
}