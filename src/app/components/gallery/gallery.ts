import { HeaderGallery } from '../headerGallery/headerGalery';
import { Gallery } from '../mainGallery/mainGallery';
import { products } from '../../data/products';

//import { create } from '../../helpers/helpFunction';
import { ProductInterface } from '../../interfaces/interfaces';
export class AllGallery {
  body: HTMLElement;
  header: HeaderGallery;
  gallery: Gallery;

  products: ProductInterface[];
  smallConfiguration: HTMLElement;
  bigConfiguration: HTMLElement;
  sortButton: HTMLElement;
  sortButtonText: HTMLElement;
  sortArray: HTMLElement;
  sortPriceUp: HTMLElement;
  sortPriceDown: HTMLElement;
  sortRatingUp: HTMLElement;
  sortRatingDown: HTMLElement;
  sortDirection: HTMLElement;
  resultNum: HTMLElement;
  constructor(body: HTMLElement) {
    this.body = body;
    this.header = new HeaderGallery(body, products);
    this.products = this.header.products;
    this.gallery = new Gallery(body, this.products);
    this.smallConfiguration = this.header.smallConfiguration;
    this.bigConfiguration = this.header.bigConfiguration;
    this.sortButton = this.header.sortButton;
    this.sortButtonText = this.header.sortButtonText;
    this.sortArray = this.header.sortArray;
    this.sortPriceUp = this.header.sortPriceUp;
    this.sortPriceDown = this.header.sortPriceDown;
    this.sortRatingUp = this.header.sortRatingUp;
    this.sortRatingDown = this.header.sortRatingDown;
    this.sortDirection = this.header.sortDirection;
    this.resultNum = this.header.resultNum;
  }
}
