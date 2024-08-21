import { MediaFactory } from "../factories/mediaFactory.js";

export class Lightbox {
  constructor(photographerName, sortedMedia) {
    this.photographerName = photographerName;
    this.sortedMedia = sortedMedia;
    this.currentMediaIndex = 0;
    this.lightboxModal = document.getElementById("lightbox_modal");
    this.lightboxContent = this.lightboxModal.querySelector(
      ".lightbox-media-container"
    );
    this.closeModalButton = this.lightboxModal.querySelector(".lightbox-close");
    this.prevButton = this.lightboxModal.querySelector(".lightbox-prev");
    this.nextButton = this.lightboxModal.querySelector(".lightbox-next");
    this.titleElement = this.lightboxModal.querySelector(
      ".lightbox-media-title"
    );

    this.init();
  }

  init() {
    this.closeModalButton.addEventListener("click", () => this.closeLightbox());
    this.nextButton.addEventListener("click", () => this.showNextMedia());
    this.prevButton.addEventListener("click", () => this.showPrevMedia());
  }

  /**
   *
   * @param {*} index
   */
  openLightbox(index) {
    this.currentMediaIndex = index;
    this.lightboxModal.style.display = "flex";
    this.displayMediaInLightbox(this.sortedMedia[this.currentMediaIndex]);
  }

  closeLightbox() {
    this.lightboxModal.style.display = "none";
  }

  /**
   *
   * @param {*} mediaItem
   */
  displayMediaInLightbox(mediaItem) {
    this.lightboxContent.innerHTML = "";
    const mediaFactory = new MediaFactory(mediaItem, this.photographerName);
    const mediaElement = mediaFactory.createMediaElement();

    this.lightboxContent.appendChild(mediaElement);

    if (mediaItem.title) {
      this.titleElement.textContent = mediaItem.title;
    }
  }

  showNextMedia() {
    if (this.currentMediaIndex < this.sortedMedia.length - 1) {
      this.openLightbox(this.currentMediaIndex + 1);
    }
  }

  showPrevMedia() {
    if (this.currentMediaIndex > 0) {
      this.openLightbox(this.currentMediaIndex - 1);
    }
  }

  /**
   *
   * @param {*} mediaItemElement
   * @param {*} mediaContainer
   */
  handleMediaClick(mediaItemElement, mediaContainer) {
    const index = Array.from(mediaContainer.children).indexOf(mediaItemElement);
    this.openLightbox(index);
  }
}
