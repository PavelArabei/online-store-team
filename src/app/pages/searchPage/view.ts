import { Filters } from '../../components/filters/filters';
import { Gallery } from '../../components/gallery/gallery';
import { products } from '../../data/products';

interface ObjectValue {
  [key: string]: string[] | string;
}

export class SearchPage {
  container: HTMLElement;
  gallery: Gallery;
  filters: Filters;
  mainPage: HTMLElement;
  mainObj: ObjectValue;

  constructor() {
    this.filters = new Filters();
    this.mainObj = this.filters.mainObj;
    this.gallery = new Gallery(products);
    this.container = document.createElement('main');
    this.container.classList.add('main');
    this.mainPage = document.createElement('section');
    this.mainPage.classList.add('main-page');
    this.container.append(this.filters.container);
    this.container.append(this.mainPage);
    this.mainPage.append(this.gallery.container);
  }
}
