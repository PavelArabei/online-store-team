//import { Gallery } from './app/components/mainGallery/mainGallery';
import { Filters } from '../components/filters/filters';
//import { HeaderGallery } from './app/components/headerGallery/headerGalery';
import { Gallery } from '../components/gallery/gallery';

export class SearchPage {
  container: HTMLElement;

  gallery: Gallery;
  filters: Filters;

  constructor() {
    this.gallery = new Gallery();
    this.filters = new Filters();

    this.container = document.createElement('main');
    this.container.classList.add('main');

    const mainPage = document.createElement('section');
    mainPage.classList.add('main-page');
    this.container.append(this.filters.container);
    this.container.append(mainPage);
    mainPage.append(this.gallery.container);
    document.body.append(this.container);
  }
}
