import { ProductInterface } from '../../interfaces/interfaces';
import { create } from '../../helpers/helpFunction';

export class ItemPageView {
  item: ProductInterface;
  container: HTMLElement;
  itemImages: HTMLElement;
  mainImageContainer: HTMLElement;
  mainImage: HTMLElement;
  imagesPreviewContainer: HTMLElement;
  thumbnails: HTMLElement[];
  rightBlock: HTMLElement;
  heading: HTMLElement;
  price: HTMLElement;
  itemDescription: HTMLElement;
  purchaceButtonsContainer: HTMLElement;
  addButton: HTMLElement;
  buyNow: HTMLElement;
  ratingStarsContainer: HTMLElement;
  itemInfo: HTMLElement;
  stock: HTMLElement;
  brand: HTMLElement;
  rating: HTMLElement;
  stockData: HTMLElement;
  brandData: HTMLElement;
  ratingData: HTMLElement;
  constructor(item: ProductInterface) {
    this.item = item;
    this.container = document.createElement('div');
    this.container.classList.add('item-page');

    this.itemImages = create('div', 'item-page__item-images', this.container);
    this.mainImageContainer = create('div', 'item-page__main-image-container', this.itemImages);
    this.mainImage = create('img', 'item-page__main-image', this.mainImageContainer, undefined, [
      'src',
      `${this.item.images[0]}`,
    ]);
    this.imagesPreviewContainer = create('div', 'item-page__images-preview-container', this.itemImages);

    this.thumbnails = this.item.images.map((item, index) => {
      const div = create('div', 'item-page__item-page-container', this.imagesPreviewContainer);
      const img = create('img', 'item-page__thumbnail', div, undefined, ['src', `${this.item.images[index]}`]);
      return img;
    });

    this.rightBlock = create('div', 'item-page__right-block', this.container);
    this.heading = create('h2', 'item-page__heading', this.rightBlock, this.item.title);
    this.price = create('span', 'item-page__price', this.rightBlock, `$${this.item.price}`);
    this.itemDescription = create('span', 'item-page__description', this.rightBlock, `${this.item.description}`);
    this.purchaceButtonsContainer = create('p', 'item-page__purchase-buttons-container', this.rightBlock);
    this.addButton = create('a', 'item-page__add-button', this.purchaceButtonsContainer, 'Add to cart');
    this.buyNow = create('a', 'item-page__buy-now-button', this.purchaceButtonsContainer, 'Buy now');
    this.ratingStarsContainer = create('div', 'item-page__rating-stars-container', this.rightBlock);

    this.itemInfo = create('div', 'item-page__item-info', this.rightBlock);
    this.stock = create('p', 'item-page__stock', this.itemInfo, 'Stock: ');
    this.brand = create('p', 'item-page__brand', this.itemInfo, 'Brand: ');
    this.rating = create('p', 'item-page__rating', this.itemInfo, 'Rating: ');

    this.stockData = create('span', 'item-page__stock-data', this.stock, `${this.item.stock}`);
    this.brandData = create('span', 'item-page__brand-data', this.brand, `${this.item.brand}`);
    this.ratingData = create('span', 'item-page__rating-data', this.rating, `${this.item.rating}`);

    this.fillRatingStars();
  }

  fillRatingStars(): void {
    this.ratingStarsContainer.replaceChildren();
    for (let i = 0; i < 5; i++) {
      if (Math.round(this.item.rating) > i) {
        create('img', 'item-page__star', this.ratingStarsContainer, undefined, [
          'src',
          './assets/img/icons/star-full.svg',
        ]);
      } else {
        create('img', 'item-page__star', this.ratingStarsContainer, undefined, [
          'src',
          './assets/img/icons/star-empty.svg',
        ]);
      }
    }
  }
}
