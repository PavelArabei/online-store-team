import { GalleryHeader } from './galleryHeader/galleryHeader';
import { GalleryItems } from './galleryItems/GalleryItems';
import { products } from '../../data/products';

//import { create } from '../../helpers/helpFunction';
import { ProductInterface } from '../../interfaces/interfaces';
export class Gallery {
  container: HTMLElement;
  header: GalleryHeader;
  galleryItems: GalleryItems;
  products: ProductInterface[];

  constructor() {
    this.products = products;
    this.header = new GalleryHeader();
    this.galleryItems = new GalleryItems(this.products);

    this.container = document.createElement('div');
    this.container.classList.add('main-page__all-products');
    this.container.append(this.header.container, this.galleryItems.container);
  }
}
