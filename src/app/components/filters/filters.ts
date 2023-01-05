import { Search } from './search';
import { FilterWithoutSearch } from './filterWithoutSearch';
import { isHTMLElem } from '../../helpers/helpFunction';
interface ObjectValue {
  [key: string]: string[] | string;
}
export class Filters {
  container: HTMLElement;
  search: Search;
  filters: FilterWithoutSearch;
  mainObj: ObjectValue;
  constructor() {
    this.container = document.createElement('aside');
    this.container.classList.add('main-page__filter');
    this.search = new Search();
    this.filters = new FilterWithoutSearch();
    this.mainObj = this.filters.objectValue;
    this.mainObj.search = this.search.searchValue;
    //console.log((this.filters.rangePrice.inputFunc.inputRangeLeft.value = `1000`));
    //!222222222222222222222222222222
    //const inputEvent = new Event('input');
    //const inputRangeLeft = this.filters.rangePrice.inputFunc.inputRangeLeft;
    //inputRangeLeft.value = '1000';
    //inputRangeLeft.dispatchEvent(inputEvent);
    //console.log((this.filters.rangePrice.inputFunc.inputRangeRight.value = `2000`));
    //console.log(this.filters.rangeStock.inputFunc);

    this.container.addEventListener('input', (e) => {
      if (isHTMLElem(e.target).tagName === 'INPUT') {
        this.mainObj.search = this.search.searchValue;
      }
    });
    this.container.append(this.search.container, this.filters.container);
  }
}
