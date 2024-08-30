import { trapFocus } from "./focusTrap.js";

/**
 * Displays a modal with the given photographer's name and gets the focus
 *
 * @param {string} photographerName - The name of the photographer.
 * @returns {void}
 */
function displayModal(photographerName) {
  const modalHeading = document.getElementById("modal_title");
  modalHeading.innerHTML = `Contactez-moi <br> ${photographerName}`;

  const modal = document.getElementById("contact_modal");
  const closeModalBtn = modal.querySelector(".close-modal");
  modal.style.display = "block";

  const firstFocusableElement = modal.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusableElement.focus();

  trapFocus(modal);

  closeModalBtn.addEventListener("click", closeModal);
}

/**
 * Closes the modal and loses the focus
 */
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  const triggerElement = document.querySelector('[aria-haspopup="dialog"]');
  if (triggerElement) {
    triggerElement.focus();
  }
}

/**
 * Handles the form submission, logs the form data in the console and closes the modal.
 * @param {Event} event
 */
function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Form Submitted!");
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Email:", email);
  console.log("Message:", message);

  closeModal();
}

/**
 * Event listener to close the modal when close button is clicked
 */

document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  /**
   * Event listener to handle form submission
   */
  const form = document.querySelector("#contact_modal form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});

export { displayModal, closeModal };
