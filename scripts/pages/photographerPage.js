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

  // Create and append media container
  const mediaContainer = photographerModel.getMediaDOM();

  main.appendChild(mediaContainer);
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const photographer = await api.fetchPhotographerById(id);
    if (photographer) {
      displayPhotographer(photographer);
    }
  }
}

init();
