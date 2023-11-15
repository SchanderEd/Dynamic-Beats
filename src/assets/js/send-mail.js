"use strict"
import { openPopup } from "./popup.min.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        form.classList.remove('_sending');
        openPopup();
      } else {
        alert('Error');
        form.classList.remove('_sending');
      }
    };
  };

  function formValidate() {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (!emailTest(input.value)) {
          formAddError(input);
          error++;
        };
      } else {
        if (input.value == '') {
          formAddError(input);
          error++;
        };
      };
    };
    return error;
  };

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  };

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  };

  function emailTest(input) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,10}$/i.test(input);
  };
});