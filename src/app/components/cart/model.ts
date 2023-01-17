import { ProductInterface } from '../../interfaces/interfaces';
import { products } from '../../data/products';

export class CartModel {
  cartItems = new Map<number, number>();
  private _priceSum = 0;
  private _discountSum = 0;
  private _itemsAmountSum = 0;
  private _couponList = new Map<string, number>();
  appliedCoupons = new Map<string, PromoCode>();

  constructor() {
    this._couponList.set('epm', 10);
    this._couponList.set('rs', 30);
  }

  get couponList() {
    return this._couponList;
  }
  get priceSum(): number {
    let sum = 0;
    for (const val of this.cartItems) {
      const obj = products.find((el) => el.id === val[0]);
      if (obj !== undefined) {
        sum = sum + obj.price * val[1];
      }
    }
    return sum;
  }
  get discountSum() {
    const price = this.priceSum;
    let discount = 0;
    for (const [, val] of this.appliedCoupons) {
      discount += val.discount;
    }
    return Math.round(((100 - discount) * price) / 100);
  }

  get itemsAmount(): number {
    return [...this.cartItems.values()].reduce((sum, cur) => sum + cur, 0);
  }

  getCartItemsData() {
    const cardElementsArr: [ProductInterface, number][] = [];
    for (const val of this.cartItems) {
      const data = products.find((el) => el.id === val[0]);
      if (data !== undefined) {
        cardElementsArr.push([data, val[1]]);
      }
    }
    return cardElementsArr;
  }

  addPromoCode(code: string) {
    const discount = this.couponList.get(code.toLowerCase());
    if (discount === undefined) return;
    const promo = new PromoCode(code.toLowerCase(), discount);
    this.appliedCoupons.set(code.toLowerCase(), promo);
    promo.cross.addEventListener('click', () => {
      promo.container.remove();
      this.appliedCoupons.delete(code.toLowerCase());
    });
    return promo;
  }

  removePromoCode(code: string) {
    this.appliedCoupons.delete(code.toLowerCase());
  }
}

export class PromoCode {
  name: string;
  discount: number;
  container: HTMLElement;
  cross: HTMLElement;

  constructor(code: string, discount: number) {
    this.name = code;
    this.discount = discount;
    this.container = document.createElement('li');
    this.container.classList.add('applied-codes__item');
    this.container.innerText = `${this.name.toUpperCase()}: ${this.discount}%`;
    this.cross = document.createElement('span');
    this.cross.innerText = '[ x ]';
    this.cross.style.color = 'red';
    this.container.append(this.cross);
    this.cross.style.cursor = 'pointer';
  }
}
