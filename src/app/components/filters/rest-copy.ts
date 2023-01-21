import { create } from '../../helpers/helpFunction';
export class RestAndCopy {
  body: HTMLElement;
  restAndCopyBody: HTMLElement;
  resetButton: HTMLElement;
  copyButton: HTMLElement;
  constructor(body: HTMLElement) {
    this.body = body;
    this.restAndCopyBody = create('div', 'reset-copy', this.body);
    const title = create('h2', 'reset-copy__title', this.restAndCopyBody, 'Product Filters');
    title.classList.add('subtitle');
    this.resetButton = create('button', 'reset-copy__reset', this.restAndCopyBody, 'Reset');
    this.copyButton = create('button', 'reset-copy__copy', this.restAndCopyBody, 'Copy Link');
    this.resetButton.classList.add('button');
    this.copyButton.classList.add('button');
  }
}
