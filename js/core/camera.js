export function setupP5Camera(p,width,height){

    const video =
    p.createCapture(p.VIDEO);

    video.size(width,height);
    video.hide();

    return video;
}