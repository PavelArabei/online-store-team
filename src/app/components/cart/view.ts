/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from '../../helpers/helpFunction';
import { CartController } from './controller';
import { ProductInterface } from '../../interfaces/interfaces';
import { products } from '../../data/products';

export class CartView {
  container: HTMLElement;
  paginationControlPageCountDown: HTMLElement;
  paginationPageNumber: HTMLElement;
  paginationControlPageCountUp: HTMLElement;
  itemsLimitInput: HTMLElement;
  itemsList: HTMLElement;
  itemsCount: HTMLElement;
  promoInput: HTMLElement;
  promoEnterIcon: HTMLElement;
  codesWrap: HTMLElement;
  appliedCodesList: HTMLElement;
  noDiscountPrice: HTMLElement;
  discountPrice: HTMLElement;
  orderButton: HTMLElement;
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('cart');

    const cartContent = create('div', 'cart-content', this.container);
    const cartOrderSummary = create('div', 'cart__order-summary', this.container);

    const cartHeader = create('div', 'cart__header', cartContent);
    const heading = create('h2', 'cart__heading', cartHeader, 'Producst in cart');
    const paginationControl = create('div', 'cart__pagination-control', cartHeader);
    const paginationControlPageSpan = create('span', 'pagination-control__page-span', paginationControl, 'Page: ');

    this.paginationControlPageCountDown = create(
      'img',
      'pagination-control__arrow-left',
      paginationControl,
      undefined,
      ['src', './assets/img/icons/arrow-left.svg']
    );
    this.paginationPageNumber = create('span', 'pagination-control__page-number', paginationControl, '1/1');
    this.paginationControlPageCountUp = create('img', 'pagination-control__arrow-right', paginationControl, undefined, [
      'src',
      './assets/img/icons/arrow-right.svg',
    ]);

    const pageLimitForm = create('form', 'pagination-control__form', paginationControl, '', [
      'onSubmit',
      'return false',
    ]);
    const pageLimitLabel = create('label', 'pg-limit', pageLimitForm, 'Items per page: ');
    this.itemsLimitInput = create('input', 'pages-limit', pageLimitForm);

    this.itemsList = create('ul', 'cart-items-list', cartContent);

    const cartSummaryHeading = create('h3', 'order-summary__heading', cartOrderSummary, 'In cart');
    this.itemsCount = create('p', 'order-summary__items-amount', cartOrderSummary, '0 items');
    const promoForm = create('form', 'promo-code-form', cartOrderSummary);
    const promoLabel = create('label', 'promo-label', promoForm, 'Promo code', ['id', 'promo-label']);
    const inputPromoWrap = create('div', 'input-promo-wrap', promoForm);
    this.promoInput = create(
      'input',
      'promo-input',
      inputPromoWrap,
      undefined,
      ['type', 'text'],
      ['id', 'promo-input'],
      ['name', 'promo-code'],
      ['placeholder', 'Test promo: RS, EPM']
    );
    this.promoEnterIcon = create('img', 'promo-input-arrow', inputPromoWrap, undefined, [
      'src',
      './assets/img/icons/enter-promo.svg',
    ]);
    this.promoEnterIcon.classList.add('hidden-element');
    this.codesWrap = create('div', 'order-summary__applied-codes-wrap', cartOrderSummary);
    this.codesWrap.classList.add('hidden-element');
    const appliedCodesSpan = create('span', 'applied-codes_span', this.codesWrap, 'Applied codes: ');
    this.appliedCodesList = create('ul', 'applied-codes__list', this.codesWrap);
    create('li', 'applied-codes__item', this.appliedCodesList, 'EPM: -20%');

    const priceWrap = create('div', 'order-summary__price-wrap', cartOrderSummary);
    this.noDiscountPrice = create('span', 'order-summary__price', priceWrap, '$0');
    this.discountPrice = create('span', 'order-summary__discount-price', priceWrap, '$0');
    this.discountPrice.classList.add('hidden-element');

    this.orderButton = create('button', 'order-summary__order-button', cartOrderSummary, 'Order now');
  }
}

export class CartListItem {
  data: ProductInterface;
  container: HTMLElement;
  itemAmountNumber: HTMLElement;
  decreaseAmountButton: HTMLElement;
  increaseAmountButton: HTMLElement;
  price: HTMLElement;
  amount: number;

  constructor(item: ProductInterface, amount: number) {
    this.data = item;
    this.amount = amount;
    this.container = document.createElement('li');
    this.container.classList.add('cart-items-list__item');
    const image = create('img', 'cart-item__image', this.container, '', ['src', `${item.images[0]}`]);
    const main = create('div', 'cart-item__main', this.container);
    const h3 = create('h3', 'cart-item__heading', main, `${item.title}`);
    const description = create('p', 'cart-item__description', main, `${item.description}`);

    const bottomContainer = create('div', 'cart-item__bottom-container', main);
    const statsWrap = create('div', 'cart-item__stats-wrapper', bottomContainer);
    const stock = create('p', 'cart-item__stats-stock', statsWrap, `Stock: ${item.stock}`);
    const brand = create('p', 'class="cart-item__stats-brand"', statsWrap, `Brand: ${item.brand}`);
    const rating = create('p', 'cart-item__stats-rating', statsWrap, `Rating: ${item.rating}`);

    const itemAmount = create('div', 'cart-item__item-amount', bottomContainer);
    const amountSpan = create('span', 'cart-item__amount-span', itemAmount, 'In cart: ');
    this.decreaseAmountButton = create('img', 'cart-item__arrow-left', itemAmount, '', [
      'src',
      './assets/img/icons/arrow-left.svg',
    ]);
    this.itemAmountNumber = create('span', 'cart-item__amount-number', itemAmount, `${this.amount}`);
    this.increaseAmountButton = create('img', 'cart-item__arrow-right', itemAmount, '', [
      'src',
      './assets/img/icons/arrow-right.svg',
    ]);

    this.price = create('p', 'cart-item__price', bottomContainer, `$${this.amount * Number(item.price)}`);
  }
}
