// import { ProductInterface } from '../../interfaces/interfaces';
import { products } from '../../data/products';
export class CartModel {
  cartItems = new Map<number, number>();
  private _priceSum = 0;
  private _itemsAmountSum = 0;

  get priceSum(): number {
    let sum = 0;
    for (const val of this.cartItems) {
      const obj = products.find((el) => el.id === val[0]);
      if (obj !== undefined) {
        sum = sum + obj.price;
      }
    }
    return sum;
  }

  get itemsAmount(): number {
    return this.cartItems.size;
  }
}
