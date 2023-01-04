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
    this.view.mainImage.addEventListener('click', this.enlargeImageEvent.bind(this));
    this.view.thumbnails.forEach((item) => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('src');
        if (src !== null) {
          this.view.mainImage.setAttribute('src', src);
        }
      });
    });

    // this.view.mainImage.addEventListener('click', () => {
    //   const src = this.view.mainImage.getAttribute('src');
    // });
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
    modal.container.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        modal.container.remove();
        e.stopImmediatePropagation();
      }
    });

    modal.closeButton.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        modal.container.remove();
        e.stopImmediatePropagation();
      }
    });
  }

  enlargeImageEvent() {
    const src = this.view.mainImage.getAttribute('src');
    const modal = new EnlargeImagePopup(src || '');
    document.body.append(modal.container);
    modal.container.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        modal.container.remove();
        e.stopImmediatePropagation();
      }
    });
    modal.cross.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        modal.container.remove();
        e.stopImmediatePropagation();
      }
    });
  }
}

export class EnlargeImagePopup {
  container: HTMLElement;
  image: HTMLElement;
  cross: HTMLElement;
  constructor(src: string) {
    this.container = document.createElement('div');
    this.container.classList.add('modal');
    this.image = document.createElement('img');
    this.image.classList.add('image-popup__image');
    this.image.setAttribute('src', src);
    this.cross = document.createElement('img');
    this.cross.classList.add('image-popup__cross');
    this.cross.setAttribute('src', './assets/img/closeButton.png');
    const whiteBg = document.createElement('div');
    whiteBg.classList.add('image-popup__white-bg');
    this.container.append(whiteBg);
    whiteBg.prepend(this.cross);
    whiteBg.append(this.image);
  }
}
