function displayModal() {
  console.log("Display modal function triggered");
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
// Event listener to close the modal when close buttono is clicked
document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close the modal if user clicks outside of it
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("contact_modal");
    if (event.target === modal) {
      closeModal();
    }
  });
});

export { displayModal, closeModal };
