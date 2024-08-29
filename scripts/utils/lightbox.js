import { MediaFactory } from "../factories/mediaFactory.js";
import { setFocus, trapFocus } from "./focus.js";

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
    this.lastFocusedElement = null;
    this.removeFocusTrap = null;

    this.init();
  }

  init() {
    this.closeModalButton.addEventListener("click", () => this.closeLightbox());
    this.nextButton.addEventListener("click", () => this.showNextMedia());
    this.prevButton.addEventListener("click", () => this.showPrevMedia());

    // Close lightbox on 'Escape' key press
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.lightboxModal.style.display === "flex"
      ) {
        this.closeLightbox();
      }
    });
  }

  /**
   * Open the lightbox and display the media at the given index.
   * @param {number} index - The index of the media item to display.
   */
  openLightbox(index) {
    this.currentMediaIndex = index;
    this.lastFocusedElement = document.activeElement; // Save the last focused element
    this.lightboxModal.style.display = "flex";
    this.displayMediaInLightbox(this.sortedMedia[this.currentMediaIndex]);

    // Focus management
    const firstFocusableElement = this.lightboxModal.querySelector("button");
    this.removeFocusTrap = trapFocus(this.lightboxModal, () => {
      this.lightboxModal.style.display = "none";
      setFocus(this.lastFocusedElement);
    });

    if (firstFocusableElement) setFocus(firstFocusableElement);
  }

  /**
   * Close the lightbox and restore focus to the previously focused element.
   */
  closeLightbox() {
    if (this.lightboxModal.style.display === "flex") {
      this.lightboxModal.style.display = "none";

      // Remove focus trap
      if (this.removeFocusTrap) {
        this.removeFocusTrap();
      }
    }
  }

  /**
   * Display the media item in the lightbox.
   * @param {object} mediaItem - The media item to display.
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

  /**
   * Show the next media item in the lightbox.
   */
  showNextMedia() {
    if (this.currentMediaIndex < this.sortedMedia.length - 1) {
      this.openLightbox(this.currentMediaIndex + 1);
    }
  }

  /**
   * Show the previous media item in the lightbox.
   */
  showPrevMedia() {
    if (this.currentMediaIndex > 0) {
      this.openLightbox(this.currentMediaIndex - 1);
    }
  }

  /**
   * Handle media item click to open the lightbox.
   * @param {HTMLElement} mediaItemElement - The media item element that was clicked.
   * @param {HTMLElement} mediaContainer - The container holding media items.
   */
  handleMediaClick(mediaItemElement, mediaContainer) {
    const index = Array.from(mediaContainer.children).indexOf(mediaItemElement);
    this.openLightbox(index);
  }
}
