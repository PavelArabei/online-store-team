import { ProductInterface } from '../../interfaces/interfaces';
export class CartModel {
  cartItems = new Map<ProductInterface, number>();
  private _priceSum = 0;
  private _itemsAmountSum = 0;

  get priceSum(): number {
    this._priceSum = 0;
    if (this.cartItems.size > 0) {
      for (const entry of this.cartItems.entries()) {
        this._priceSum += entry[0].price * entry[1];
      }
    }
    return this._priceSum;
  }

  get itemsAmount(): number {
    this._itemsAmountSum = this.cartItems.size;
    return this._itemsAmountSum;
  }

  getItemsAmount(): number {
    this._itemsAmountSum = 0;
    if (this.cartItems.size > 0) {
      for (const value of this.cartItems.values()) {
        this._itemsAmountSum += value;
      }
    }
    return this._priceSum;
  }
}
