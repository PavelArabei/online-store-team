import { RestAndCopy } from './rest-copy';
import { SubCategory } from './subCategory';
import { products } from '../../data/products';
import { RangeCategory } from './rangeCategory';

interface ObjectValue {
  [key: string]: string[];
}
export class FilterWithoutSearch {
  container: HTMLElement;
  restAndCopy: RestAndCopy;
  subCategory: SubCategory;
  subBrand: SubCategory;
  rangePrice: RangeCategory;
  rangeStock: RangeCategory;
  objectValue: ObjectValue;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('main-page_filter-conteiner');
    this.restAndCopy = new RestAndCopy(this.container);

    this.subCategory = new SubCategory(this.container, [...new Set(products.map((el) => el.category))]);
    this.subBrand = new SubCategory(this.container, [...new Set(products.map((el) => el.brand))]);
    this.rangePrice = new RangeCategory(this.container);
    this.rangeStock = new RangeCategory(this.container);

    this.objectValue = {
      category: this.subCategory._inputCategoryArr,
      brand: this.subBrand._inputCategoryArr,
      rangePrice: this.rangePrice.inputValueArr,
      rangeStock: this.rangeStock.inputValueArr,
    };

    this.createAll();
  }
  createAll(): void {
    this.restAndCopy.createAll();
    this.subCategory.createAll();
    this.subBrand.createAll();
    this.rangePrice.createRangeAndInput(5041, 0, 5041, 150, 'Price range');
    this.rangeStock.createRangeAndInput(5041, 0, 5041, 150, 'Stock');
  }
}
