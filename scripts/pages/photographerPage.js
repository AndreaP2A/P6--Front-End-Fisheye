import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";
import { Lightbox } from "../utils/lightbox.js"; // Import Lightbox

let sortedMedia = []; // Keep track of sorted media globally

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

  const sortSelect = document.createElement("select");
  sortSelect.id = "sort-by";
  sortSelect.setAttribute("aria-label", "Trier les médias");

  const options = [
    { value: "likes", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
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

  const likesElement = document.createElement("p");
  likesElement.classList.add("total-likes");
  likesElement.textContent = `${totalLikes} ♥`;

  const priceElement = document.createElement("p");
  priceElement.classList.add("price");
  priceElement.textContent = `${photographer.price} € / jour`;

  priceLikesButton.appendChild(likesElement);
  priceLikesButton.appendChild(priceElement);

  document.body.appendChild(priceLikesButton); // Append to body so it overlays other content
}

// Sorting function

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
