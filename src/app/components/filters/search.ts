export class Search {
  container: HTMLInputElement;
  searchValue: string;
  constructor() {
    this.container = document.createElement('input');
    this.container.classList.add('main-page__search');
    this.container.setAttribute('placeholder', 'Search');
    this.container.setAttribute('type', 'Search');
    this.searchValue = this.container.value;
    this.container.addEventListener('input', () => {
      this.searchValue = this.container.value;
    });
  }
}
