import { SearchPage } from './pages/searchPage/view';
import { AppView } from './appView';
import { CartController } from './components/cart/controller';
import { ItemPageController } from './pages/itemPage/controller';
import { CartView } from './components/cart/view';

export class MainPageController {
  appView: AppView;
  cart: CartController;
  contentClass: SearchPage | ItemPageController | CartView;
  constructor() {
    this.appView = new AppView();
    this.cart = new CartController(this.appView.header);
    this.contentClass = this.appView.searchPage;
    this.generateSearchPageContent();
    this.appView.header.logoLink.addEventListener('click', this.goToMainPage.bind(this));
    this.appView.header.basket.addEventListener('click', () => {
      this.contentClass = this.cart.view;
      this.appView.containerContent = this.cart.view.container;
      this.cart.resetPagination();
      this.cart.renderCartItems();
      this.cart.updateSummary();
    });
    this.openItemPageFromCartEvent();
    //this.openErrorPage();
  }
  openErrorPage() {
    this.appView.containerContent = this.appView.errorPage.container;
  }
  addCardEvents() {
    this.appView.searchPage.gallery.galleryItems.cards.forEach((card) => {
      card.container.addEventListener('click', () => {
        this.contentClass = new ItemPageController(this.cart, card);
        this.contentClass.cart = this.cart;
        this.appView.containerContent = this.contentClass.view.container;
        if (this.cart.cartItems.has(card.data.id)) {
          this.contentClass.view.addButton.innerText = 'Remove';
          this.contentClass.view.addButton.style.backgroundColor = '#730600';
        }

        this.contentClass.view.addButton.addEventListener('click', this.refreshHeaderCart.bind(this));
      });

      card.button.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        if (this.cart.cartItems.has(card.data.id)) {
          this.cart.cartItems.delete(card.data.id);
          card.button.style.backgroundColor = '';
          card.button.innerText = 'Add to cart';
          this.cart.cartItems.delete(card.data.id);
          this.refreshHeaderCart();
        } else {
          this.cart.cartItems.set(card.data.id, 1);
          card.button.style.backgroundColor = '#730600';
          card.button.innerText = 'Remove';
          this.cart.cartItems.set(card.data.id, 1);
          this.refreshHeaderCart();
        }
      });
    });
  }

  openItemPageFromCartEvent() {
    this.cart.view.itemsList.addEventListener('click', (e) => {
      // if (e.target instanceof HTMLElement && Boolean(e.target.dataset.id)) console.log(e.target.dataset.id);
      if (e.target instanceof HTMLElement && Boolean(e.target.dataset.id)) {
        const card = this.appView.searchPage.gallery.galleryItems.cards.get(Number(e.target.dataset.id));
        if (card !== undefined) {
          this.contentClass = new ItemPageController(this.cart, card);
          this.contentClass.cart = this.cart;
          this.appView.containerContent = this.contentClass.view.container;
          if (this.cart.cartItems.has(card.data.id)) {
            this.contentClass.view.addButton.innerText = 'Remove';
            this.contentClass.view.addButton.style.backgroundColor = '#730600';
          }

          this.contentClass.view.addButton.addEventListener('click', this.refreshHeaderCart.bind(this));
        }
      }
    });
  }

  updateCardsButtonState() {
    this.appView.searchPage.gallery.galleryItems.cards.forEach((card) => {
      if (!this.cart.cartItems.has(card.data.id)) {
        card.button.style.backgroundColor = '';
        card.button.innerText = 'Add to cart';
      }
    });
  }

  generateSearchPageContent() {
    this.contentClass = this.appView.searchPage;
    this.addCardEvents();
    this.appView.containerContent = this.contentClass.container;
  }
  goToMainPage() {
    this.contentClass = this.appView.searchPage;
    this.appView.containerContent = this.contentClass.container;
    this.updateCardsButtonState();
  }

  refreshHeaderCart() {
    this.appView.header.totalAmount = this.cart.priceSum;
    this.appView.header.basketScoreAmount = this.cart.itemsAmount;
  }
}
