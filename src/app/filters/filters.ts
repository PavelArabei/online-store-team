import { create } from '../helpFunction';
import { isHTMLElem } from '../helpFunction';
import { Search } from './search';
import { FilterWithoutSearch } from './filterWithoutSearch';
export class Filter {
  body: HTMLElement;
  search: Search;
  constructor(body: HTMLElement) {
    this.body = body;
    this.search = new Search(body);
  }
  createAll(): void {
    this.search.createAll();
    const bodyForFilt = create('div', 'main-page_filter-conteiner', this.body);
    const filterWithoutSearch = new FilterWithoutSearch(bodyForFilt);
    filterWithoutSearch.createAll();
  }
}
const filterBody = document.querySelector('.main-page__filter');
export const filter = new Filter(isHTMLElem(filterBody));
