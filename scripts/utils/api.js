// Handling data fetching, no repetition !

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchPhotographers() {
    const response = await fetch(`${this.baseURL}/photographers.json`);
    const data = await response.json();
    return data.photographers;
  }

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

const api = new API("/data");
export { api };
