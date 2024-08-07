class MediaFactory {
  constructor(media, photographerName) {
    this.media = media;
    this.photographerName = photographerName; // Use photographerName directly
  }

  createMediaElement() {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-item");

    const mediaPath = `assets/images/${this.photographerName}/${
      this.media.image || this.media.video
    }`;

    if (this.media.image) {
      const img = document.createElement("img");
      img.src = mediaPath;
      img.alt = this.media.title;
      mediaDiv.appendChild(img);
    } else if (this.media.video) {
      const video = document.createElement("video");
      video.controls = true;
      const source = document.createElement("source");
      source.src = mediaPath;
      source.type = "video/mp4";
      video.appendChild(source);
      mediaDiv.appendChild(video);
    }

    return mediaDiv;
  }
}

export { MediaFactory };
