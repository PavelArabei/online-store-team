import { ProductInterface } from '../../interfaces/interfaces';
import { products } from '../../data/products';

export class CartModel {
  cartItems = new Map<number, number>();
  private _priceSum = 0;
  private _itemsAmountSum = 0;
  private _couponList = new Map<string, number>();

  constructor() {
    this._couponList.set('epm', 10);
    this._couponList.set('rs', 10);
  }

  get couponList() {
    return this._couponList;
  }
  get priceSum(): number {
    console.log(this.cartItems);
    let sum = 0;
    for (const val of this.cartItems) {
      const obj = products.find((el) => el.id === val[0]);
      if (obj !== undefined) {
        sum = sum + obj.price * val[1];
      }
    }
    return sum;
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
}
