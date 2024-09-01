import { MediaFactory } from "../factories/mediaFactory.js";
import { displayModal } from "../utils/contactForm.js";

/**
 * Represents a photographer template.
 * @class
 * @param {Object} data - The data object containing photographer information.
 * @param {Array} [mediaItems=[]] - The array of media items associated with the photographer.
 * @param {number} tabindexStart - The starting tabindex value for the template.
 */
class PhotographerTemplate {
  constructor(data, mediaItems = [], tabindexStart) {
    this.data = data;
    this.mediaItems = Array.isArray(mediaItems) ? mediaItems : [];
    this.tabindexStart = tabindexStart;
    this.picture = `assets/photographers/${data.portrait}`;
    this.photographerName = data.name; // Store photographer name for media path (assets/images/photographer's name/ ...)
  }

  /**
   * Photographer card on the index.html
   * @returns {HTMLElement} User card container
   */
  getUserCardDOM() {
    const { name, city, country, tagline, price } = this.data;
    const article = document.createElement("article");

    const params = new URLSearchParams({ id: this.data.id });

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?${params.toString()}`);
    link.setAttribute("class", "link");
    link.setAttribute("tabindex", "0");
    link.setAttribute("aria-label", name);
    link.style.cursor = "pointer";

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", "");
    img.setAttribute("aria-hidden", "true");
    img.style.cursor = "pointer";

    const h2 = document.createElement("h2");
    h2.innerText = name;
    h2.style.cursor = "pointer";

    link.appendChild(img);
    link.appendChild(h2);

    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.setAttribute("role", "presentation");
    description.setAttribute("tabindex", "0");
    description.setAttribute(
      "aria-label",
      `${city}, ${country}, ${tagline}, ${price} euros par jour`
    );

    const location = document.createElement("p");
    location.innerText = `${city}, ${country}`;
    location.setAttribute("class", "location");

    const taglineElement = document.createElement("p");
    taglineElement.innerText = tagline;
    taglineElement.setAttribute("class", "tagline");

    const priceElement = document.createElement("p");
    priceElement.innerText = `${price}€/jour`;
    priceElement.setAttribute("class", "price");

    description.appendChild(location);
    description.appendChild(taglineElement);
    description.appendChild(priceElement);

    article.appendChild(link);
    article.appendChild(description);

    return article;
  }

  /**
   * Photographer card on the hero header of their page
   * @returns {HTMLElement} Hero-header container
   */
  getPhotographerHeaderDOM() {
    const { name, city, country, tagline } = this.data;

    const header = document.createElement("div");
    header.className = "photograph-header-container";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const h2 = document.createElement("h2");
    h2.innerText = name;
    h2.setAttribute("tabindex", "0"); // Make the photographer's name focusable
    infoDiv.appendChild(h2);

    const location = document.createElement("p");
    location.innerText = `${city}, ${country}`;
    location.classList.add("location");
    location.setAttribute("tabindex", "0");
    infoDiv.appendChild(location);

    const taglineElement = document.createElement("p");
    taglineElement.innerText = tagline;
    taglineElement.classList.add("tagline");
    taglineElement.setAttribute("tabindex", "0");
    infoDiv.appendChild(taglineElement);

    // Contact button (removed from hardcoded HTML to be generated through here instead)
    const contactButtonDiv = document.createElement("div");
    contactButtonDiv.classList.add("contact-button-container");

    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.innerText = "Contactez-moi";
    contactButton.setAttribute("aria-label", "Contactez-moi");
    contactButton.setAttribute("tabindex", "0");
    contactButton.setAttribute("aria-haspopup", "dialog");

    contactButton.addEventListener("click", () =>
      displayModal(this.photographerName)
    );
    contactButtonDiv.appendChild(contactButton);

    // Profile Pic
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image-container");

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", name);
    imgDiv.appendChild(img);
    img.setAttribute("tabindex", "0"); // Make profile picture focusable
    // Append everything to the hero header
    header.appendChild(infoDiv);
    header.appendChild(contactButtonDiv);
    header.appendChild(imgDiv);

    return header;
  }

  /**
   * Portfolio on their page, with a media factory
   * @returns {HTMLElement} Portfolio container
   */
  getMediaDOM() {
    const container = document.createElement("div");
    container.classList.add("portfolio");

    this.mediaItems.forEach((mediaItem) => {
      const mediaFactory = new MediaFactory(mediaItem, this.photographerName);
      const mediaElement = mediaFactory.createMediaElement();
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("aria-label", mediaItem.title);

      const mediaDiv = document.createElement("div");
      mediaDiv.classList.add("item");

      const captionDiv = document.createElement("div");
      captionDiv.classList.add("caption");

      const title = document.createElement("p");
      title.innerText = mediaItem.title;
      title.classList.add("media-title");
      title.setAttribute("tabindex", "0");

      const likeCountsDiv = document.createElement("div");
      likeCountsDiv.classList.add("like-counts");
      likeCountsDiv.setAttribute("tabindex", "0");
      likeCountsDiv.setAttribute("aria-label", `${mediaItem.likes} likes`);

      const likeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      likeIcon.setAttribute("width", "21");
      likeIcon.setAttribute("height", "24");
      likeIcon.setAttribute("viewBox", "0 0 21 24");
      likeIcon.setAttribute("fill", "none");
      likeIcon.classList.add("like-icon");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z"
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "var(--secondary-color)");
      likeIcon.appendChild(path);

      // Prevent lightbox from opening when like icon is clicked (issue #4)
      likeIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleLike(likeIcon, likeCountsDiv);
      });

      likeCountsDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleLike(likeIcon, likeCountsDiv);
      });

      // Add keyboard accessibility for .like-counts
      likeCountsDiv.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.toggleLike(likeIcon, likeCountsDiv);
        }
      });

      const likesElement = document.createElement("p");
      likesElement.classList.add("media-likes");
      likesElement.textContent = `${mediaItem.likes}`;

      likeCountsDiv.appendChild(likeIcon);
      likeCountsDiv.appendChild(likesElement);

      captionDiv.appendChild(title);
      captionDiv.appendChild(likeCountsDiv);

      mediaDiv.appendChild(mediaElement);
      mediaDiv.appendChild(captionDiv);

      container.appendChild(mediaDiv);
    });

    return container;
  }

  /**
   * Toggles the like status of a media item and updates the like count.
   *
   * @param {HTMLElement} likeIcon - The like icon element.
   * @param {HTMLElement} likeCountsDiv - The container element for displaying the like count.
   * @returns {void}
   */
  toggleLike(likeIcon, likeCountsDiv) {
    const isLiked = likeIcon.classList.toggle("liked");
    let currentLikes =
      parseInt(
        likeCountsDiv
          .querySelector(".media-likes")
          .textContent.replace(" likes", "")
      ) || 0;

    if (isLiked) {
      likeIcon
        .querySelector("path")
        .setAttribute("fill", "var(--secondary-color)"); // Heart full if "liked"
      likeIcon.querySelector("path").setAttribute("stroke", "none");
      likeCountsDiv.querySelector(".media-likes").textContent = `${
        currentLikes + 1
      }`;
      this.updateTotalLikes(1); // Increment total likes
    } else {
      likeIcon.querySelector("path").setAttribute("fill", "none"); // Heart empty but with outline if "unliked"
      likeIcon
        .querySelector("path")
        .setAttribute("stroke", "var(--secondary-color)");
      likeCountsDiv.querySelector(".media-likes").textContent = `${
        currentLikes - 1
      }`;
      this.updateTotalLikes(-1); // Decrement total likes
    }
  }

  /**
   * Updates the total number of likes.
   *
   * @param {number} change - The change in the total number of likes.
   * @returns {void}
   */
  updateTotalLikes(change) {
    const totalLikesElement = document.querySelector(".total-likes");
    const currentTotalLikes = parseInt(totalLikesElement.textContent, 10);
    totalLikesElement.textContent = currentTotalLikes + change;
  }
}

export { PhotographerTemplate };
