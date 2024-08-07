import { MediaFactory } from "../factories/mediaFactory.js";

class PhotographerTemplate {
  constructor(data, mediaItems, tabindexStart) {
    this.data = data;
    this.mediaItems = mediaItems;
    this.tabindexStart = tabindexStart;
    this.picture = `assets/photographers/${data.portrait}`;
    this.photographerName = data.name; // Store photographer name for media path (assets/images/photographer's name/ ...)
    this.mediaPaths = this.mediaItems.map((item) => {
      const basePath = `assets/images/${this.photographerName}/`;
      const fileName = item.image || item.video;
      if (fileName) {
        return `${basePath}${fileName}`;
      } else {
        console.error("Missing file name for media item:", item);
        return "";
      }
    });
  }

  // Photographer card on the index
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
    description.setAttribute(
      "aria-label",
      `${this.data.location}, ${this.data.tagline}, ${this.data.price}`
    );
    description.setAttribute("role", "presentation");
    description.setAttribute("tabindex", this.tabindexStart + 1);

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

  // Photographer card on the hero header of their page
  getPhotographerHeaderDOM() {
    const { name, city, country, tagline } = this.data;

    // Create the container for the header
    const header = document.createElement("div");
    header.className = "photograph-header-container";

    // Create div for name, location, and tagline
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

    // Create div for the contact button
    const contactButtonDiv = document.createElement("div");
    contactButtonDiv.classList.add("contact-button-container");

    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.innerText = "Contactez-moi";
    contactButton.setAttribute("onclick", "displayModal()");
    contactButtonDiv.appendChild(contactButton);

    // Create div for the photographer's image
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image-container");

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", name);
    imgDiv.appendChild(img);

    // Append everything to the header
    header.appendChild(infoDiv);
    header.appendChild(contactButtonDiv);
    header.appendChild(imgDiv);

    return header; // Ensure this returns a DOM element
  }

  // Portfolio on their page, with a media factory
  getMediaDOM() {
    const container = document.createElement("div");
    container.classList.add("media-container");

    this.mediaItems.forEach((mediaItem) => {
      const mediaFactory = new MediaFactory(mediaItem, this.photographerName);
      const mediaElement = mediaFactory.createMediaElement();

      const mediaDiv = document.createElement("div");
      mediaDiv.classList.add("media-item");

      const captionDiv = document.createElement("div");
      captionDiv.classList.add("caption");

      const title = document.createElement("p");
      title.innerText = mediaItem.title;
      title.classList.add("media-title");

      const likes = document.createElement("p");
      likes.innerText = `${mediaItem.likes} likes`;
      likes.classList.add("media-likes");

      captionDiv.appendChild(title);
      captionDiv.appendChild(likes);

      mediaDiv.appendChild(mediaElement);
      mediaDiv.appendChild(captionDiv);

      container.appendChild(mediaDiv);
    });

    return container;
  }
}

export { PhotographerTemplate };
