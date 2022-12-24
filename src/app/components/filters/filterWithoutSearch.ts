import { RestAndCopy } from './rest-copy';
import { SubCategory } from './subCategory';
import { products } from '../../data/products';
import { RangeCategory } from './rangeCategory';
export class FilterWithoutSearch {
  container: HTMLElement;
  restAndCopy: RestAndCopy;
  subCategory: SubCategory;
  subBrand: SubCategory;
  rangeCategory: RangeCategory;
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('main-page_filter-conteiner');
    this.restAndCopy = new RestAndCopy(this.container);
    this.subCategory = new SubCategory(this.container, [...new Set(products.map((el) => el.category))]);
    this.subBrand = new SubCategory(this.container, [...new Set(products.map((el) => el.brand))]);
    this.rangeCategory = new RangeCategory(this.container);
    this.createAll();
  }
  createAll(): void {
    this.restAndCopy.createAll();
    this.subCategory.createAll();
    this.subBrand.createAll();
    this.rangeCategory.createAll();
  }
}
