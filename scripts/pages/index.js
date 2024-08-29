import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";

/**
 *
 * @param {*} photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  let tabindex = 2;

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerTemplate(photographer, tabindex);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    tabindex += 2;
  });
}

async function init() {
  const photographers = await api.fetchPhotographers();
  displayData(photographers);
}

init();
