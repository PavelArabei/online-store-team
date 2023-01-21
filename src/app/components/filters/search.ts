export class Search {
  container: HTMLInputElement;
  searchValue: string;
  constructor() {
    this.container = document.createElement('input');
    this.container.classList.add('main-page__search');
    this.container.setAttribute('placeholder', 'Search');
    this.container.setAttribute('type', 'Search');
    if (localStorage.getItem('mainObj')) {
      const localSearch = JSON.parse(localStorage.getItem('mainObj') as string).search;
      this.container.value = localSearch;
    }
    this.searchValue = this.container.value;

    this.container.addEventListener('input', () => {
      this.searchValue = this.container.value;
    });
  }
}
