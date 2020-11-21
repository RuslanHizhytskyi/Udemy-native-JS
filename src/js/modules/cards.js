
import {getResurse} from '../services/services';

function cards() {
  // use CLASSES
  
  getResurse('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, alt, title, descr, price}) => {
        new MenuCard(img, alt, title, descr, price, '.menu .container').render()
      });
    });

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes,
      // this.transfer = usdToUah || 29;
      this.transfer = 29;
      this.changeToUAH();
    }

    changeToUAH() {
      this.priceTransfer = (this.price * this.transfer).toFixed(0);
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
}

export default cards;