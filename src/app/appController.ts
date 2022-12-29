import { ItemPageView } from './pages/itemPage/view';
import { SearchPage } from './pages/searchPage/view';
import { AppView } from './appView';
import { CartController } from './components/cart/controller';

export class MainPageController {
  appView: AppView;
  cart: CartController = new CartController();
  contentClass: SearchPage | ItemPageView;
  constructor() {
    this.appView = new AppView();
    this.contentClass = this.appView.searchPage;
    this.generateSearchPageContent();
    this.appView.header.logoLink.addEventListener('click', this.generateSearchPageContent.bind(this));
    this.appView.documentBody.addEventListener('input', this.addCardEvents.bind(this));
    this.appView.searchPage.gallery.header.sortButtonArr.forEach((button) => {
      button.addEventListener('click', this.addCardEvents.bind(this));
    });
  }

  addCardEvents() {
    this.appView.searchPage.gallery.galleryItems.cards.forEach((card) => {
      card.container.addEventListener('click', () => {
        this.contentClass = new ItemPageView(card.data);
        this.appView.containerContent = this.contentClass.container;
      });
      card.button.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        if (this.cart.cartItems.has(card.data)) {
          this.cart.cartItems.delete(card.data);
          card.button.style.backgroundColor = '';
          card.button.innerText = 'Add to cart';
          this.cart.cartItems.delete(card.data);
          this.appView.header.totalAmount = this.cart.priceSum;
          this.appView.header.basketScoreAmount = this.cart.itemsAmount;
        } else {
          this.cart.cartItems.set(card.data, 1);
          card.button.style.backgroundColor = 'Green';
          card.button.innerText = 'Remove';
          this.cart.cartItems.set(card.data, 1);
          this.appView.header.totalAmount = this.cart.priceSum;
          this.appView.header.basketScoreAmount = this.cart.itemsAmount;
        }
      });
    });
  }

  generateSearchPageContent() {
    this.contentClass = this.appView.searchPage;
    this.addCardEvents();
    this.appView.containerContent = this.contentClass.container;
  }
}
