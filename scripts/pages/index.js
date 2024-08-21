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
/**
 * API class to fetch data from the JSON
 */
export class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   *
   * @returns {Promise<Array>} List of photographers
   */
  async fetchPhotographers() {
    const response = await fetch(`${this.baseURL}/photographers.json`);
    const data = await response.json();
    return data.photographers;
  }

  /**
   *
   * @param {*} id
   * @returns
   */
  async fetchPhotographerById(id) {
    const photographers = await this.fetchPhotographers();
    return photographers.find((photographer) => photographer.id == id);
  }

  async fetchMedia() {
    const response = await fetch(`${this.baseURL}/photographers.json`);
    const data = await response.json();
    return data.media;
  }

  async fetchMediaByPhotographerId(id) {
    const media = await this.fetchMedia();
    return media.filter((item) => item.photographerId == id);
  }
}
