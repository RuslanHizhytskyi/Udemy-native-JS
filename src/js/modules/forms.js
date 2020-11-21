import {closeModal, openModal} from './modal';

function forms(modalTimerId) {
  // Forms

  const forms = document.querySelectorAll('form'),
        message = {
          loading: 'icons/spinner.svg',
          succes: 'Succes! We will call you',
          fail: 'Somethink broke'
        };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.setAttribute('src', `${message.loading}`);
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
        showThanksModal(message.succes);
        statusMessage.remove();
        return data;
      }).catch(() => {
        showThanksModal(message.fail);
      }).finally(() => {
        form.reset();
      });
    });
  }

  forms.forEach(forma => bindPostData(forma));

  function showThanksModal(message) {
    const previosModalLialog = document.querySelector('.modal__dialog');

    previosModalLialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-modal-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previosModalLialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }

}

export default forms;