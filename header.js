/**
 * Custom header script to conditionally load the recaptcha script if on a page with a contact form
 */

(function () {
  const re = /^\/$|(\/WordPress\/)$|(contact\/)/;
  if (window.location.pathname.match(re)) {
    loadScript();
  }

  document.querySelector('#site-copyright').nextSibling.remove();

  function loadScript() {
    const head = document.querySelector("head");
    const recaptchScript = document.createElement("script");
    recaptchScript.type = "text/javascript";
    recaptchScript.src = "https://www.google.com/recaptcha/api.js";
    head.appendChild(recaptchScript);
  }
})();