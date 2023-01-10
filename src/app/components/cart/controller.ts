// import { ProductInterface } from '../../interfaces/interfaces';
import { CartModel } from './model';
import { CartListItem, CartView } from './view';
import { HeaderView } from '../header/view';
import { ModalWindow } from '../modal-window/modal-window';

export class CartController {
  header: HeaderView;
  model = new CartModel();
  view = new CartView();
  cartItems = this.model.cartItems;
  cartItemCards: CartListItem[] = this.updateItemCards();
  itemsPerPage: number;
  currentPage = 1;
  couponList = this.model.couponList;
  modal = new ModalWindow();

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
    this.view.promoEnterIcon.addEventListener('click', this.promoButtonEvent.bind(this));
    this.view.orderButton.addEventListener('click', () => this.view.container.append(this.modal.container));
    this.modal.container.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        this.modal.container.remove();
        e.stopImmediatePropagation();
      }
    });
    this.modal.closeButton.addEventListener('mousedown', (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.button === 0) {
        this.modal.container.remove();
        e.stopImmediatePropagation();
      }
    });
    this.modal.submitButton.addEventListener('click', (e) => {
      if (this.modal.isValidAll(e)) {
        this.modal.buttonText.style.fontSize = '16px';
        this.modal.buttonText.innerText = 'Success! Redirecting...';
        setTimeout(() => (document.location.href = '/'), 3000);
      }
    });
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
        this.updateDiscountPrice();
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
        this.updateDiscountPrice();
      });
    });
  }

  getPaginationNumbers() {
    const start = this.itemsPerPage * (this.currentPage - 1);
    const end = start + this.itemsPerPage;
    return [start, end];
  }

  fillCartCards(start?: number, end?: number) {
    if (this.cartItems.size === 0) {
      this.view.itemsList.replaceChildren();
      const h2empty = document.createElement('h2');
      h2empty.innerText = 'Cart is empty';
      h2empty.style.fontSize = '34px';
      h2empty.style.alignSelf = 'center';
      h2empty.style.marginTop = '40px';
      this.view.itemsList.append(h2empty);
      return;
    }
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

    const x = this.model.couponList.get(e.target.value.toLowerCase());

    if (x !== undefined) {
      this.view.promoEnterIcon.classList.remove('hidden-element');
    } else {
      this.view.promoEnterIcon.classList.add('hidden-element');
    }
  }

  promoButtonEvent() {
    if (!(this.view.promoInput instanceof HTMLInputElement)) return;
    const x = this.view.promoInput.value.toLowerCase();
    if (x === undefined || this.model.appliedCoupons.has(x)) return;
    const codeObj = this.model.addPromoCode(x);
    if (codeObj === undefined) return;
    this.view.appliedCodesList.append(codeObj.container);
    codeObj.cross.addEventListener('click', this.updateDiscountPrice.bind(this));
    this.updateDiscountPrice();
  }

  updateSummaryPrice() {
    this.view.noDiscountPrice.textContent = Math.round(this.model.priceSum).toString();
  }

  updateDiscountPrice() {
    this.view.discountPrice.textContent = `$${this.model.discountSum.toString()}`;
    if (this.model.discountSum === this.model.priceSum) {
      this.view.discountPrice.classList.add('hidden-element');
      this.view.noDiscountPrice.style.textDecoration = '';
    } else {
      this.view.discountPrice.classList.remove('hidden-element');
      this.view.noDiscountPrice.style.textDecoration = 'line-through';
    }
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
