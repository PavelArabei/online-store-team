import { HeaderView } from './components/header/view';
import { SearchPage } from './pages/searchPage/view';
// import { ItemPageView } from './pages/itemPage/view';

export class AppView {
  header: HeaderView;
  searchPage: SearchPage;
  documentBody: HTMLElement;
  container: HTMLElement;
  constructor() {
    this.searchPage = new SearchPage();
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
