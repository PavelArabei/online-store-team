import { create } from '../../helpers/helpFunction';

export class HeaderView {
  container: HTMLElement;
  totalAmountHtml: HTMLElement;
  _totalAmount: number;
  logoLink: HTMLElement;
  basketScoreHml: HTMLElement;
  _basketScoreAmount: number;
  basket: HTMLElement;
  constructor() {
    this.container = document.createElement('header');
    this.container.classList.add('header');
    const container = create('div', 'container', this.container);
    const nav = create('nav', 'header__nav', container);
    const list = create('ul', 'header__list', nav);
    const item1 = create('li', 'header__item', list);

    this.logoLink = create('a', 'header__logo', item1, 'Music');
    create('span', 'header__logo-span', this.logoLink, 'World');

    const item2 = create('li', 'header__item', list);
    const total = create('p', 'header__total', item2, 'Total: $');
    this.totalAmountHtml = create('span', 'header__total-amount', total, '0');
    this._totalAmount = 0;
    this.basket = create('a', 'header__basket', item2);
    create('img', 'as', this.basket, undefined, ['src', './assets/img/basket.png'], ['alt', 'shopping basket']);
    this.basketScoreHml = create('div', 'basket-score', this.basket);
    this._basketScoreAmount = 0;
    this.basketScoreHml.innerText = this._basketScoreAmount.toString();
  }

  set totalAmount(x: number) {
    this._totalAmount = x;
    this.totalAmountHtml.innerText = this._totalAmount.toString();
  }

  set basketScoreAmount(x: number) {
    this._basketScoreAmount = x;
    this.basketScoreHml.innerText = this._basketScoreAmount.toString();
  }
}
