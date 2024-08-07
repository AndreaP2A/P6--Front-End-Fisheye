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
}

const api = new API("/data");
export { api };
