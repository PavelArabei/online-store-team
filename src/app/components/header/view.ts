import { create } from '../../helpers/helpFunction';

export class HeaderView {
  headerElement: HTMLElement;
  totalAmountHtml: HTMLElement;
  _totalAmount: number;
  logoLink: HTMLElement;
  basketScoreHml: HTMLElement;
  _basketScoreAmount: number;
  constructor() {
    this.headerElement = document.createElement('header');
    this.headerElement.classList.add('header');
    const container = create('div', 'container', this.headerElement);
    const nav = create('nav', 'header__nav', container);
    const list = create('ul', 'header__list', nav);
    const item1 = create('li', 'header__item', list);

    this.logoLink = create('a', 'header__logo', item1, 'Music');
    create('span', 'header__logo-span', this.logoLink, 'World');

    const item2 = create('li', 'header__item', list);
    const total = create('p', 'header__total', item2, 'Total: $');
    this.totalAmountHtml = create('span', 'header__total-amount', total, '0');
    this._totalAmount = 0;
    const basket = create('a', 'header__basket', item2);
    create('img', 'as', basket, undefined, ['src', './assets/img/basket.png'], ['alt', 'shopping basket']);
    this.basketScoreHml = create('div', 'basket-score', basket);
    this._basketScoreAmount = 0;
    this.basketScoreHml.innerText = this._basketScoreAmount.toString();
  }

  set totalAmount(x: number) {
    this._totalAmount = x;
    this.totalAmountHtml.innerText = this.totalAmount.toString();
  }

  set basketScoreAmount(x: number) {
    this._basketScoreAmount = x;
    this.basketScoreHml.innerText = this._basketScoreAmount.toString();
  }
}
