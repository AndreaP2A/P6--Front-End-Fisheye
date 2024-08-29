// contactForm.js
import { trapFocus, setFocus } from "./focus.js";

document.addEventListener("DOMContentLoaded", () => {
  const contactModal = document.getElementById("contact_modal");
  const openContactButton = document.getElementById("openContactModalButton");
  let previouslyFocusedElement;

  function openContactModal() {
    previouslyFocusedElement = document.activeElement;
    contactModal.style.display = "block";

    const firstFocusableElement = contactModal.querySelector("input, button");
    if (firstFocusableElement) setFocus(firstFocusableElement);

    const removeFocusTrap = trapFocus(contactModal, () => {
      contactModal.style.display = "none";
      if (previouslyFocusedElement) setFocus(previouslyFocusedElement);
    });

    contactModal.addEventListener("close", removeFocusTrap);
  }

  function closeContactModal() {
    contactModal.dispatchEvent(new Event("close"));
  }

  openContactButton.addEventListener("click", openContactModal);
  contactModal
    .querySelector(".close-modal")
    .addEventListener("click", closeContactModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactModal.style.display === "block") {
      closeContactModal();
    }
  });
});
