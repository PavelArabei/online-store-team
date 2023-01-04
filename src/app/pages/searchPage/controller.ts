import { SearchPage } from './view';
import { SearchModel } from './model';

export class SearchPageController {
  app: SearchPage;
  model: SearchModel;
  constructor() {
    this.app = new SearchPage();
    this.model = new SearchModel(this.app.mainObj, this.app.mainPage, this.app.gallery, this.app.filters);
    this.model.funcCreate();
    this.app.container.addEventListener('input', this.model.funcCreate.bind(this.model));
    this.app.container.addEventListener('input', () => {
      this.app.gallery = this.model.gallery;
    });
    this.app.gallery.header.sortButtonArr.forEach((button) => {
      button.addEventListener('click', this.model.funcSort.bind(this.model));
    });
    this.app.gallery.header.sortDirection.addEventListener('click', this.model.funcSortDirection.bind(this.model));
  }
}
