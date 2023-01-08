import { HeaderView } from './components/header/view';
import { SearchPage } from './pages/searchPage/view';
import { SearchPageController } from './pages/searchPage/controller';
import { create } from './helpers/helpFunction';

export class AppView {
  header: HeaderView;
  searchPage: SearchPage;
  documentBody: HTMLElement;
  container: HTMLElement;
  searchPageController: SearchPageController;
  constructor() {
    this.searchPageController = new SearchPageController();
    this.searchPage = this.searchPageController.app;
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.documentBody = document.body;
    this.header = new HeaderView();
    this.documentBody.append(this.header.container, this.container);
    this.openBurgerMenu();
  }

  set containerContent(x: HTMLElement) {
    this.container.replaceChildren(x);
  }
  openBurgerMenu() {
    const burger = this.searchPage.gallery.header.burger;
    const body = document.body;
    const filters = this.searchPage.filters.container;
    burger.addEventListener('click', () => {
      filters.style.left = '20px';
      const background = create('div', 'background', body);

      background.addEventListener('click', () => {
        body.removeChild(background);
        filters.style.left = '-400px';
      });
    });
  }
}
