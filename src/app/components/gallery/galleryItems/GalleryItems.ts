import { create } from '../../../helpers/helpFunction';
//import { products } from '../../data/products';
interface ProductInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export class GalleryItems {
  body: HTMLElement;
  galleryElement: HTMLElement;
  products: ProductInterface[];
  constructor(body: HTMLElement, products: ProductInterface[]) {
    this.body = body;
    this.galleryElement = document.createElement('div');
    this.galleryElement.classList.add('gallery');
    this.products = products;
    console.log(this.products);
    this.createGallery();
  }
  createGallery(): void {
    for (let i = 0; i < this.products.length; i++) {
      const item = create('div', 'gallery__item', this.galleryElement, undefined, ['id', `${this.products[i].id}`]);
      const imgContainer = create('div', 'gallery__img', item);
      create(
        'img',
        'gallery__img-img',
        imgContainer,
        undefined,
        ['src', `${this.products[i].thumbnail}`],
        ['alt', `${this.products[i].category}`]
      );
      const Container = create('div', 'gallery__container', item);
      create('p', 'gallery__title', Container, `${this.products[i].title}`);
      create('p', 'gallery__dicription', Container, `${this.products[i].description}`);
      const buttonPrice = create('div', 'gallery__button-price', Container);
      const button = create('div', 'gallery__button', buttonPrice, 'Add to cart');
      button.classList.add('button');
      create('p', 'gallery__price', buttonPrice, `$${this.products[i].price}`);
      this.body.append(this.galleryElement);
    }
  }
}
