function mediaFactory(media) {
  if (media.image) {
    return createImageElement(media);
  } else if (media.video) {
    return createVideoElement(media);
  }
  throw new Error("Unknown media type");

  function createImageElement(media) {
    const img = document.createElement("img");
    img.setAttribute("src", `assets/media/${media.image}`);
    img.setAttribute("alt", media.title);
    return img;
  }

  function createVideoElement(media) {
    const video = document.createElement("video");
    video.setAttribute("src", `assets/media/${media.video}`);
    video.setAttribute("controls", true);
    return video;
  }
}

export { mediaFactory };
