function displayModal(photographerName) {
  console.log("La fonction d'affichage de cette modale s'est bien déclenché !"); //for debugging

  // To dynamically add the photographer's name to "Contactez-moi"
  const modalHeading = document.getElementById("modal_title");
  modalHeading.innerHTML = `Contactez-moi <br> ${photographerName}`;

  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal element not found");
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
// Event listener to close the modal when close button is clicked
document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }
});

export { displayModal, closeModal };
