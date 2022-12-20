import { create } from '../helpFunction';
interface SearchInterface {
  searchBody: HTMLElement;
  createAll(): void;
}
export class Search implements SearchInterface {
  searchBody: HTMLElement;
  constructor(searchBody: HTMLElement) {
    this.searchBody = searchBody;
  }
  createAll(): void {
    create('input', 'main-page__search', this.searchBody, undefined, ['placeholder', 'Search'], ['type', 'search']);
  }
}
