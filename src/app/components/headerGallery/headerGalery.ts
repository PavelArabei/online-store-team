import { ProductInterface } from '../../interfaces/interfaces';
import { create } from '../../helpers/helpFunction';
import { isHTMLElem } from '../../helpers/helpFunction';
export class HeaderGallery {
  body: HTMLElement;
  products: ProductInterface[];
  smallConfiguration: HTMLElement;
  bigConfiguration: HTMLElement;
  sortButtonContainer: HTMLElement;
  sortButton: HTMLElement;
  sortButtonText: HTMLElement;
  sortArray: HTMLElement;
  sortPriceUp: HTMLElement;
  sortPriceDown: HTMLElement;
  sortRatingUp: HTMLElement;
  sortRatingDown: HTMLElement;
  sortDirection: HTMLElement;
  resultNum: HTMLElement;
  constructor(body: HTMLElement, products: ProductInterface[]) {
    this.body = body;
    this.products = JSON.parse(JSON.stringify(products));
    const header = create('div', 'main-page__header', this.body);
    const allSort = create('div', 'main-page__allSort', header);
    const configuration = create('div', 'main-page__configuratin', allSort);
    this.smallConfiguration = create(
      'img',
      'main-page__small-configuration',
      configuration,
      undefined,
      ['src', './assets/img/smallConfiguration.png'],
      ['alt', 'small configuration']
    );
    this.bigConfiguration = create(
      'img',
      'main-page__big-configuration',
      configuration,
      undefined,
      ['src', './assets/img/bigConfiguration.png'],
      ['alt', 'big configuration']
    );

    const sort = create('div', 'main-page__sort', allSort);
    create('div', 'main-page__sort-tittle', sort, 'Sort:');
    this.sortButton = create('div', 'main-page__sort-selector', sort);
    this.sortButtonContainer = create('div', 'main-page__button-container', this.sortButton);
    this.sortButton.addEventListener('click', this.openSortF);
    this.sortButtonText = create('p', 'main-page__sort-paragraph', this.sortButtonContainer, 'price');
    this.sortArray = create(
      'img',
      'main-page__sort-img',
      this.sortButtonContainer,
      'Sort:',
      ['src', './assets/img/array.png'],
      ['alt', 'array']
    );
    this.sortDirection = create(
      'img',
      'main-page__sort-direction',
      sort,
      'Sort:',
      ['src', './assets/img/direction.png'],
      ['alt', 'direction']
    );
    this.sortPriceUp = create('p', 'main-page__sort-item', this.sortButton, 'priceUp');
    this.sortPriceDown = create('p', 'main-page__sort-item', this.sortButton, 'priceDown');
    this.sortRatingUp = create('p', 'main-page__sort-item', this.sortButton, 'ratingUp');
    this.sortRatingDown = create('p', 'main-page__sort-item', this.sortButton, 'ratingDown');
    const result = create('p', 'main-page__results', header, ' search results');
    this.resultNum = document.createElement('span');
    this.resultNum.textContent = '23';
    result.prepend(this.resultNum);
  }
  openSortF(e: Event): void {
    isHTMLElem(e.currentTarget).style.overflow === 'visible'
      ? (isHTMLElem(e.currentTarget).style.overflow = 'hidden')
      : (isHTMLElem(e.currentTarget).style.overflow = 'visible');
  }
}
