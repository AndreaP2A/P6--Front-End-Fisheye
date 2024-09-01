import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";
import { Lightbox } from "../utils/lightbox.js";

let sortedMedia = []; // Keep track of sorted media globally

/**
 * Displays the photographer's information and media on the page.
 *
 * @param {Object} photographer - The photographer object.
 * @returns {Promise<void>} - A promise that resolves when the photographer's information and media are displayed.
 */
async function displayPhotographer(photographer) {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = "";

  // Create and append photographer hero header
  const photographerHeader = document.createElement("div");
  photographerHeader.classList.add("photograph-header");

  const media = await api.fetchMediaByPhotographerId(photographer.id);

  if (!media || media.length === 0) {
    console.error(
      "Aucun média n'a été trouvé pour ce photographe:",
      photographer.id
    );
    return;
  }

  sortedMedia = [...media]; // Initialize sortedMedia with the fetched media

  const photographerModel = new PhotographerTemplate(photographer, media);
  const headerContent = photographerModel.getPhotographerHeaderDOM();
  photographerHeader.appendChild(headerContent);

  main.appendChild(photographerHeader);

  // Create and append sort container
  const sortContainer = document.createElement("div");
  sortContainer.classList.add("sort-container");

  const sortLabel = document.createElement("label");
  sortLabel.setAttribute("for", "sort-by");
  sortLabel.textContent = "Trier par ";
  sortLabel.setAttribute("aria-label", "Trier par");
  sortLabel.setAttribute("tabindex", "0");

  const sortSelect = document.createElement("select");
  sortSelect.id = "sort-by";
  sortSelect.setAttribute("tabindex", "0");

  const options = [
    { value: "likes", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    option.setAttribute("aria-label", optionData.text);
    sortSelect.appendChild(option);
  });

  sortContainer.appendChild(sortLabel);
  sortContainer.appendChild(sortSelect);
  main.appendChild(sortContainer);

  // Create and append media container
  let mediaContainer = photographerModel.getMediaDOM();
  main.appendChild(mediaContainer);

  // Initialize the lightbox
  const lightbox = new Lightbox(photographer.name, sortedMedia);

  // Add event listener for sorting
  sortSelect.addEventListener("change", () => {
    sortedMedia = sortMedia(media, sortSelect.value);
    mediaContainer.innerHTML = "";
    sortedMedia.forEach((mediaItem) => {
      const mediaFactory = new PhotographerTemplate(photographer, [mediaItem]);
      const mediaElement = mediaFactory.getMediaDOM();
      mediaContainer.appendChild(mediaElement.firstChild);
    });
    lightbox.sortedMedia = sortedMedia; // Update lightbox with new sorted media
  });

  // Add event listener for media clicks to open lightbox
  mediaContainer.addEventListener("click", (event) => {
    const mediaItemElement = event.target.closest(".item");
    if (mediaItemElement) {
      lightbox.handleMediaClick(mediaItemElement, mediaContainer);
    }
  });

  // Add event listener for media keypress to open lightbox
  mediaContainer.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const mediaItemElement = event.target.closest(".item");
      if (mediaItemElement) {
        lightbox.handleMediaClick(mediaItemElement, mediaContainer);
      }
    }
  });

  // Calculate total likes
  const totalLikes = sortedMedia.reduce(
    (sum, mediaItem) => sum + mediaItem.likes,
    0
  );

  // Create and append the price and likes div
  const priceLikesButton = document.createElement("div");
  priceLikesButton.classList.add("price-likes-button");
  priceLikesButton.setAttribute("tabindex", "0");

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("likes-container");
  likesContainer.setAttribute("aria-label", "likes");

  const likesElement = document.createElement("p");
  likesElement.classList.add("total-likes");
  likesElement.textContent = `${totalLikes}`;
  likesElement.setAttribute("aria-label", `${totalLikes} likes`);
  likesElement.setAttribute("aria-hidden", "true");

  const heartIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  heartIcon.setAttribute("width", "29");
  heartIcon.setAttribute("height", "22");
  heartIcon.setAttribute("viewBox", "0 0 21 24");
  heartIcon.setAttribute("fill", "black");
  heartIcon.setAttribute("aria-hidden", "true");
  heartIcon.classList.add("heart-icon");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z"
  );
  path.setAttribute("fill", "black");
  path.setAttribute("stroke", "black");
  heartIcon.appendChild(path);

  likesContainer.appendChild(likesElement);
  likesContainer.appendChild(heartIcon);

  const priceElement = document.createElement("p");
  priceElement.classList.add("price");
  priceElement.textContent = `${photographer.price} € / jour`;
  priceElement.setAttribute(
    "aria-label",
    `${photographer.price} euros par jour`
  );

  priceLikesButton.appendChild(likesContainer);
  priceLikesButton.appendChild(priceElement);

  // Append the price-likes-button to the appropriate place in the DOM
  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    imageContainer.insertAdjacentElement("afterend", priceLikesButton);
  } else {
    // If the imageContainer isn't found, fall back to appending it at the end of the main
    main.appendChild(priceLikesButton);
  }
}

/**
 * Sorts the given media array based on the specified criteria.
 *
 * @param {Array} media - The array of media objects to be sorted.
 * @param {string} criteria - The criteria to sort the media by. Possible values are "likes", "date", and "title".
 * @returns {Array} - The sorted media array.
 */
function sortMedia(media, criteria) {
  return media.slice().sort((a, b) => {
    if (criteria === "likes") {
      return b.likes - a.likes;
    } else if (criteria === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (criteria === "title") {
      return a.title.localeCompare(b.title);
    }
  });
}

/**
 * Initializes the photographer page.
 * Retrieves the photographer ID from the URL parameters and fetches the corresponding photographer data from the API.
 * If the photographer is found, it displays the photographer's information.
 * Otherwise, it logs an error message.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const photographer = await api.fetchPhotographerById(id);
    if (photographer) {
      displayPhotographer(photographer);
    } else {
      console.error("Photographer not found");
    }
  } else {
    console.error("No photographer ID provided in the URL");
  }
}

init();
