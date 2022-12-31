import { HeaderView } from './components/header/view';
import { SearchPage } from './pages/searchPage/view';
import { SearchPageController } from './pages/searchPage/controller';
//!import { ModalWindow } from './components/modal-window/modal-window';

export class AppView {
  header: HeaderView;
  searchPage: SearchPage;
  documentBody: HTMLElement;
  container: HTMLElement;
  searchPageController: SearchPageController;
  //!modalWindow: ModalWindow;
  constructor() {
    this.searchPageController = new SearchPageController();
    this.searchPage = this.searchPageController.app;
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.documentBody = document.body;
    this.header = new HeaderView();
    this.documentBody.append(this.header.container, this.container);
    //!this.modalWindow = new ModalWindow();
  }

  set containerContent(x: HTMLElement) {
    this.container.replaceChildren(x);
  }
}
