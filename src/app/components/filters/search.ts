export class Search {
  container: HTMLElement;
  constructor() {
    this.container = document.createElement('input');
    this.container.classList.add('main-page__search');
    this.container.setAttribute('placeholder', 'Search');
    this.container.setAttribute('type', 'Search');
  }
}
