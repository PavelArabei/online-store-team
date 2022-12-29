import { create } from '../../../helpers/helpFunction';
import { ProductInterface } from '../../../interfaces/interfaces';

export class GalleryItems {
  container: HTMLElement;
  products: ProductInterface[];
  cards: Map<number, GalleryCard>;
  cardsLinkArray: GalleryCard[];
  constructor(products: ProductInterface[]) {
    this.cards = new Map();
    this.container = document.createElement('div');
    this.container.classList.add('gallery');
    this.products = products;
    this.cardsLinkArray = [];
    this.createGallery();
  }
  createGallery(): void {
    this.cards = new Map<number, GalleryCard>();
    for (let i = 0; i < this.products.length; i++) {
      const card = new GalleryCard(this.products[i]);
      const productId = this.products[i].id;
      this.cards.set(productId, card);
      this.cardsLinkArray.push(card);
      this.container.append(card.container);
    }
  }
  changeGallery(products: ProductInterface[]): void {
    this.container.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
      const card = this.cardsLinkArray[products[i].id - 1];
      this.container.append(card.container);
    }
  }
}

export class GalleryCard {
  private _added = false;
  container: HTMLElement;
  data: ProductInterface;
  button: HTMLElement;
  constructor(data: ProductInterface) {
    this.data = data;
    this.container = document.createElement('div');
    this.container.classList.add('gallery__item');
    this.container.dataset.id = this.data.id.toString();
    const imgContainer = create('div', 'gallery__img', this.container);
    create(
      'img',
      'gallery__img-img',
      imgContainer,
      undefined,
      ['src', `${this.data.thumbnail}`],
      ['alt', `${this.data.category}`]
    );
    const Container = create('div', 'gallery__container', this.container);
    create('p', 'gallery__title', Container, `${this.data.title}`);
    create('p', 'gallery__dicription', Container, `${this.data.description}`);
    const buttonPrice = create('div', 'gallery__button-price', Container);
    this.button = create('div', 'gallery__button', buttonPrice, 'Add to cart');
    this.button.classList.add('button');
    create('p', 'gallery__price', buttonPrice, `$${this.data.price}`);
  }
}
