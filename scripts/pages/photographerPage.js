import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";
import { Lightbox } from "../utils/lightbox.js"; // Import Lightbox

let sortedMedia = []; // Keep track of sorted media globally

/**
 *
 * @param {*} photographer
 * @returns {HTMLElement} Photographer information
 */
async function displayPhotographer(photographer) {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = ""; // Clear existing content

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
  sortLabel.setAttribute("aria-label", "Order by");
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
    option.setAttribute("aria-label", optionData.text); // Ensure each option is labeled
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

  const likesElement = document.createElement("p");
  likesElement.classList.add("total-likes");
  likesElement.textContent = `${totalLikes}`;
  likesElement.setAttribute("aria-label", `${totalLikes} likes`);

  const heartIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  heartIcon.setAttribute("width", "29");
  heartIcon.setAttribute("height", "22");
  heartIcon.setAttribute("viewBox", "0 0 21 24");
  heartIcon.setAttribute("fill", "black");
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

  document.body.appendChild(priceLikesButton); // Append to body so it overlays other content
}

/**
 *
 * @param {*} media
 * @param {*} criteria
 * @returns {Array} Sorting function on the portfolio
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
 * Initialize the page
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
