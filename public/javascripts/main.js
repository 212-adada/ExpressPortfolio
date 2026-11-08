/* ============================================================
   File:        main.js
   Student Name: Shu Haoyang (Jackie)
   StudentID:   2024110172
   Date:        November 8, 2026

   Purpose: Client-side behaviour for the Express Portfolio site.
   Handles contact form validation and light UI enhancements.
   ============================================================ */

// ------------------------------------------------------------
// 1. CONTACT FORM VALIDATION
// ------------------------------------------------------------

/**
 * Validates the contact form before it is submitted to the server.
 * Checks that the email address is well-formed and that no required
 * field was left empty. Returns false to block submission on failure.
 *
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {boolean} True if the form is valid, otherwise false.
 */
function validateContactForm(form) {
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  // Email must match a basic email shape.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailPattern.test(emailInput.value.trim())) {
    emailInput.classList.add('is-invalid');
    emailInput.focus();
    return false;
  }
  emailInput.classList.remove('is-invalid');

  // Message must contain at least a few characters of content.
  if (messageInput && messageInput.value.trim().length < 5) {
    messageInput.classList.add('is-invalid');
    messageInput.focus();
    return false;
  }
  messageInput.classList.remove('is-invalid');

  return true;
}

// ------------------------------------------------------------
// 2. INITIALISATION
// ------------------------------------------------------------

/**
 * Wire up page behaviour once the DOM is ready.
 * Attaches the validation handler to the contact form if present.
 */
function initPortfolio() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      if (!validateContactForm(contactForm)) {
        event.preventDefault();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initPortfolio);
