import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { api } from "../utils/api.js";

function createMediaElement(mediaItem, photographerName) {
  const mediaDiv = document.createElement("div");
  mediaDiv.classList.add("media-item");

  const title = document.createElement("div");
  title.classList.add("media-title");
  title.textContent = mediaItem.title;

  const likes = document.createElement("div");
  likes.classList.add("media-likes");
  likes.textContent = `${mediaItem.likes}`;

  mediaDiv.appendChild(title);
  mediaDiv.appendChild(likes);
  const mediaPath = `assets/images/${photographerName}/`;

  if (mediaItem.image) {
    const img = document.createElement("img");
    img.src = `${mediaPath}${mediaItem.image}`;
    img.alt = mediaItem.title;
    mediaDiv.appendChild(img);
  } else if (mediaItem.video) {
    const video = document.createElement("video");
    video.controls = true;
    const source = document.createElement("source");
    source.src = `${mediaPath}${mediaItem.video}`;
    source.type = "video/mp4";
    video.appendChild(source);
    mediaDiv.appendChild(video);
  }

  return mediaDiv;
}

async function displayPhotographer(photographer) {
  const main = document.querySelector("main");
  if (!main) return;

  // Clear existing content
  main.innerHTML = "";

  // Create and append photographer hero header
  const photographerHeader = document.createElement("div");
  photographerHeader.classList.add("photograph-header");

  const media = await api.fetchMediaByPhotographerId(photographer.id);

  // Check if media is correctly fetched
  if (!media || media.length === 0) {
    console.error("No media items found for photographer:", photographer.id);
    return;
  }

  const photographerModel = new PhotographerTemplate(photographer, media);
  const headerContent = photographerModel.getPhotographerHeaderDOM();
  photographerHeader.appendChild(headerContent);

  main.appendChild(photographerHeader);

  // Create and append media container
  const mediaContainer = photographerModel.getMediaDOM(media);

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
