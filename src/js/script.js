import tabs from './modules/tabs';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal'

document.addEventListener('DOMContentLoaded', () => {

  
  const modalTimerId = setTimeout(() => {
    openModal('.modal', modalTimerId);
  }, 300000);
  
  tabs();
  cards();
  calc();
  forms(modalTimerId);
  modal('[data-modal]', '.modal', modalTimerId);
  slider();
  timer();
});
