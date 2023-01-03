import { ProductInterface } from '../../interfaces/interfaces';
import { CartController } from '../../components/cart/controller';
import { ItemPageView } from './view';
import { GalleryCard } from '../../components/gallery/galleryItems/GalleryItems';

export class ItemPageController {
  data: ProductInterface;
  cart: CartController;
  view: ItemPageView;
  card: GalleryCard;
  constructor(cart: CartController, card: GalleryCard) {
    this.data = card.data;
    this.cart = cart;
    this.view = new ItemPageView(card.data);
    this.card = card;
    this.view.addButton.addEventListener('click', this.addToCartEvent.bind(this));
  }

  addToCartEvent() {
    if (this.cart.cartItems.has(this.data.id)) {
      this.cart.cartItems.delete(this.data.id);
      this.view.addButton.innerText = 'Add to cart';
      this.view.addButton.style.backgroundColor = '';
    } else {
      this.cart.addItem(this.data.id, 1);

      this.view.addButton.innerText = 'Remove';
      this.view.addButton.style.backgroundColor = '#730600';
    }
    this.updateCardButton();
    console.log(this.cart.cartItems);
  }
  updateCardButton() {
    if (this.cart.cartItems.has(this.data.id)) {
      this.card.button.style.backgroundColor = '#730600';
      this.card.button.innerText = 'Remove';
      console.log('trig 1');
    } else {
      this.card.button.style.backgroundColor = '';
      this.card.button.innerText = 'Add to cart';
      console.log('trig 1');
    }
  }
}
