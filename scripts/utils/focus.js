// Created so that the focus remains on the opened modal (contact or lightbox) until said modal is closed

/**
 * Trap focus within the modal element.
 * @param {HTMLElement} modalElement - The modal element.
 */
export function trapFocus(modalElement) {
  const focusableElements = modalElement.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  function handleTab(event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  document.addEventListener("keydown", handleTab);

  return () => {
    document.removeEventListener("keydown", handleTab);
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
