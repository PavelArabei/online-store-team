import { SearchPage } from './pages/searchPage/view';
import { AppView } from './appView';
import { CartController } from './components/cart/controller';
import { ItemPageController } from './pages/itemPage/controller';

export class MainPageController {
  appView: AppView;
  cart: CartController = new CartController();
  contentClass: SearchPage | ItemPageController;
  constructor() {
    this.appView = new AppView();
    this.contentClass = this.appView.searchPage;
    this.generateSearchPageContent();
    this.appView.header.logoLink.addEventListener('click', this.goToMainPage.bind(this));
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
        // () => {
        // if (this.cart.cartItems.has(card.data.id)) {
        //   this.cart.cartItems.delete(card.data.id);
        //   card.button.style.backgroundColor = '';
        //   card.button.innerText = 'Add to cart';
        //   this.cart.cartItems.delete(card.data.id);
        //   console.log(this.cart.cartItems);
        //   this.appView.header.totalAmount = this.cart.priceSum;
        //   this.appView.header.basketScoreAmount = this.cart.itemsAmount;
        // } else {
        //   this.cart.cartItems.set(card.data.id, 1);
        //   card.button.style.backgroundColor = '#730600';
        //   card.button.innerText = 'Remove';
        //   this.cart.cartItems.set(card.data.id, 1);
        //   console.log(this.cart.cartItems);
        //   this.appView.header.totalAmount = this.cart.priceSum;
        //   this.appView.header.basketScoreAmount = this.cart.itemsAmount;
        // }
        // });
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

  generateSearchPageContent() {
    this.contentClass = this.appView.searchPage;
    this.addCardEvents();
    this.appView.containerContent = this.contentClass.container;
  }
  goToMainPage() {
    this.contentClass = this.appView.searchPage;
    this.appView.containerContent = this.contentClass.container;
  }

  refreshHeaderCart() {
    this.appView.header.totalAmount = this.cart.priceSum;
    this.appView.header.basketScoreAmount = this.cart.itemsAmount;
  }
}
