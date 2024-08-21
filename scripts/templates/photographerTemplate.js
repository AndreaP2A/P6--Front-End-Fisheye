import { MediaFactory } from "../factories/mediaFactory.js";
import { displayModal } from "../utils/contactForm.js";

class PhotographerTemplate {
  constructor(data, mediaItems = [], tabindexStart) {
    this.data = data;
    this.mediaItems = Array.isArray(mediaItems) ? mediaItems : [];
    this.tabindexStart = tabindexStart;
    this.picture = `assets/photographers/${data.portrait}`;
    this.photographerName = data.name; // Store photographer name for media path (assets/images/photographer's name/ ...)
  }

  /**
   * Photographer card on the index
   * @returns {HTMLElement} User card container
   */
  getUserCardDOM() {
    const { name, city, country, tagline, price } = this.data;
    const article = document.createElement("article");

    const params = new URLSearchParams({ id: this.data.id });

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?${params.toString()}`);
    link.setAttribute("class", "link");
    link.setAttribute("aria-label", name);
    link.setAttribute("tabindex", this.tabindexStart);
    link.style.cursor = "pointer";

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", name);
    img.style.cursor = "pointer";

    const h2 = document.createElement("h2");
    h2.innerText = name;
    h2.style.cursor = "pointer";

    link.appendChild(img);
    link.appendChild(h2);

    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.setAttribute("role", "presentation");
    description.setAttribute("tabindex", this.tabindexStart + 1);

    const location = document.createElement("p");
    location.innerText = `${city}, ${country}`;
    location.setAttribute("class", "location");
    location.setAttribute("aria-label", `${city}, ${country}`);

    const taglineElement = document.createElement("p");
    taglineElement.innerText = tagline;
    taglineElement.setAttribute("class", "tagline");
    taglineElement.setAttribute("aria-label", `${tagline}`);

    const priceElement = document.createElement("p");
    priceElement.innerText = `${price}€/jour`;
    priceElement.setAttribute("class", "price");
    priceElement.setAttribute("aria-label", `${price} euros par jour`);

    description.appendChild(location);
    description.appendChild(taglineElement);
    description.appendChild(priceElement);

    article.appendChild(link);
    article.appendChild(description);

    return article;
  }

  /**
   * Photographer card on the hero header of their page
   * @returns {HTMLElement} Header container
   */
  getPhotographerHeaderDOM() {
    const { name, city, country, tagline } = this.data;

    const header = document.createElement("div");
    header.className = "photograph-header-container";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const h2 = document.createElement("h2");
    h2.innerText = name;
    infoDiv.appendChild(h2);

    const location = document.createElement("p");
    location.innerText = `${city}, ${country}`;
    location.classList.add("location");
    infoDiv.appendChild(location);

    const taglineElement = document.createElement("p");
    taglineElement.innerText = tagline;
    taglineElement.classList.add("tagline");
    infoDiv.appendChild(taglineElement);

    // Contact button (removed from hardcoded HTML to be generated through here instead)
    const contactButtonDiv = document.createElement("div");
    contactButtonDiv.classList.add("contact-button-container");

    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.innerText = "Contactez-moi";

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

      const mediaDiv = document.createElement("div");
      mediaDiv.classList.add("item");

      const captionDiv = document.createElement("div");
      captionDiv.classList.add("caption");

      const title = document.createElement("p");
      title.innerText = mediaItem.title;
      title.classList.add("media-title");

      const likeCountsDiv = document.createElement("div");
      likeCountsDiv.classList.add("like-counts");

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

      likeIcon.addEventListener("click", () =>
        this.toggleLike(likeIcon, likeCountsDiv, mediaItem)
      );

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
   *
   * @param {*} likeIcon
   * @param {*} likeCountsDiv
   * @param {*} mediaItem
   */
  toggleLike(likeIcon, likeCountsDiv, mediaItem) {
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
    } else {
      likeIcon.querySelector("path").setAttribute("fill", "none"); // Heart empty but with outline if "unliked"
      likeIcon
        .querySelector("path")
        .setAttribute("stroke", "var(--secondary-color)");
      likeCountsDiv.querySelector(".media-likes").textContent = `${
        currentLikes - 1
      }`;
    }
  }
}

export { PhotographerTemplate };
