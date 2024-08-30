import { trapFocus } from "./focusTrap.js"; // Import the focus trap function

/**
 * Displaying the contact form with the name of the photographer
 * @param {*} photographerName
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

  trapFocus(modal); // Use the trapFocus function

  closeModalBtn.addEventListener("click", closeModal);
}

/**
 * Closes the modal
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
 * Handles the form submission, logs the form data, and closes the modal.
 * @param {Event} event
 */
function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Collect the form data
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Log the form data to the console
  console.log("Form Submitted!");
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Email:", email);
  console.log("Message:", message);

  // Close the modal after submission
  closeModal();
}

// Event listener to close the modal when close button is clicked
document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Add an event listener to the form's submit button
  const form = document.querySelector("#contact_modal form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});

export { displayModal, closeModal };
