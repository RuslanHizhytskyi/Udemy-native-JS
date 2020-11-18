function openModal(modal) {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

const modall = document.querySelector('.modal');

function modal() {
  // modal

  const btnsModal =  document.querySelectorAll('[data-modal]');
        


  btnsModal.forEach( btn => {
    btn.addEventListener('click', () => {
      openModal(modall);
    });
  });

  modall.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute('data-modal-close') == '') {
      closeModal(modall);
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modall);
    }
  });
}

export default modal;
export {openModal, closeModal, modall};