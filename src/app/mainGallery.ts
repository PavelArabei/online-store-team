import { isHTMLElem } from './helpFunction';
import { create } from './helpFunction';
import { products } from './products';
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

class Gallery {
  body: HTMLElement;
  products: ProductInterface[];
  constructor(body: HTMLElement, products: ProductInterface[]) {
    this.body = body;
    this.products = products;
  }
  createGallery(): void {
    for (let i = 0; i < this.products.length; i++) {
      const item = create('div', 'gallery__item', this.body, undefined, ['id', `${this.products[i].id}`]);
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
    }
  }
}
const body = isHTMLElem(document.querySelector('.gallery'));
export const gallery = new Gallery(body, products);
