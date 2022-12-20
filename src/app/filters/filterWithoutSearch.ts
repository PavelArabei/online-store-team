import { RestAndCopy } from './rest-copy';
import { SubCategory } from './subCategory';
import { RangeCategory } from './rangeCategory';
const categoryArr: string[] = ['Guitars', 'Keys', 'Drums', 'Amps and effects'];
const brandArr: string[] = ['Gibson', 'Fender', 'Ibanez', 'Yamaha', 'Fame', 'Tama', 'Casio', 'Crown', 'Dynacord'];
export class FilterWithoutSearch {
  body: HTMLElement;
  restAndCopy: RestAndCopy;
  subCategoryFirst: SubCategory;
  subCategorySecond: SubCategory;
  rangeCategory: RangeCategory;
  constructor(body: HTMLElement) {
    this.body = body;
    this.restAndCopy = new RestAndCopy(this.body);
    this.subCategoryFirst = new SubCategory(this.body, categoryArr);
    this.subCategorySecond = new SubCategory(this.body, brandArr);
    this.rangeCategory = new RangeCategory(this.body);
  }
  createAll(): void {
    this.restAndCopy.createAll();
    this.subCategoryFirst.createAll();
    this.subCategorySecond.createAll();
    this.rangeCategory.createAll();
  }
}
