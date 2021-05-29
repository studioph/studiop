/**
 * Custom footer script to handle form submission and recaptcha
 */

var formHandler = (function () {
  if (document.querySelector('#cryout_ajax_more_trigger')){
    document.querySelector('#cryout_ajax_more_trigger').onclick = () => window.location = '/news/page2'
  }
  //only load if there is a form on the page
  const re = /^\/$|(\/WordPress\/)$|(contact\/)/;
  if (window.location.pathname.match(re)) {
    return customizeForm();
  }
  function customizeForm() {
    const url =
      "https://us-central1-studiop-276703.cloudfunctions.net/form_handler";
    const sitekey = "6LcfmvIUAAAAAPkrYaw7f4Nh1YqZZGFJLbNKD5LT";
    const [
      form,
      formContainer,
      submitButton,
      spinner,
      submitContainer,
      requiredInputs,
    ] = getDOM();
    overrideFormButton();
    form[0].addEventListener("input", validate);

    function getDOM() {
      return [
        jQuery("#wpforms-form-463"),
        jQuery(".wpforms-field-container"),
        jQuery("#wpforms-submit-463"),
        jQuery(".wpforms-submit-spinner"),
        jQuery(".wpforms-submit-container"),
        jQuery(".wpforms-field-required").toArray(),
      ];
    }

    function overrideFormButton() {
      submitButton[0].disabled = true;
      submitButton.attr("data-sitekey", sitekey);
      submitButton.attr("data-callback", "formHandler");
      observeButton();
    }

    //since the recaptcha script re-enables the submit button, wait for change then disable it again
    function observeButton() {
      const config = { attributes: true };
      const observer = new MutationObserver(callback);
      observer.observe(submitButton[0], config);
    }

    function callback(mutations, observer) {
      validate();
      //no need to watch anymore
      observer.disconnect();
    }

    function validate() {
      submitButton[0].disabled = !requiredInputs.every((i) => i.validity.valid);
    }

    async function formHandler() {
      hideForm();
      const data = convertFormData();
      try {
        const result = await sendData(url, data);
        showMessage(result);
      } catch (error) {
        console.error(error);
        showMessage([false, -1]);
      }
    }

    function hideForm() {
      formContainer.slideToggle("medium");
      submitButton.slideToggle("fast");
      spinner.slideToggle("medium");
    }

    function convertFormData() {
      const formValues = form.serializeArray().reduce((acc, val) => {
        acc[val.name] = val.value;
        return acc;
      }, {});
      const toSend = Object.fromEntries(
        ["name", "email", "subject", "message"].map((val, index) => [
          val,
          formValues[`wpforms[fields][${++index}]`],
        ])
      );
      form[0].reset();
      return toSend;
    }

    async function sendData(url, data) {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
      });
      const body = await response.json();
      return [response.ok, body.rejected ? body.rejected.length : -1];
    }

    function showMessage([ok, rejected]) {
      spinner.slideToggle("fast");
      submitContainer.append(
        `<p>${
          ok && rejected === 0
            ? "Thanks for reaching out! I'll be in touch soon."
            : "Sorry, there was an error submitting your message. Please try again."
        }</p>`
      );
    }

    return formHandler;
  }
})();
