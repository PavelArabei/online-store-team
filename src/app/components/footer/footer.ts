import { create } from '../../helpers/helpFunction';
export class Footer {
  container: HTMLElement;
  constructor() {
    this.container = document.createElement('footer');
    this.container.classList.add('footer');
    const container = create('div', 'container', this.container);
    const nav = create('nav', 'footer__nav', container);
    const gitHub = create('a', 'footer__git-hub', nav, undefined, ['href', 'https://rs.school/js/']);
    create('img', 'footer__git-hub-img', gitHub, undefined, ['src', './assets/img/github.svg'], ['alt', 'GitHub']);
    create('p', 'footer__year', nav, 'created 2023');
    const rsShool = create('a', 'footer__rs-shool', nav, undefined, [
      'href',
      'https://github.com/PavelArabei?tab=repositories',
    ]);
    create(
      'img',
      'footer__rs-shool-img',
      rsShool,
      undefined,
      ['src', './assets/img/rs-school.svg'],
      ['alt', 'RSShool']
    );
  }
}
