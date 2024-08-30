import { trapFocus } from "./focusTrap.js";
import { MediaFactory } from "../factories/mediaFactory.js";

export class Lightbox {
  /**
   * Represents a Lightbox object.
   * @constructor
   * @param {string} photographerName - The name of the photographer.
   * @param {Array} sortedMedia - The sorted media array.
   */
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

  /**
   * Initializes the lightbox functionality.
   *
   * @memberof Lightbox
   * @function init
   * @instance
   * @description Binds event listeners to the close, next, and previous buttons.
   */
  init() {
    this.closeModalButton.addEventListener("click", () => this.closeLightbox());
    this.nextButton.addEventListener("click", () => this.showNextMedia());
    this.prevButton.addEventListener("click", () => this.showPrevMedia());
  }

  /**
   * Opens the lightbox and displays the media at the specified index (sorted).
   *
   * @param {number} index - The index of the media to be displayed in the lightbox (sorted).
   * @returns {void}
   */
  openLightbox(index) {
    this.currentMediaIndex = index;
    this.lightboxModal.style.display = "flex";
    this.displayMediaInLightbox(this.sortedMedia[this.currentMediaIndex]);

    const firstFocusableElement = this.lightboxModal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement.focus();

    trapFocus(this.lightboxModal);
  }

  /**
   * Closes the lightbox modal.
   */
  closeLightbox() {
    this.lightboxModal.style.display = "none";

    const triggerElement = document.querySelector(
      '.item[aria-haspopup="dialog"]'
    );
    if (triggerElement) {
      triggerElement.focus();
    }
  }

  /**
   * Displays the given media item in a lightbox.
   *
   * @param {Object} mediaItem - The media item to be displayed.
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
   * Shows the next media in the lightbox.
   */
  showNextMedia() {
    if (this.currentMediaIndex < this.sortedMedia.length - 1) {
      this.openLightbox(this.currentMediaIndex + 1);
    }
  }

  /**
   * Shows the previous media in the lightbox.
   */
  showPrevMedia() {
    if (this.currentMediaIndex > 0) {
      this.openLightbox(this.currentMediaIndex - 1);
    }
  }

  /**
   * Handles the click event on a media item element within a media container.
   *
   * @param {HTMLElement} mediaItemElement - The clicked media item element.
   * @param {HTMLElement} mediaContainer - The container element that holds the media items.
   * @returns {void}
   */
  handleMediaClick(mediaItemElement, mediaContainer) {
    const index = Array.from(mediaContainer.children).indexOf(mediaItemElement);
    this.openLightbox(index);
  }
}
