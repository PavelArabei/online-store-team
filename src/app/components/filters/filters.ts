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

    this.container.addEventListener('input', (e) => {
      if (isHTMLElem(e.target).tagName === 'INPUT') {
        this.mainObj.search = this.search.searchValue;
      }
    });
    this.container.append(this.search.container, this.filters.container);
  }
}
