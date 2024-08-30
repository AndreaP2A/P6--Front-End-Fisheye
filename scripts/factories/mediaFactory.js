class MediaFactory {
  constructor(media, photographerName) {
    this.media = media;
    this.photographerName = photographerName;
  }

  createMediaElement() {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media");

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

    mediaDiv.setAttribute("aria-label", this.media.title); // Add aria-label to media element for accessibility

    return mediaDiv;
  }
}

export { MediaFactory };
