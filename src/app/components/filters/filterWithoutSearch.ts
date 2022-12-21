import { RestAndCopy } from './rest-copy';
import { SubCategory } from './subCategory';
import { products } from '../../data/products';
import { RangeCategory } from './rangeCategory';
export class FilterWithoutSearch {
  body: HTMLElement;
  restAndCopy: RestAndCopy;
  subCategory: SubCategory;
  subBrand: SubCategory;
  rangeCategory: RangeCategory;
  constructor(body: HTMLElement) {
    this.body = body;
    this.restAndCopy = new RestAndCopy(this.body);
    this.subCategory = new SubCategory(this.body, [...new Set(products.map((el) => el.category))]);
    this.subBrand = new SubCategory(this.body, [...new Set(products.map((el) => el.brand))]);
    this.rangeCategory = new RangeCategory(this.body);
  }
  createAll(): void {
    this.restAndCopy.createAll();
    this.subCategory.createAll();
    this.subBrand.createAll();
    this.rangeCategory.createAll();
  }
}
