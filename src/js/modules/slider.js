import {getZero} from './timer';
function slider() {
  // slider
  
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        current = document.getElementById('current'),
        total = document.getElementById('total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  let sliderIndex = 1,
      offset = 0;

  total.textContent = getZero(slides.length);
  current.textContent = getZero(sliderIndex);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);
    dots.push(dot);
    if (i == 0) {
      dot.classList.add('active');
    }
  }

  function changeSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`;
    current.textContent = getZero(sliderIndex);
    dots.forEach (dot => dot.classList.remove('active'));
    dots[sliderIndex - 1].classList.add('active');
  }

  function getNum(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset == getNum(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += getNum(width);
    }

    if (sliderIndex == slides.length) {
      sliderIndex = 1;
    } else {
      sliderIndex++;
    }

    changeSlide();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = getNum(width) * (slides.length - 1);
    } else {
      offset -= getNum(width);
    }
    
    if (sliderIndex == 1) {
      sliderIndex = slides.length;
    } else {
      sliderIndex--;
    }
    
    changeSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      sliderIndex = slideTo;
      offset = getNum(width) * (slideTo - 1);

      changeSlide();
    });
  });
}

export default slider;