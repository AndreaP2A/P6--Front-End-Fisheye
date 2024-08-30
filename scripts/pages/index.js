import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";

/**
 * Displays the data of photographers.
 *
 * @param {Array} photographers - An array of photographer objects.
 * @returns {void}
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

/**
 * Initializes the page by fetching photographers' data and displaying it.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  const photographers = await api.fetchPhotographers();
  displayData(photographers);
}

init();
