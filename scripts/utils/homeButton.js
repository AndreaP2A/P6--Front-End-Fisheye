document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.onclick = function () {
      window.location.href = "index.html";
    };
  }
});
