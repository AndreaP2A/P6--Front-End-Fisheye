export function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function (e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) return;

    if (e.shiftKey) {
      // if shift + tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus(); // focus last element
      }
    } else {
      // if tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus(); // focus first element
      }
    }
  });
}
