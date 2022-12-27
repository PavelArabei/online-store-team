import { ItemPageView } from './pages/itemPage/view';
import { SearchPage } from './pages/searchPage/view';
import { AppView } from './appView';

export class MainPageController {
  appView: AppView;
  contentClass: SearchPage | ItemPageView;
  constructor() {
    this.appView = new AppView();
    this.contentClass = this.appView.searchPage;
    this.generateSearchPageContent();
    this.appView.header.logoLink.addEventListener('click', this.generateSearchPageContent.bind(this));
    this.appView.documentBody.addEventListener('input', this.addEventToCard.bind(this));
    this.appView.searchPage.gallery.header.sortButtonArr.forEach((button) => {
      button.addEventListener('click', this.addEventToCard.bind(this));
    });
  }

  addEventToCard() {
    this.appView.searchPage.gallery.galleryItems.cards.forEach((card) => {
      card.container.addEventListener('click', () => {
        this.contentClass = new ItemPageView(card.data);
        this.appView.containerContent = this.contentClass.container;
      });
    });
  }

  generateSearchPageContent() {
    this.contentClass = this.appView.searchPage;
    this.addEventToCard();
    this.appView.containerContent = this.contentClass.container;
  }
}
