import { create } from '../../helpers/helpFunction';
export class RestAndCopy {
  body: HTMLElement;
  constructor(body: HTMLElement) {
    this.body = body;
  }
  createAll(): void {
    const restAndCopyBody = create('div', 'reset-copy', this.body);
    const title = create('h2', 'reset-copy__title', restAndCopyBody, 'Product Filters');
    title.classList.add('subtitle');
    const resetButton = create('button', 'reset-copy__reset', restAndCopyBody, 'Reset');
    resetButton.classList.add('button');
    const copyButton = create('button', 'reset-copy__copy', restAndCopyBody, 'Copy Link');
    copyButton.classList.add('button');
  }
}
