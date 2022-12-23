import { ItemPageView } from './pages/itemPage/view';
// import { ProductInterface } from './interfaces/interfaces';
import { SearchPage } from './pages/searchPage/view';
import { AppView } from './appView';

export class MainPageController {
  appView: AppView;
  contentClass: SearchPage | ItemPageView;
  constructor() {
    this.contentClass = new SearchPage();
    this.appView = new AppView();
    this.generateSearchPageContent();
  }

  generateSearchPageContent() {
    this.contentClass = new SearchPage();
    this.contentClass.gallery.galleryItems.cards.forEach((card) => {
      card.container.addEventListener('click', () => {
        this.contentClass = new ItemPageView(card.data);
        this.appView.containerContent = this.contentClass.container;
        console.log(card.data);
      });
      console.log(card);
    });
    this.appView.containerContent = this.contentClass.container;
  }

  searchPageCardClickEvent(e: Event) {
    if (e.target instanceof HTMLElement && e.target.dataset.id) {
      const id = Number(e.target.dataset.id);
      console.log(id);
    }
  }
}
