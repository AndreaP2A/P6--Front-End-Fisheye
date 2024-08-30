/**
 * API utils
 * @constructor
 * @param {string} [baseURL="/P6--Front-End-Fisheye/data"] - The base URL for the API.
 */
class API {
  constructor(baseURL = "/P6--Front-End-Fisheye/data") {
    this.baseURL = baseURL;
  }

  /**
   * Fetches a list of photographers.
   * @async
   * @returns {Promise<Array>} List of photographers
   */
  async fetchPhotographers() {
    const response = await fetch(`${this.baseURL}/photographers.json`);
    const data = await response.json();
    return data.photographers;
  }

  async fetchPhotographerById(id) {
    const photographers = await this.fetchPhotographers();
    return photographers.find((photographer) => photographer.id == id);
  }

  /**
   * Fetches a list of medias.
   * @async
   * @returns {Promise<Array>} List of medias
   */
  async fetchMedia() {
    const response = await fetch(`${this.baseURL}/photographers.json`);
    const data = await response.json();
    return data.media;
  }

  /**
   * Fetches media by photographer ID.
   * @param {number} id - The ID of the photographer.
   * @returns {Array} - An array of media objects filtered by the photographer ID.
   */
  async fetchMediaByPhotographerId(id) {
    const media = await this.fetchMedia();
    return media.filter((item) => item.photographerId == id);
  }
}

const api = new API();
export { api };
