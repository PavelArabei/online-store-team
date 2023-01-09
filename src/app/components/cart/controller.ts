// import { ProductInterface } from '../../interfaces/interfaces';
import { CartModel } from './model';
import { CartListItem, CartView } from './view';
import { HeaderView } from '../header/view';

export class CartController {
  header: HeaderView;
  model = new CartModel();
  view = new CartView();
  cartItems = this.model.cartItems;
  cartItemCards: CartListItem[] = this.updateItemCards();
  itemsPerPage: number;
  currentPage = 1;
  couponList = this.model.couponList;
  appliedCoupons = new Set();

  constructor(header: HeaderView) {
    this.header = header;
    this.cartItemCards.forEach((item) => {
      this.view.itemsList.append(item.container);
      item.container.dataset.itemId = item.data.id.toString();
    });
    this.itemsPerPage = this.cartItemCards.length;
    this.addInputEvent();
    this.paginationButtonEvents();
    this.view.promoInput.addEventListener('input', this.couponInputEvent.bind(this));
    this.view.promoInput.addEventListener('submit', (e) => e.preventDefault());
  }

  addInputEvent() {
    this.view.itemsLimitInput.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this.view.itemsLimitInput.addEventListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        this.currentPage = 1;
        this.itemsPerPage = Number(e.target.value);
        if (Number.isInteger(this.itemsPerPage) && Number(this.itemsPerPage) > 0) {
          this.view.paginationPageNumber.innerText = `${this.currentPage}/${Math.ceil(
            this.cartItems.size / this.itemsPerPage
          )}`;
          this.fillCartCards(...this.getPaginationNumbers());
        } else {
          this.currentPage = 1;
          this.view.paginationPageNumber.innerText = '1/1';
          this.fillCartCards();
        }
      }
    });
  }

  addItem(item: number, amount: number): void {
    if (amount === 0 && this.cartItems.has(item)) {
      this.cartItems.delete(item);
    } else {
      this.cartItems.set(item, amount);
    }
  }
  get priceSum() {
    return Math.round(this.model.priceSum);
  }
  get itemsAmount() {
    return this.model.itemsAmount;
  }

  updateItemCards() {
    const dataArr = this.model.getCartItemsData();
    const cartListItemsArr: CartListItem[] = [];
    dataArr.forEach((item) => {
      const card = new CartListItem(...item);
      cartListItemsArr.push(card);
      card.container.dataset.id = item[0].id.toString();
    });
    this.cartItemCards = cartListItemsArr;
    return cartListItemsArr;
  }

  addItemCardEvents() {
    this.cartItemCards.forEach((card) => {
      card.decreaseAmountButton.addEventListener('click', () => {
        const itemInCart = this.cartItems.get(card.data.id);
        console.log(itemInCart);
        if (itemInCart !== undefined) {
          if (itemInCart === 1) {
            this.cartItems.delete(card.data.id);
          } else {
            this.cartItems.set(card.data.id, itemInCart - 1);
          }
        }
        this.updateSummary();
        this.renderCartItems();
      });

      card.increaseAmountButton.addEventListener('click', () => {
        const itemInCart = this.cartItems.get(card.data.id);
        console.log(itemInCart);
        if (itemInCart !== undefined) {
          if (itemInCart === card.data.stock) {
            return;
          } else {
            this.cartItems.set(card.data.id, itemInCart + 1);
            card.itemAmountNumber.textContent = (card.data.id, itemInCart + 1).toString();
          }
        }
        this.updateSummary();
      });
    });
  }

  getPaginationNumbers() {
    const start = this.itemsPerPage * (this.currentPage - 1);
    const end = start + this.itemsPerPage;
    return [start, end];
  }

  fillCartCards(start?: number, end?: number) {
    const arr = start === undefined && end === undefined ? this.cartItemCards : this.cartItemCards.slice(start, end);
    this.view.itemsList.replaceChildren();
    arr.forEach((item) => this.view.itemsList.append(item.container));
  }

  paginationButtonEvents() {
    this.view.paginationControlPageCountDown.addEventListener('click', (e) => {
      if (this.itemsPerPage === 0) {
        this.view.paginationPageNumber.innerText = '1/1';
        return;
      }
      if (e.target instanceof HTMLElement && this.currentPage > 1) {
        this.currentPage -= 1;
        this.fillCartCards(...this.getPaginationNumbers());
        this.view.paginationPageNumber.innerText = `${this.currentPage}/${Math.ceil(
          this.cartItems.size / this.itemsPerPage
        )}`;
      }
    });

    this.view.paginationControlPageCountUp.addEventListener('click', (e) => {
      if (this.itemsPerPage === 0) {
        this.view.paginationPageNumber.innerText = '1/1';
        return;
      }
      if (e.target instanceof HTMLElement && this.currentPage < Math.ceil(this.cartItems.size / this.itemsPerPage)) {
        this.currentPage += 1;
        this.fillCartCards(...this.getPaginationNumbers());
        this.view.paginationPageNumber.innerText = `${this.currentPage}/${Math.ceil(
          this.cartItems.size / this.itemsPerPage
        )}`;
      }
    });
  }

  couponInputEvent(e: Event) {
    e.preventDefault();
    if (!(e.target instanceof HTMLInputElement)) return;

    const x = this.model.couponList.get(e.target.value.toLocaleLowerCase());

    if (x !== undefined) {
      this.view.promoEnterIcon.classList.remove('hidden-element');
    } else {
      this.view.promoEnterIcon.classList.add('hidden-element');
    }
  }

  updateSummaryPrice() {
    this.view.noDiscountPrice.textContent = Math.round(this.model.priceSum).toString();
  }

  totalItemsAmount() {
    return [...this.model.cartItems.values()].reduce((sum, cur) => sum + cur, 0);
  }
  updateSummary() {
    this.header.totalAmount = Math.round(this.model.priceSum);
    this.header.basketScoreAmount = this.model.itemsAmount;
    this.view.itemsCount.innerText = `${this.model.itemsAmount} item${this.model.itemsAmount !== 1 ? 's' : ''}`;
    this.view.noDiscountPrice.innerText = `Total: $${Math.round(this.model.priceSum).toString()}`;
  }

  resetPagination() {
    this.itemsPerPage = 0;
    this.currentPage = 1;
    this.view.paginationPageNumber.textContent = '1/1';
    if (this.view.itemsLimitInput instanceof HTMLInputElement) this.view.itemsLimitInput.value = '';
  }

  renderCartItems() {
    this.updateItemCards();
    this.fillCartCards();
    this.addItemCardEvents();
  }
}
