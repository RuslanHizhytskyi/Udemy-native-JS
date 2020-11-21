import tabs from './modules/tabs';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

  
  const modalTimerId = setTimeout(() => {
    openModal('.modal', modalTimerId);
  }, 300000);
  
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  cards();
  calc();
  forms('form', modalTimerId);
  modal('[data-modal]', '.modal', modalTimerId);
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  timer('.timer', '2020-12-12');
});
