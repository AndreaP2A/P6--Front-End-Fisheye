import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";

async function displayPhotographer(photographer) {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = ""; // Clear existing content

  // Create and append photographer hero header
  const photographerHeader = document.createElement("div");
  photographerHeader.classList.add("photograph-header");

  const media = await api.fetchMediaByPhotographerId(photographer.id);

  // Check if media is correctly fetched
  if (!media || media.length === 0) {
    console.error(
      "Aucun média n'a été trouvé pour ce photographe:",
      photographer.id
    );
    return;
  }

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

  // Add event listener for sorting
  sortSelect.addEventListener("change", () => {
    const sortedMedia = sortMedia(media, sortSelect.value);
    // Clear existing media container
    mediaContainer.innerHTML = "";
    // Re-render the sorted media
    sortedMedia.forEach((mediaItem) => {
      const mediaFactory = new PhotographerTemplate(photographer, [mediaItem]);
      const mediaElement = mediaFactory.getMediaDOM();
      mediaContainer.appendChild(mediaElement.firstChild);
    });
  });
}

// Sorting function
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
