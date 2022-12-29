import { ProductInterface } from '../../interfaces/interfaces';
import { CartModel } from './model';

export class CartController {
  model = new CartModel();
  cartItems = this.model.cartItems;

  addItem(item: ProductInterface, amount: number): void {
    if (amount === 0 && this.cartItems.has(item)) {
      this.cartItems.delete(item);
    } else {
      this.cartItems.set(item, amount);
    }
  }
  get priceSum() {
    return Math.round(this.model.priceSum);
  }
  get itemsAmount() {
    return this.model.itemsAmount;
  }
}
