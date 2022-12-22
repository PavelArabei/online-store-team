import { Search } from './search';
import { FilterWithoutSearch } from './filterWithoutSearch';
export class Filters {
  container: HTMLElement;
  search: Search;
  filters: FilterWithoutSearch;
  constructor() {
    this.container = document.createElement('aside');
    this.container.classList.add('main-page__filter');
    this.search = new Search();
    this.filters = new FilterWithoutSearch();

    this.container.append(this.search.container, this.filters.container);
    this.createAll();
  }
  createAll(): void {
    const filterWithoutSearch = new FilterWithoutSearch();
    filterWithoutSearch.createAll();
  }
}
