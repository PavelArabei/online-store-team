import { create } from '../../helpers/helpFunction';
export default class ErrorPage {
  container: HTMLElement;
  button: HTMLElement;
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('error');
    const flexContainer = create('div', 'error__flex-container', this.container);
    create('img', 'error__img', flexContainer, undefined, ['src', './assets/img/errorPageImg.png']);
    const flexDiscription = create('div', 'error__flex-discription', flexContainer);
    create('h2', 'error__404', flexDiscription, '404');
    create('p', 'error__text', flexDiscription, 'Page not found');
    this.button = create('a', 'error__link', flexDiscription, undefined, ['href', '#']);
    this.button.classList.add('gallery__button');
    create('p', 'error__link-text', this.button, 'Main page');
  }
}
