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

    this.subCategory = new SubCategory(this.container, [...new Set(products.map((el) => el.category))], 'Category');
    this.subBrand = new SubCategory(this.container, [...new Set(products.map((el) => el.brand))], 'Brand');
    this.rangePrice = new RangeCategory(this.container);

    this.rangeStock = new RangeCategory(this.container);

    this.objectValue = {
      category: this.subCategory._inputCategoryArr,
      brand: this.subBrand._inputCategoryArr,
      rangePrice: this.rangePrice.inputValueArr,
      rangeStock: this.rangeStock.inputValueArr,
    };
    if (localStorage.getItem('mainObj')) {
      const mainObj = JSON.parse(localStorage.getItem('mainObj') as string);
      const prise = mainObj.rangePrice;
      this.rangePrice.inputValueArr[0] = prise[0];
      this.rangePrice.inputValueArr[1] = prise[1];
      const stock = mainObj.rangeStock;
      this.rangeStock.inputValueArr[0] = stock[0];
      this.rangeStock.inputValueArr[1] = stock[1];
    }
    this.createAll();
  }
  createAll(): void {
    this.subCategory.createAll();
    this.subBrand.createAll();

    this.rangePrice.createRangeAndInput(5041, 0, 5041, 150, 'Price range');
    this.rangeStock.createRangeAndInput(50, 0, 50, 3, 'Stock');
  }
}
