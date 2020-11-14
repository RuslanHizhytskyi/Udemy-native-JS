
const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  } else {
    return await res.json();
  }
};

let usdToUah;
getResource('http://localhost:3000/usdToUah')
  .then(data => {
    usdToUah = data;
    usdToUah = usdToUah.transfer;
  });

document.addEventListener('DOMContentLoaded', () => {
  


  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
  
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].style.display = 'block';
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if(target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });



  //timer

  const deadLine = '2020-11-28';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
      'total' : t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return (`0${num}`);
    }
    return num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
          
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

  }
  setClock('.timer', deadLine);


  // modal

  const btnsModal =  document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  btnsModal.forEach( btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  // btnModalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute('data-modal-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });


  // use CLASSES
  
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, alt, title, descr, price}) => 
        new MenuCard(img, alt, title, descr, price, '.menu .container').render());
    });

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, alt, title, descr, price}) => 
  //       new MenuCard(img, alt, title, descr, price, '.menu .container').render());
  //   });

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes,
      this.transfer = usdToUah || 29;
      this.changeToUAH();
    }

    changeToUAH() {
      this.priceTransfer = (this.price * this.transfer).toFixed(1);
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.priceTransfer}</span> грн/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }


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
    openModal();

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
      closeModal();
    }, 4000);
  }



  // My slider

  // const slideContainer = document.querySelector('.offer__slider'),
  //       arrowNext = slideContainer.querySelector('.offer__slider-next'),
  //       arrowPrew = slideContainer.querySelector('.offer__slider-prev'),
  //       currentSlide = document.getElementById('current'),
  //       totalSlides = document.getElementById('total'),
  //       slides = slideContainer.querySelectorAll('.offer__slide');

  // let sliderCounter = 0;

  // totalSlides.textContent = getZero(slides.length);
  // slides.forEach((slide, index) => slide.setAttribute('data-index', `${index + 1}`));
  
  // function showCurrent(slide) {
  //   slide.classList.add('active');
  //   currentSlide.textContent = getZero(slide.getAttribute('data-index'));
  // }

  // showCurrent(slides[0]);

  // function toggleSlide(toggle) {
  //   slides[sliderCounter].classList.remove('active');
  //   if (toggle) {
  //     sliderCounter++;
  //     if (sliderCounter >= slides.length) {
  //       sliderCounter = 0;
  //     }
  //   } else {
  //     sliderCounter--;
  //     if (sliderCounter < 0) {
  //       sliderCounter = slides.length - 1;
  //     }
  //   }
  //   showCurrent(slides[sliderCounter]);
  // }

  // arrowNext.addEventListener('click', () => {
  //   toggleSlide(true);
  // });
  // arrowPrew.addEventListener('click', () => {
  //   toggleSlide(false);
  // });


  // Teacher slider
  
  const slides = document.querySelectorAll('.offer__slide'),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        current = document.getElementById('current'),
        total = document.getElementById('total');

  let sliderIndex = 1;

  // showSlides(sliderIndex);

  // total.textContent = getZero(slides.length);

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     sliderIndex = 1;
  //   }

  //   if (n < 1) {
  //     sliderIndex = slides.length;
  //   }
  //   current.textContent = getZero(sliderIndex);
  //   slides.forEach(slide => slide.classList.remove('active'));
  //   slides[sliderIndex - 1].classList.add('active');
  // }

  // function plusSlides(n) {
  //   showSlides(sliderIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });
  
  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });


});

