// Created so that the focus remains on the opened modal (contact or lightbox) until said modal is closed

// focus.js

/**
 * Trap focus within the modal element.
 * @param {HTMLElement} modalElement - The modal element.
 * @param {Function} onClose - Callback to call when the modal is closed.
 */
export function trapFocus(modalElement, onClose) {
  const focusableElements = modalElement.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // Convert NodeList to Array for easier handling
  const focusableArray = Array.from(focusableElements);
  const firstFocusableElement = focusableArray[0];
  const lastFocusableElement = focusableArray[focusableArray.length - 1];

  function handleTab(event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  // Trap focus within the modal
  document.addEventListener("keydown", handleTab);

  // Cleanup when modal is closed
  return () => {
    document.removeEventListener("keydown", handleTab);
    if (onClose) onClose();
  };
}

/**
 * Set focus to an element.
 * @param {HTMLElement} element - The element to focus.
 */
export function setFocus(element) {
  if (element) {
    element.focus();
  }
}
