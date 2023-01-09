// import { ProductInterface } from '../../../interfaces/interfaces';
import { create } from '../../../helpers/helpFunction';
import { isHTMLElem } from '../../../helpers/helpFunction';
export class GalleryHeader {
  container: HTMLElement;
  smallConfiguration: HTMLElement;
  bigConfiguration: HTMLElement;
  sortButtonContainer: HTMLElement;
  sortButton: HTMLElement;
  sortButtonText: HTMLElement;
  sortArray: HTMLElement;
  noSort: HTMLElement;
  sortPrice: HTMLElement;
  sortRating: HTMLElement;
  sortDirection: HTMLElement;
  resultNum: HTMLElement;
  sortButtonArr: HTMLElement[];
  burger: HTMLElement;
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('main-page__header');
    const allSort = create('div', 'main-page__allSort', this.container);
    const configuration = create('div', 'main-page__configuratin', allSort);
    this.smallConfiguration = create(
      'img',
      'main-page__small-configuration',
      configuration,
      undefined,
      ['src', './assets/img/manyConfig.svg'],
      ['alt', 'small configuration'],
      ['configuration', 'small']
    );
    this.bigConfiguration = create(
      'img',
      'main-page__big-configuration',
      configuration,
      undefined,
      ['src', './assets/img/smallConfig.svg'],
      ['alt', 'big configuration'],
      ['configuration', 'big']
    );
    this.burger = create(
      'img',
      'main-page__burger',
      allSort,
      undefined,
      ['src', './assets/img/burger.svg'],
      ['alt', 'burger']
    );
    const sort = create('div', 'main-page__sort', allSort);
    create('div', 'main-page__sort-tittle', sort, 'Sort:');
    this.sortButton = create('div', 'main-page__sort-selector', sort);
    this.sortButtonContainer = create('div', 'main-page__button-container', this.sortButton);
    this.sortButton.addEventListener('click', this.openSortF);
    this.sortButtonText = create('p', 'main-page__sort-paragraph', this.sortButtonContainer, 'no-Sort');
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

    this.noSort = create('p', 'main-page__sort-item', this.sortButton, 'no-Sort');
    this.sortPrice = create('p', 'main-page__sort-item', this.sortButton, 'price');
    this.sortRating = create('p', 'main-page__sort-item', this.sortButton, 'rating');
    this.sortButtonArr = [this.noSort, this.sortPrice, this.sortRating];
    this.sortButtonArr.forEach((e) => {
      e.addEventListener('click', (e) => {
        const targetText = isHTMLElem(e.target).textContent;
        this.sortButtonText.textContent = targetText;
      });
    });
    const result = create('p', 'main-page__results', this.container, ' search results');
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
