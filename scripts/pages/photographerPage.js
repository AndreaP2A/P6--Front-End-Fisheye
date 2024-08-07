import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";

//async function getPhotographerById(id) {
//const response = await fetch("/data/photographers.json");
//const data = await response.json();
//return data.photographers.find((photographer) => photographer.id == id);
//}

async function displayPhotographer(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  if (!photographerHeader) return;

  const photographerModel = new PhotographerTemplate(photographer, 2);
  const headerContent = photographerModel.getPhotographerHeaderDOM();

  photographerHeader.appendChild(headerContent);
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
