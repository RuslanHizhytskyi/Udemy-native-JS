function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
  // modal
  
  const modal = document.querySelector(modalSelector);

  const btnsModal =  document.querySelectorAll(triggerSelector);
        


  btnsModal.forEach( btn => {
    btn.addEventListener('click', () => {
      openModal(modalSelector, modalTimerId);
    });
  });

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute('data-modal-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });


  // function showByScroll() {
  //   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.clientHeight) {
  //     openModal(modalSelector, modalTimerId);
  //     window.removeEventListener('scroll', showByScroll);
  //   }
  // }
  // window.addEventListener('scroll', showByScroll);
}

export default modal;
export {closeModal};
export {openModal};