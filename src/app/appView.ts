import { HeaderView } from './components/header/view';
import { SearchPage } from './pages/searchPage/view';
import { SearchPageController } from './pages/searchPage/controller';

export class AppView {
  header: HeaderView;
  searchPage: SearchPage;
  documentBody: HTMLElement;
  container: HTMLElement;
  searchPageController: SearchPageController;
  constructor() {
    this.searchPageController = new SearchPageController();
    //this.searchPage = new SearchPage();
    this.searchPage = this.searchPageController.app;
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.documentBody = document.body;
    this.header = new HeaderView();
    this.documentBody.append(this.header.container, this.container);
  }

  set containerContent(x: HTMLElement) {
    this.container.replaceChildren(x);
  }
}
