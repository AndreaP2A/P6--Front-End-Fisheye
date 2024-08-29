import { setFocus, trapFocus } from "./focus.js";

let focusTrap;

/**
 * Displaying the contact form with the name of the photographer
 * @param {*} photographerName
 */
function displayModal(photographerName) {
  // To dynamically add the photographer's name to "Contactez-moi"
  const modalHeading = document.getElementById("modal_title");
  modalHeading.innerHTML = `Contactez-moi <br> ${photographerName}`;

  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";

    // Focus management
    const firstFocusableElement = modal.querySelector("input");
    focusTrap = trapFocus(modal);
    setFocus(firstFocusableElement);
  } else {
    console.error("Modal element not found");
  }
}

/**
 * Closes the modal
 */
function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";

    // Remove focus trap
    if (focusTrap) {
      focusTrap();
    }

    // Restore focus to the button that opened the modal
    const lastFocusedElement = document.activeElement;
    setFocus(lastFocusedElement);
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
