import { SearchPage } from './view';
import { SearchModel } from './model';

export class SearchPageController {
  app: SearchPage;
  model: SearchModel;
  constructor() {
    this.app = new SearchPage();
    this.model = new SearchModel(this.app.mainObj, this.app.mainPage, this.app.gallery, this.app.filters);

    this.app.container.addEventListener('input', this.model.funcCreate.bind(this.model));
    this.app.container.addEventListener('input', () => {
      this.app.gallery = this.model.gallery;
    });
    const sortButtonArr = this.app.gallery.header.sortButtonArr;
    sortButtonArr.forEach((button) => {
      button.addEventListener('click', this.model.funcSort.bind(this.model, button));
    });
    if (localStorage.getItem('sortButton')) {
      const button = sortButtonArr.find((e) => e.textContent === localStorage.getItem('sortButton'));
      this.model.sortWithoutRender(button as HTMLElement);
      const buttonText = this.app.gallery.header.sortButtonText;
      buttonText.textContent = localStorage.getItem('sortButton');
    }

    const img = this.app.gallery.header.sortDirection;
    img.addEventListener('click', this.model.funcSortDirection.bind(this.model, img));
    if (localStorage.getItem('sort')) {
      this.model.funcSortDirection(img);
    }
    const resetButton = this.app.filters.filters.restAndCopy.resetButton;
    resetButton.addEventListener('click', this.model.resetFunction.bind(this.model));

    const manyItemsGrid = this.app.gallery.header.smallConfiguration;
    const fewItemsGrid = this.app.gallery.header.bigConfiguration;
    manyItemsGrid.addEventListener('click', this.model.changeGrid.bind(this.model, manyItemsGrid, fewItemsGrid));
    fewItemsGrid.addEventListener('click', this.model.changeGrid.bind(this.model, fewItemsGrid, manyItemsGrid));

    this.model.funcCreate();
  }
}
