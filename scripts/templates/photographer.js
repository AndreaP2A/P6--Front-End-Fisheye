function photographerTemplate(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.onclick = () => {
      window.location.href = `photographer.html?id=${data.id}`;
    };
    img.style.cursor = "pointer";

    const h2 = document.createElement("h2");
    h2.innerText = name;
    h2.onclick = () => {
      window.location.href = `photographer.html?id=${data.id}`;
    };
    h2.style.cursor = "pointer";

    const location = document.createElement("p");
    location.innerText = data.city + `, ` + data.country;
    location.setAttribute("class", "location");

    const tagline = document.createElement("p");
    tagline.innerText = data.tagline;
    tagline.setAttribute("class", "tagline");

    const price = document.createElement("p");
    price.innerText = `${data.price}€/jour`;
    price.setAttribute("class", "price");

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(tagline);
    article.appendChild(price);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
export { photographerTemplate };
