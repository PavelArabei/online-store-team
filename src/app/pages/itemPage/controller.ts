import { ProductInterface } from '../../interfaces/interfaces';
import { CartController } from '../../components/cart/controller';
import { ItemPageView } from './view';
import { GalleryCard } from '../../components/gallery/galleryItems/GalleryItems';
import { ModalWindow } from '../../components/modal-window/modal-window';

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
    this.view.buyNow.addEventListener('click', this.buyNowButtonEvent.bind(this));
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
  }
  updateCardButton() {
    if (this.cart.cartItems.has(this.data.id)) {
      this.card.button.style.backgroundColor = '#730600';
      this.card.button.innerText = 'Remove';
    } else {
      this.card.button.style.backgroundColor = '';
      this.card.button.innerText = 'Add to cart';
    }
  }

  buyNowButtonEvent() {
    const modal = new ModalWindow();
    document.body.append(modal.container);
    modal.container.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) return;
      modal.container.remove();
      e.stopImmediatePropagation();
    });

    modal.closeButton.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) return;
      modal.container.remove();
      e.stopImmediatePropagation();
    });
  }
}
